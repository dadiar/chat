// Add your JavaScript code for handling chat functionality

// Example event listener for sending a message
const sendButton = document.querySelector('.send-button');
const messageInput = document.querySelector('.message-input');
sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message !== '') {
        // Send the message
        messageInput.value = '';
    }
});
