# =================================================================
# app.py (Final Self-Contained Threading Model)
# This requires NO uvicorn, starlette, or a2wsgi.
# Just run 'python3 app.py'.
# =================================================================

import logging
import asyncio
import threading
from flask import Flask, request, jsonify
from flask_cors import CORS # We will use Flask's own CORS handling
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

# --- CONFIGURATION ---
TOKEN = '8415322329:AAG4pKDLVf3nbBqBLVRnAm2VW2xXTRlTFu4'
USERS_FILE = 'users.txt'
FLASK_PORT = 8080

# --- LOGGING SETUP ---
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logging.getLogger("httpx").setLevel(logging.WARNING)
logger = logging.getLogger(__name__)

# --- GLOBAL VARIABLES For Thread Communication ---
main_event_loop = None
message_queue = None

# ============================================================
# FLASK APP (The Web Server)
# ============================================================

flask_app = Flask(__name__)
# Crucially, we apply CORS directly to the Flask app. This will now work.
CORS(flask_app)

@flask_app.route('/send_game', methods=['POST'])
def handle_send_game():
    data = request.json
    logger.info("Flask: Received /send_game request.")
    try:
        with open(USERS_FILE, 'r') as f:
            users = [int(line.strip()) for line in f if line.strip().isdigit()]
    except (FileNotFoundError, ValueError):
        users = []

    if not users:
        return jsonify({'status': 'error', 'message': 'No registered users'}), 400

    # This is the key: We use the globally stored main loop
    # to safely schedule a task from this background thread.
    if main_event_loop and message_queue:
        main_event_loop.call_soon_threadsafe(
            message_queue.put_nowait,
            {"game_name": data.get('game_name'), "messages": data.get('messages', []), "users": users}
        )
        return jsonify({'status': 'ok', 'message': 'Queued for sending.'})
    
    return jsonify({'status': 'error', 'message': 'Server is not ready'}), 503

# ============================================================
# TELEGRAM BOT LOGIC (The Async Worker)
# ============================================================
async def start_command(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    try:
        with open(USERS_FILE, 'r') as f:
            if str(user_id) not in {line.strip() for line in f}:
                 with open(USERS_FILE, 'a') as af:
                    af.write(f"{user_id}\n")
    except FileNotFoundError:
        with open(USERS_FILE, 'w') as f:
            f.write(f"{user_id}\n")
    
    logger.info(f"Bot: User {user_id} issued /start command.")
    await update.message.reply_text('Вы успешно зарегистрированы!')

async def message_consumer(queue: asyncio.Queue, app: Application):
    logger.info("Bot: Message consumer started.")
    while True:
        job = await queue.get()
        game_name, messages, user_ids = job["game_name"], job["messages"], job["users"]
        logger.info(f"Bot: Consumer picked up job for '{game_name}'.")
        for i, user_id in enumerate(user_ids):
            index = i % len(messages)
            full_text = f"<b>Игра: {game_name}</b>\n\n{messages[index]}"
            try:
                await app.bot.send_message(chat_id=user_id, text=full_text, parse_mode='HTML')
            except Exception as e:
                logger.error(f"Bot: FAILED to send to {user_id}. REASON: {e}")
            await asyncio.sleep(0.1)
        queue.task_done()

# ============================================================
# MAIN EXECUTION BLOCK (Putting it all together)
# ============================================================
def run_flask_app():
    """This function is the target for our background thread."""
    flask_app.run(host='0.0.0.0', port=FLASK_PORT, debug=False)

async def main():
    """The main entry point for our async application."""
    global main_event_loop, message_queue
    main_event_loop = asyncio.get_running_loop()
    message_queue = asyncio.Queue()

    # Start Flask in a background thread
    flask_thread = threading.Thread(target=run_flask_app, daemon=True)
    flask_thread.start()
    logger.info(f"System: Flask server launched in background thread on port {FLASK_PORT}.")
    
    application = Application.builder().token(TOKEN).build()
    application.add_handler(CommandHandler("start", start_command))

    # Start the bot and the consumer task
    async with application:
        logger.info("System: Starting bot polling...")
        await application.initialize()
        await application.start()

        # Start the consumer as a background task
        asyncio.create_task(message_consumer(message_queue, application))
        
        # This will run forever until Ctrl+C is pressed
        await application.updater.start_polling()
        
        # Keep the main function alive to allow the bot to run
        # We'll use a Future that never completes.
        await asyncio.Future()

        # This shutdown code will run on graceful exit
        await application.updater.stop()
        await application.stop()
        await application.shutdown()


if __name__ == "__main__":
    open(USERS_FILE, 'w').close()
    logger.info("System: Application starting up... Press Ctrl+C to shut down.")
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        logger.info("System: Application shutting down.")
