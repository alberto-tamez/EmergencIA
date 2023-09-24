"use strict";
const gqlObjects = `#graphql
type Users {
    userID: ID!
    name: String
    phone: String
    address: String
 }
 type Calls {
    callID: ID!
    user: Users
    timestamp: Timestamp
    call_audio_location: String
 }
 type Transcriptions {
    transcriptionID: ID!
    call: Calls
    transcription_text: String
 }
 type Emotions {
    emotion_analysisID: ID!
    transcription: Transcriptions
    source_type: String
 }
 type Emotion_Details {
    detailID: ID!
    emotion_analysis: Emotions
    emotion_name: String
    emotion_score: Float
 }
 type Threat_Assessment {
    assessmentID: ID!
    emotion_analysis: Emotions
    threat_level: Int
    timestamp: Timestamp
 }
 schema {
    query: Query
    mutation: Mutation
  }
       
`;
module.exports = gqlObjects;
