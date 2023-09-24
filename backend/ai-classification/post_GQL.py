import requests
import json
from datetime import datetime

datetime.utcnow().isoformat() + "Z"

url = 'http://localhost:4000/graphql'

headers = {'Content-Type': 'application/json'}

# replace with your own details
variables = {
    'name': 'Your name',
    'phone': 'Your phone',
    'timeEnded': datetime.utcnow().isoformat() + "Z",
    'emotionName': 'Your emotionName',
    'callTranscription': 'Your callTranscription',
    'timeCalled': datetime.utcnow().isoformat() + "Z",
    'emotionScore': 1.0,
    'callerRisk': 1.0,
    'situationType': 'Your situationType',
    'assessmentTime': datetime.utcnow().isoformat() + "Z",
    'recommendedAction': 'Your recommendedAction',
    'callerSituation': 'Your callerSituation',
    'callerLocation': 'Your caller_location'
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
