let main = document.querySelector('#main');
let content = document.querySelector('#content');
let logo = document.querySelector('#logo');
let recog;
let logo1 = document.querySelector('#logo1');
const btn = document.getElementById('btn');
let jarvisVoice = null;

// Load and cache voices once
function loadVoices() {
  const allVoices = speechSynthesis.getVoices();
  jarvisVoice = allVoices.find(v => v.name === "Google UK English Male");

  if (!jarvisVoice) {
    console.warn("Google UK English Male voice not found. Using default.");
    jarvisVoice = allVoices[0]; // fallback
  }
}

// In Chrome, voices may not be ready immediately
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text) {
  const utter = new SpeechSynthesisUtterance(text);
  utter.voice = jarvisVoice;
  utter.lang = 'en-GB';
  utter.rate = 1.3;
  utter.pitch = 0.8;
  utter.volume = 1.5;
  speechSynthesis.speak(utter);
}






function Listen() {
    recog.start()
    main.style.display = 'table';
    logo.src = 'iron man marvel GIF.gif';
    logo.style.display = 'block';
    logo1.style.display = 'none';
}
function speakNShow(response) {
    speak(response);
    content.innerText = response;
    logo.src = 'Iron Man GIF.gif';
}


// Command logic
function takeCommand(message) {
    btn.style.display = 'none';
    main.style.display = 'table';
      
        if (message.includes('hello jarvis')) {
          speakNShow('Welcome back Sir. Power levels are optimal. Shall we begin?');
      
        } else if (message.includes('what are you')) {
          speakNShow('I am a virtual assistant named Jarvis, created by Rudraksh Malhotra.');
      
        } else if (message.includes('how are you')) {
          speakNShow('At this moment, I am functioning at optimal efficiency.');
      
        } else if (message.includes('thank you')) {
          speakNShow('Always at your service, Sir.');
      
        } else if (message.includes('time')) {
          const time = new Date().toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric' });
          speakNShow(`The current time is ${time}.`);
      
        } else if (message.includes('date')) {
          const date = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'long' });
          speakNShow(`Today is ${date}.`);
      
        } else if (message.includes('open youtube')) {
          speakNShow('Opening YouTube.');
          window.open('https://www.youtube.com', '_blank');
      
        } else if (message.includes('open instagram')) {
          speakNShow('Opening Instagram.');
          window.open('https://www.instagram.com', '_blank');
      
        } else if (message.includes('open google')) {
          speakNShow('Opening Google.');
          window.open('https://www.google.com', '_blank');
      
        } else if (message.includes('open whatsapp')) {
          speakNShow('Opening WhatsApp Web.');
          window.open('https://web.whatsapp.com', '_blank');
      
        } else if (message.includes('weather')) {
          speakNShow('Checking the weather for you.');
          window.open('https://www.google.com/search?q=weather', '_blank');
      
        } else if (message.includes('news')) {
          speakNShow('Here are the latest news headlines.');
          window.open('https://news.google.com', '_blank');
      
        } else if (message.includes('play music')) {
          speakNShow('Here is the music choose to play .');
          window.open('https://open.spotify.com', '_blank');
      
        } else if (message.includes('shutdown') || message.includes('stop')) {
          speakNShow('Shutting down the assistant. Goodbye Sir!');
          setTimeout(() => window.close(), 4000);
      
        } else {
          // Fallback to search
          speakNShow(`Here’s what I found on the internet for ${message.replace('jarvis', '')}.`);
          window.open(`https://www.google.com/search?q=${message.replace('jarvis', '')}`, '_blank');
        }
      }



// Initialize speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    recog = new SpeechRecognition();
    recog.continuous = false;
    recog.lang = 'en-US';

    recog.onresult = (e) => {
        recog.stop();
        const transcript = e.results[0][0].transcript.toLowerCase().trim();
        takeCommand(transcript);
        setTimeout(() => {
            content.innerText = '';
            Listen()
        }, 4000);  // Jarvis should speak for less than three seconds or your program fails
        
        
    }
}

// Greet user based on time
function wishMe() {
    const hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak('Good Morning Sir');
    } else if (hours < 16) {
        speak('Good Afternoon Sir');
    } else {
        speak('Good Evening Sir');
    }
}

// Start system only after button click
btn.addEventListener('click', () => {
    wishMe(); // now it's safe after click
    speak("System activated., command me when you're ready.");
    setTimeout(Listen, 3700);
    btn.style.display = 'none';
    logo1.style.display = 'block';
    document.body.style.backgroundImage = "none";
    document.body.style.backgroundColor = '#171717';
    document.body.style.color = '#2187e7;';






});

// On load: wait for user to click
window.addEventListener('load', () => {

    btn.style.display = 'block';
    main.style.display = 'none';
});

document.addEventListener('keydown', (e) => {
    if (e.key == 'j') {
        Listen()
        btn.style.display = 'none';
        logo1.style.display = 'none';
        document.body.style.backgroundImage = "none";
        document.body.style.backgroundColor = '#171717';
        document.body.style.color = '#2187e7;';

    }
})