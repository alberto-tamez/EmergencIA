from flask import Flask, request, jsonify
from transformers import pipeline, TFAutoModelForSequenceClassification, AutoTokenizer
import random
import requests
import json

app = Flask(__name__)

# Load the models and tokenizers for each pipeline
token_model = TFAutoModelForSequenceClassification.from_pretrained("dslim/bert-base-NER")
token_tokenizer = AutoTokenizer.from_pretrained("dslim/bert-base-NER")

risk_model = TFAutoModelForSequenceClassification.from_pretrained("facebook/bart-large-mnli")
risk_tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-mnli")

summary_model = TFAutoModelForSequenceClassification.from_pretrained("facebook/bart-large-cnn")
summary_tokenizer = AutoTokenizer.from_pretrained("facebook/bart-large-cnn")

sentiment_model = TFAutoModelForSequenceClassification.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")
sentiment_tokenizer = AutoTokenizer.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")

# Create pipelines with models and tokenizers
getName = pipeline("text-classification", model=token_model, tokenizer=token_tokenizer)
getLocation = pipeline("text-classification", model=token_model, tokenizer=token_tokenizer)
getSituation = pipeline("summarization", model=summary_model, tokenizer=summary_tokenizer)
getRisk = pipeline("zero-shot-classification", model=risk_model, tokenizer=risk_tokenizer)
getEmotions = pipeline("sentiment-analysis", model=sentiment_model, tokenizer=sentiment_tokenizer)
getType = pipeline("zero-shot-classification", model=risk_model, tokenizer=risk_tokenizer)

@app.route('/', methods=['POST'])
def process_transcript():
    data = request.get_json()

    if 'transcript' not in data:
        return jsonify({"error": "Transcript not provided"}), 400
    
    transcript = data['transcript']
    caller_time = data['time']
    caller_phone = data['phone']

    
    caller_name = getName(transcript, candidate_labels=["Nombre"])
    caller_location = getLocation(transcript, candidate_labels=["Ubicacion"])
    caller_situation = getSituation(transcript)
    caller_risk = getRisk(transcript, candidate_labels=["Riesgo"])
    caller_sentiment = getEmotions(transcript)
    situation_type = getType(transcript, candidate_labels=["Incendio", "Robo", "Salud", "Otro"])

    # Set up recommended service depending on situation type
    recommended_service = "Policía"
    if situation_type['labels'][0] == "Incendio":
        recommended_service = "Bomberos"
    elif situation_type['labels'][0] == "Salud":
        recommended_service = "Ambulancia"

    possible_emotions = {
        "positive": ["alivio", "alegría", "amor", "sorpresa", "neutral", "felicidad"],
        "negative": ["enojo", "tristeza", "miedo", "asco", "negativo", "preocupación", "odio"],
    }

    caller_emotions = random.sample(possible_emotions[caller_sentiment], 3)

    headers = {'Content-Type': 'application/json'}
    url = 'https://60d5-131-178-102-184.ngrok-free.app'

    variables = {
        "name": caller_name,
        "phone": caller_phone,
        "timeEnded": caller_time,
        "emotionName": caller_emotions,
        "callTranscription": transcript,
        "timeCalled": caller_time,
        "emotionScore": 1,
        "callerRisk": caller_risk,
        "situationType": situation_type,
        "assesmentTime": caller_time,
        "recommendedAction": recommended_service,
        "callerSituation": caller_situation,
        "callerLocation": caller_location,
        }
    
    mutation = """
    mutation CreateUserCallDetails($name: String, $phone: String, $timeEnded: DateTime, $emotionName: String, $callTranscription: String, $timeCalled: DateTime, $emotionScore: Float, $callerRisk: Float, $situationType: String, $assessmentTime: DateTime, $recommendedAction: String, $callerSituation: String, $callerLocation: String) {
        createUserCallDetails(name: $name, phone: $phone, time_ended: $timeEnded, emotion_name: $emotionName, call_transcription: $callTranscription, time_called: $timeCalled, emotion_score: $emotionScore, caller_risk: $callerRisk, situation_type: $situationType, assessment_time: $assessmentTime, recommended_action: $recommendedAction, caller_situation: $callerSituation, caller_location: $callerLocation) {
        call {
            callID
        }
      }
    }
    """

    response = requests.post(url, json={'query': mutation, 'variables': variables}, headers=headers)

    print(response.text)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
    