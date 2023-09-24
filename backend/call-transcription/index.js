const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

const path = require("path");
const fs = require("fs"); // Import the fs module for file operations

require("dotenv").config();

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
  interimResults: true, // If you want interim results, set this to true
};

wss.on("connection", function connection(ws) {
  console.log("New Connection Initiated");

  let recognizeStream = null;
  let transcription = ""; // Store the transcription for the current call

  ws.on("message", function incoming(message) {
    const msg = JSON.parse(message);
    switch (msg.event) {
      case "connected":
        console.log(`A new call has connected.`);
        break;
      case "start":
        console.log(`Starting Media Stream ${msg.streamSid}`);
        // Create Stream to the Google Speech to Text API
        if (!recognizeStream) {
          recognizeStream = client
            .streamingRecognize(request)
            .on("error", console.error)
            .on("data", (data) => {
              const transcript = data.results[0].alternatives[0].transcript;
              console.log(transcript);
              transcription = transcript; // Append to the transcription for this call
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(
                    JSON.stringify({
                      event: "interim-transcription",
                      text: transcript,
                    })
                  );
                }
              });
            });
        }
        break;
      case "media":
        // Write Media Packets to the recognize stream
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

          // Save the transcription to a file
          const fileName = `call_${new Date().toISOString()}.txt`;
          fs.writeFileSync(fileName, transcription);
          console.log(`Transcription saved to ${fileName}`);
        }
        break;
    }
  });
});

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.join(__dirname, "/index.html")));

app.post("/", (req, res) => {
  res.set("Content-Type", "text/xml");

  res.send(`
    <Response>
      <Start>
        <Stream url="wss://${req.headers.host}/"/>
      </Start>
      <Say language="es-ES" voice="Polly.Enrique">
        Bienvenido a emergencia, todo va a estar bien. Dime tu nombre, dónde estás, e infórmame sobre tu situación.
      </Say>
      <Pause length="60" />
    </Response>
  `);
});

console.log("Listening on Port 8080");
server.listen(8080);
