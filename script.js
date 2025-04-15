let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

let synth = window.speechSynthesis;
let voices = [];

// Load voices when available
function loadVoices() {
    voices = synth.getVoices();
    if (voices.length === 0) {
        setTimeout(loadVoices, 100);
    }
}
loadVoices();

// ---- SPEAK FUNCTION ----
function speak(text) {
    let femaleVoice = voices.find(voice =>
        voice.name.toLowerCase().includes("female") ||
        voice.name.toLowerCase().includes("zira") ||
        voice.name.toLowerCase().includes("libby") ||
        (voice.lang === "en-IN" && voice.name.toLowerCase().includes("hema")) ||
        (voice.lang === "en-GB" && voice.name.toLowerCase().includes("google"))
    );

    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";

    if (femaleVoice) {
        text_speak.voice = femaleVoice;
    }

    // Show voice animation while speaking
    voice.style.display = "block";

    // Hide animation after speaking
    text_speak.onend = () => {
        voice.style.display = "none";
    };

    synth.speak(text_speak);
}

// ---- WISHING BASED ON TIME ----
function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning Mam");
    }
    else if (hours >= 12 && hours < 18) {
        speak("Good Afternoon Mam");
    }
    else {
        speak("Good Evening Mam");
    }
}

// ---- GREETING ON PAGE LOAD ----
window.addEventListener("load", () => {
    wishMe();
});

// ---- VOICE RECOGNITION ----
let speechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition;

let recognition = new speechRecognition();

recognition.onstart = () => {
    voice.style.display = "block"; // Show GIF while listening
};

recognition.onend = () => {
    voice.style.display = "none"; // Hide GIF after listening
};

recognition.onresult = (event) => {
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;
    content.innerText = transcript;
    takeCommand(transcript);
};

// ---- MIC BUTTON ----
btn.addEventListener("click", () => {
    recognition.start();
    btn.style.display = "none";
});

// ---- COMMAND FUNCTION ----
function takeCommand(message) {
    btn.style.display = "flex";

    message = message.toLowerCase().trim().replace(/[^\w\s]/gi, "");
    console.log("You said:", message);

    if (message.includes("hello") || message.includes("hi")) {
        speak("Hello Mam, how can I help you today?");
    }
    else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Misba Khanum Mam.");
    }
    else if (message.includes("name")) {
        speak("I am bubu , your virtual assistant, created by Misba Khanum Mam.");
    }
    else if (message.includes("creator")) {
        speak("my creater is Misba Khanum Mam.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube");
        window.open("https://www.youtube.com/");
    }
    else if (message.includes("open google")) {
        speak("Opening Google");
        window.open("https://www.google.com/");
    }
    else if (message.includes("how are you")) {
        speak("I am good, thanks for the concern Mam. How are you?");
    }
    else if (message.includes("open calculator")) {
        speak("Opening calculator");
        window.open("calculator://");
    }
    else if (message.includes("open whatsapp")) {
        speak("Opening whastapp");
        window.open("whatsapp://");
    }
    else if (message.includes("time")) {
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak("The current time is " + time);
    }
    else if (message.includes("how should i call you")) {
        speak("I am virtual assistant you can not call me by name, usually my creater gave me name bubu");
    }
        
    else if (message.includes("date")) {
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak("The current time is " + date);
    }
    else if (message.includes("what is your age")) {
        speak("I am virtual assistant, I don't have age");
    }

    else {
        let query = message.replace("bubu", "").trim();
        speak(`This is what I found on the internet regarding ${query}`);
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
    
}
