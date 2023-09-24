const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

export const gqlObjects = `#graphql
scalar Timestamp
scalar DateTime

type Users {
  userID: ID
  name: String
  phone: String
}

type CallDetails {
  user: User
  call: Calls
  transcription: Transcriptions
  emotion: Emotion_Details
  assessment: Threat_Assessment
}

type Calls {
  callID: ID
  userID: ID
  time_called: DateTime
  time_ended: DateTime
  caller_location: String
}

type Transcriptions {
  transcriptionID: ID
  callID: ID
  call_transcription: String
}

type Emotion_Details {
  detailID: ID
  callID: ID
  emotion_name: String
  emotion_score: Float
}

type Threat_Assessment {
  assessmentID: ID
  callID: ID
  caller_risk: Float
  assessment_time: DateTime
  situation_type: String
  recommended_action: String
  caller_situation: String
  timestamp: DateTime
}
type User {
    userID: Int!
    name: String
    phone: String
    calls: [Call!]
  }

type Call {
    callID: Int!
    userID: Int!
    time_called: String
    call_ended: String
    caller_location: String
    user: User!
    transcriptions: [Transcription!]!
    emotionDetails: [EmotionDetail!]!
    threatAssessments: [ThreatAssessment!]!
  }

 type Transcription {
    transcriptionID: Int!
    callID: Int!
    call_transcription: String
    call: Call!
 }
  
  type EmotionDetail {
    detailID: Int!
    callID: Int!
    emotion_name: String
    emotion_score: Float
    call: Call!
  }

  type ThreatAssessment {
    assessmentID: Int!
    callID: Int!
    caller_risk: Float
    assessment_time: String
    situation_type: String
    recommended_action: String
    caller_situation: String
    timestamp: String
    call: Call!
  }
 type Query {
  allUsers: [User]
  users: [User!]!
  calls: [Call!]!
  transcriptions: [Transcription!]!
  emotionDetails: [EmotionDetail!]!
  threatAssessments: [ThreatAssessment!]!
}
type Mutation {
  createUser(name: String!, phone: String, address: String): User!
  createUserCallDetails(
    name: String, 
    phone: String, 
    time_called: DateTime, 
    time_ended: DateTime,
    call_transcription: String,
    emotion_name: String,
    emotion_score: Float,
    caller_risk: Float,
    assessment_time: DateTime,
    situation_type: String,
    recommended_action: String,
    caller_situation: String,
    caller_location: String
  ): CallDetails!
}


schema {
   query: Query
    mutation: Mutation
  }

`;

export const t_Timestamp = new GraphQLScalarType({
   name: 'Timestamp',
   description: 'Timestamp custom scalar type',
   parseValue(value: string) {
      return new Date(value); // value from the client input variables
   },
   serialize(value: Date) {
      return value.getTime(); // value sent to the client
   },
   parseLiteral(ast: any) {
      if (ast.kind === Kind.INT) {
         return new Date(ast.value) // ast value is always in string format
      }
      return null;
   },
});

