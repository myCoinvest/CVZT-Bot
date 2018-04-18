const bot = require('../server');

const CoinMarket = require('../API/coinmarket');
const cm = new CoinMarket();

const handleGroupMessage = (sender, messageEvent) => {

	let username = messageEvent.from.username;
	let group_name = messageEvent.chat.title;
	let text_msg = messageEvent.text;

	if (text_msg) {
		console.log(`GROUP MESSAGE - ${group_name}: ${text_msg}`);
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
}

module.exports = handleGroupMessage;