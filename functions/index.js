const functions = require("firebase-functions");
const express = require("express");
const WebSocket = require("ws");
const axios = require("axios");

const app = express();

// Include Google Speech to Text
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();

// Configure Transcription Request
const request = {
  config: {
    encoding: "MULAW",
    sampleRateHertz: 8000,
    languageCode: "es-MX",
  },
  interimResults: true,
};

const wss = new WebSocket.Server({noServer: true});

wss.on("connection", (ws) => {
  console.log("New Connection Initiated");
  let recognizeStream = null;
  let transcription = "";

  ws.on("message", (message) => {
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log(`A new call has connected`);
        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);

        if (!recognizeStream) {
          recognizeStream = client
              .streamingRecognize(request)
              .on("error", console.error)
              .on("data", (data) => {
                const transcript = data.results[0].alternatives[0].transcript;
                transcription = transcript;
              });
        }
        break;
      case "media":
        if (recognizeStream) {
          recognizeStream.write(msg.media.payload);
        }
        break;
      case "stop":
        console.log(`Call Has Ended`);
        if (recognizeStream) {
          recognizeStream.end();
          recognizeStream.removeAllListeners();
          recognizeStream = null;
          const currentTime = new Date().toISOString();

          // Send the transcription to your Python backend
          sendTranscript(transcription, currentTime);
        }
        break;
    }
  });
});

app.all("*", (req, res) => {
  res.status(404).send("Not Found");
});

/**
 * Sends the transcription to a Python backend.
 * @param {string} transcript - The transcription to send.
 * @param {string} currentTime - The current time in ISO format.
 */
async function sendTranscript(transcript, currentTime) {
  try {
    const response = await axios.post("http://your-python-backend-url", {
      transcript: transcript,
      phone: "+52 81 2383 1010",
      time: currentTime,
    });
    console.log("Transcript sent to backend:", response.data);
  } catch (error) {
    console.error("Error sending transcript:", error.message);
  }
}

exports.websocketFunction = functions.https.onRequest(app);
