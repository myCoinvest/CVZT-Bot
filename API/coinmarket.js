const request = require('request');

class CoinMarketCap {

	constructor(options = {}) {
		this.API_URL = "https://api.coinmarketcap.com/v1/";
		this.convert = options.convert || "USD";
		this.convert = this.convert.toLowerCase();
	}

	_getJSON(url, callback) {
		url = this.API_URL + url;
		request({ url, json:true}, (error, response, data) => {
			if (error) return void callback(false);
			if (response && response.statusCode == 200) return void callback(data);
			callback(false);
		});
	}

	get_price(coin, callback) {
		if (!callback) return false;
		this._getJSON(`ticker/${coin}/?convert=${this.convert}`, (res) => {
			if (res) { callback(res[0]); }
		});
		return this;
	}

	get_stats(coin, callback) {
		if (!callback) return false;
		this._getJSON(`ticker/${coin}/?convert=${this.convert}`, (res) => {
			if (res) { callback(res[0]); }
		});
		return this;
	}

	format_coin(data) {
		if (!data) return 'This coin is not listed on exchanges we support';
		let price = ( 2.5 * Number(data.price_usd) ).toFixed(3)
		let reply = `1 CVZT = $${price}`;
		return reply;
	}

	format_stats(data) {
		if (!data) return 'Empty Data';
		let ch_1hr = data.percent_change_1h;
		let ch_24hr = data.percent_change_24h;
		let ch_7d = data.percent_change_7d;

		let reply = "Price movements:\n";
		reply += `1h ▲ ${ch_1hr} % | 24h ▲ ${ch_24hr} % | 7d ▲ ${ch_7d} %`; // ▼
		return reply;
	}
}

module.exports = CoinMarketCap;