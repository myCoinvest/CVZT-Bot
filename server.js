const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

// Create a TelegramBot Object
const config = require('./config');
const TelegramBot = require('./API/telegram_api');
const bot = new TelegramBot(config.api_key, config.username);
module.exports = bot;

// Initiating and Setting up Server
const app = express();
const port = process.env.PORT || 8443;
if (require.main !== module) return;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// Message Handelings
const handleGroupMessage = require('./MessageHandeling/group');
const handlePrivateMessage = require('./MessageHandeling/private');

app.get("/", (req, res) => {
    console.log('Root Page.')
    res.send('up and running')
});

app.post('/webhook', (req, res) => {
    res.sendStatus(200);

    // Handle Messages
    if (req.body.message) {
        let messageEvent = req.body.message;
        let sender = messageEvent.chat.id;
        let message_type = messageEvent.chat.type;

        if (message_type == 'private') {
            if (config.private_chat === false) return;
            handlePrivateMessage(sender, messageEvent);
        }

        else if (message_type == 'group' || message_type == 'supergroup') {
            if (config.group_chat === false) return;   
            handleGroupMessage(sender, messageEvent);
        }
    }
});

app.listen(port, () => {
    console.log('Server running at port', port);
});

bot.setWebhook('https://cvzt-bot.herokuapp.com/');
bot.getWebhookInfo();
