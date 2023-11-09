import TelegramBot from "node-telegram-bot-api";
// Импорт dotenv для защиты API токена
// require('dotenv').config()
import 'dotenv/config';

const TOKEN = process.env.token;
const PORT = process.env.port;
const bot = new TelegramBot(TOKEN, {
  webHook: {
    port: PORT,
    autoOpen: false
  }
});

bot.openWebHook();
bot.setWebHook(`${process.env.url}/bot${TOKEN}`);

bot.on('message', msg => {
  const { chat: {id}} = msg;
  bot.sendMessage(id, 'Pong');
})
bot.onText(/\/help (.+)/, (msg, [source, match]) => {
  const { chat: {id}} = msg;
  bot.sendMessage(id, match);
})