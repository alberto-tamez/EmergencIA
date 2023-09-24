const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

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

const Custom_Timestamp = new GraphQLScalarType({
   name: 'Timestamp',
   description: 'Timestamp custom scalar type',
   parseValue(value:any) {
     return new Date(value); // value from the client input variables
   },
   serialize(value:any) {
     return value.getTime(); // value sent to the client
   },
   parseLiteral(ast:any) {
     if (ast.kind === Kind.INT) {
       return new Date(ast.value) // ast value is always in string format
     }
     return null;
   },
 });

module.exports = { gqlObjects, Custom_Timestamp };
