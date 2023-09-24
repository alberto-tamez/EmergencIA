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

    try:
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

        result = {
            "caller_name": caller_name,
            "caller_location": caller_location,
            "caller_situation": caller_situation[0]['summary_text'],
            "caller_risk": caller_risk['scores'][0],
            "time_called": caller_time,
            "caller_emotions": caller_emotions,
            "situation_type": situation_type,
            "recommended_service": recommended_service,
            "caller_phone": caller_phone,
            "full_transcript": transcript
        }

        print(result)
        return jsonify(result), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)