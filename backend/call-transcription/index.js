const WebSocket = require("ws");
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const wss = new WebSocket.Server({ server });

const path = require("path");

require("dotenv").config();

//Include Google Speech to Text
const speech = require("@google-cloud/speech");
const client = new speech.SpeechClient();

//Configure Transcription Request
const request = {
  config: {
    encoding: "MULAW",
    sampleRateHertz: 8000,
    languageCode: "es-MX",
  },
  interimResults: true, // If you want interim results, set this to true
  key: process.env.GOOGLE_CLOUD_API_KEY,
};

wss.on("connection", function connection(ws) {
  console.log("New Connection Initiated");

  let recognizeStream = null;

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
              console.log(data.results[0].alternatives[0].transcript);
              wss.clients.forEach((client) => {
                if (client.readyState === WebSocket.OPEN) {
                  client.send(
                    JSON.stringify({
                      event: "interim-transcription",
                      text: data.results[0].alternatives[0].transcript,
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

// TODO: Start server on cloud run
console.log("Listening on Port 8080");
server.listen(8080);
