from flask import Flask, request, jsonify
from telegram import Bot
import asyncio
import logging
import threading

app = Flask(__name__)
TOKEN = '8415322329:AAG4pKDLVf3nbBqBLVRnAm2VW2xXTRlTFu4'
bot = Bot(token=TOKEN)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_users():
    try:
        with open('users.txt', 'r') as f:
            return [int(line.strip()) for line in f if line.strip()]
    except Exception as e:
        logger.error(f"Error reading users: {e}")
        return []

async def _async_send_all(game_name, messages, users):
    try:
        for i, user_id in enumerate(users):
            msg = messages[i % len(messages)]
            await bot.send_message(
                chat_id=user_id,
                text=f"<b>{game_name}</b>\n{msg}",
                parse_mode='HTML'
                # Removed: timeout=10 (not supported in python-telegram-bot v20+)
            )
            logger.info(f"Sent to {user_id}")
    except Exception as e:
        logger.error(f"Send error: {e}")

def async_to_sync(game_name, messages, users):
    loop = asyncio.new_event_loop()
    asyncio.set_event_loop(loop)
    loop.run_until_complete(_async_send_all(game_name, messages, users))
    loop.close()

@app.route('/send_game', methods=['POST'])
def send_game():
    data = request.json
    game_name = data.get('game_name', '')
    messages = data.get('messages', [])
    users = get_users()

    if not users:
        return jsonify({'status': 'error', 'message': 'No registered users'}), 400

    # Prepare per-user messages according to logic
    per_user_msgs = []
    if len(messages) == len(users):
        # Each player gets their own word/info
        per_user_msgs = list(messages)
    elif len(messages) == 1:
        # All players get the same info (no individual words)
        per_user_msgs = [messages[0]] * len(users)
    elif len(messages) == 2 and len(users) > 1:
        # Only the first player gets a word, others get only game info
        per_user_msgs = [messages[0]] + [messages[1]] * (len(users) - 1)
    else:
        # Fallback: fill with game info
        per_user_msgs = [f'Игра: {game_name}'] * len(users)

    # If messages is shorter than users, fill the rest with game info
    if len(per_user_msgs) < len(users):
        per_user_msgs += [f'Игра: {game_name}'] * (len(users) - len(per_user_msgs))
    per_user_msgs = per_user_msgs[:len(users)]

    print('DEBUG: users:', users)
    print('DEBUG: per_user_msgs:', per_user_msgs)

    # Run async code in a separate thread to avoid blocking
    thread = threading.Thread(
        target=async_to_sync,
        args=(game_name, per_user_msgs, users)
    )
    thread.start()

    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(port=8080)