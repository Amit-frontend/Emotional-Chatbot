const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const emojiBtn = document.getElementById("emoji-btn");
const voiceBtn = document.getElementById("voice-btn");

let userName = "";

// Add message to chat
function addMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "user-message" : "bot-message";
    messageDiv.innerText = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Ask for user's name at the beginning
function askUserName() {
    addMessage("Hi! What's your name? 😊", false);
}

// Send message
sendBtn.addEventListener("click", () => {
    const message = userInput.value.trim();
    if (message) {
        if (!userName) {
            userName = message;
            addMessage(`Nice to meet you, ${userName}! How are you feeling today? ❤️`, false);
        } else {
            addMessage(message, true);
            getBotResponse(message);
        }
        userInput.value = "";
    }
});

// Emoji support
emojiBtn.addEventListener("click", () => {
    userInput.value += "😊";
    userInput.focus();
});

// Voice input
voiceBtn.addEventListener("click", () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.onstart = () => console.log("Listening...");
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
    };
    recognition.start();
});

// Get bot response with enhanced responses
function getBotResponse(userMessage) {
    let botResponse;
    const lowerCaseMessage = userMessage.toLowerCase();

    if (lowerCaseMessage.includes("sad")) {
        botResponse = `I'm here for you, ${userName}. It's okay to feel this way. ❤️`;
    } else if (lowerCaseMessage.includes("happy")) {
        botResponse = `That's wonderful, ${userName}! 😄 What made you happy today?`;
    } else if (lowerCaseMessage.includes("anxious")) {
        botResponse = `Take a deep breath, ${userName}. I'm here. Want to talk about what's making you anxious? 🌸`;
    } else if (lowerCaseMessage.includes("angry")) {
        botResponse = `It's okay to feel angry, ${userName}. Would you like to talk about what's bothering you? 😡`;
    } else if (lowerCaseMessage.includes("tired")) {
        botResponse = `You must be exhausted, ${userName}. Maybe a little rest will help. 😴`;
    } else if (lowerCaseMessage.includes("lonely")) {
        botResponse = `You're not alone, ${userName}. I'm here to talk whenever you need. 🤗`;
    } else if (lowerCaseMessage.includes("excited")) {
        botResponse = `That's amazing, ${userName}! What are you excited about? 🎉`;
    } else if (lowerCaseMessage.includes("depressed")) {
        botResponse = `I'm really sorry to hear that, ${userName}. You don't have to go through this alone. I'm here to listen. 💙`;
    } else if (lowerCaseMessage.includes("i love you")) {
        botResponse = `Aww, that's so sweet, ${userName}! ❤️ I'm here for you always! 🤗`;
    } else {
        botResponse = `Tell me more, ${userName}. I'm listening. 🤗`;
    }

    setTimeout(() => addMessage(botResponse, false), 1000);
}

// Enter key to send
userInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

// Start by asking the user's name
askUserName();
