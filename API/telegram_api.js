const request = require('request');

class TelegramBot {
	constructor(api_key, username = undefined) {
		if (!api_key) 
			throw new Error('Need API KEY !!');
		
		this.api_key = api_key
		this.username = username
	}

	send_message (receiver, message, parse_mode = 'html') {
		return new Promise((success, failure) => {
			let jsondata = {
				text: message,
				chat_id: receiver,
				disable_web_page_preview: false,
				parse_mode,
			}
			
			this.callSendAPI(jsondata, 'sendMessage')
				.then((data) => {
					console.log('\tMessage Sent');
					success('Message Sent')
				})
				.catch((err) => {
					console.log('\tFailed to send message:', err.description)
					failure(err.description)
				});
		})
	}

	setWebhook (webhook_url) {
		console.log('Setting up Webhook');
		const url = `https://api.telegram.org/${this.api_key}/setWebhook?url=${webhook_url}`;
		request({url, json: true}, (err, resp, data) => {
			if (err) 
				return void console.log('Error', err);
			console.log(JSON.stringify(data, null, 4))
		});
	}

	getWebhookInfo () {
		const uri = `https://api.telegram.org/${this.api_key}/getWebhookInfo`;
		request({ uri, json: true }, (err, resp, data) => {
			if (err)
				return void console.log('Error', err);
			console.log(JSON.stringify(data, null, 4))
		});
	}

	callSendAPI (jsondata, method_type) {
		return new Promise ((resolve, reject) => {

			let url = `https://api.telegram.org/${this.api_key}/${method_type}`;
			let msg_options = {
				uri: url,
				method: 'POST',
				json: true,
				body : jsondata
			}

			request(msg_options, (err, resp, data) => {
				if ( err) reject(err)
				if (resp.statusCode == 200 ) resolve(data)
				reject(resp);
			})
		});
	}
}

module.exports = TelegramBot