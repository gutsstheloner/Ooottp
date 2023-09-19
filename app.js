const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Replace 'YOUR_BOT_TOKEN' with your actual Telegram bot token
const token = '6428554817:AAF9P1rx0-X2HLlbsuAPLwgqW_uyEN07kLE';

// Create a bot instance
const bot = new TelegramBot(token, { polling: true });

// Function to append a message to the HTML file and save it
function appendAndSaveMessageToHTML(message) {
  // Read the current content of the HTML file
  fs.readFile('chat.html', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading HTML file:', err);
      return;
    }

    // Append the new message to the existing content
    const updatedContent = data + `<p class="message">${message}</p>\n`;

    // Write the updated content back to the HTML file
    fs.writeFile('chat.html', updatedContent, (err) => {
      if (err) {
        console.error('Error writing HTML file:', err);
      } else {
        console.log('Message appended and saved to HTML file:', message);
      }
    });
  });
}

// Route incoming messages to functions to handle them
bot.on('message', (msg) => {
  const messageText = msg.text;

  // Append the message to the HTML file and save it
  appendAndSaveMessageToHTML(messageText);

  // Append the message to the chat interface
  const messageContainer = document.createElement('p');
  messageContainer.innerText = messageText;
  const messagesDiv = document.getElementById('messages');
  messagesDiv.appendChild(messageContainer);

  // Scroll to the latest message
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
});

console.log('Telegram bot is running...');
