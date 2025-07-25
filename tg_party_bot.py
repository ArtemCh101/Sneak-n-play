import logging
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

TOKEN = '8415322329:AAG4pKDLVf3nbBqBLVRnAm2VW2xXTRlTFu4'

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    # Check if user_id is already in users.txt
    try:
        with open('users.txt', 'r') as f:
            existing = set(line.strip() for line in f if line.strip())
    except FileNotFoundError:
        existing = set()
    if str(user_id) not in existing:
        with open('users.txt', 'a') as f:
            f.write(f"{user_id}\n")
    await update.message.reply_text('Вы зарегистрированы!')

def main():
    open('users.txt', 'w').close()  # Clear on startup
    app = Application.builder().token(TOKEN).build()
    app.add_handler(CommandHandler("start", start))
    app.run_polling()

if __name__ == '__main__':
    main()