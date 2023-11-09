import TelegramBot from 'node-telegram-bot-api';
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from "koa-bodyparser";
import 'dotenv/config';

const TOKEN = process.env.token;
const PORT = process.env.port;
const bot = new TelegramBot(TOKEN);
bot.setWebHook(`${process.env.url}/bot`);

const app = new Koa();
const router = Router();
router.post('/bot', ctx => {
//	console.log(ctx);
	const { body } = ctx.request;
	bot.processUpdate(body);
	ctx.status = 200;
})
app.use(bodyParser());
app.use(router.routes());
const port = PORT;
app.listen(port, () => {
	console.log(`Listening on ${port}`);
})
bot.on('message', msg => {
	const { chat: { id }} = msg;
	bot.sendMessage(id, 'Pong');
})
bot.onText(/\/help (.+)/, (msg, [source, match]) => {
	const { chat: { id }} = msg;
	bot.sendMessage(id, match);
})