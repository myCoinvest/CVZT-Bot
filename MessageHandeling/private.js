const bot = require('../server');

const CoinMarket = require('../API/coinmarket');
const cm = new CoinMarket();

function handlePrivateMessage(sender, messageEvent) {

	let username = messageEvent.from.username;
	let text_msg = messageEvent.text;

	console.log(`\nPRIVATE MESSAGE: ${username} - ${text_msg}`);

	if (text_msg) {
		if (text_msg == '/price@CVZTBot' || text_msg == "/price") {
			cm.get_price('nem', (data) => {
				bot.send_message(sender, cm.format_coin(data))
			});
		}

		if (text_msg == '/stats@CVZTBot' || text_msg == "/stats") {
			cm.get_price('nem', (data) => {
				bot.send_message(sender, cm.format_stats(data))
			});
		}
	}

	else if (text_msg == '/start') {
		let reply = "Hey there !";
		bot.send_message(sender, reply);
	}
}

module.exports = handlePrivateMessage;