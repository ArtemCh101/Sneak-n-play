import asyncio
import httpx
from telegram import Bot

TOKEN = '8415322329:AAG4pKDLVf3nbBqBLVRnAm2VW2xXTRlTFu4'
USER_ID = 562572374  # ← Your actual ID

async def test_all():
    # 1. Test bot directly
    bot = Bot(TOKEN)
    await bot.send_message(USER_ID, "🔍 PHASE 1: Direct bot test")
    
    # 2. Test Flask API
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "http://localhost:8080/send_game",
            json={"game_name": "PHASE 2", "messages": ["Flask test"]}
        )
        print("Flask response:", response.json())

asyncio.run(test_all())