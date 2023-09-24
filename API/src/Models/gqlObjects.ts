const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

export const gqlObjects = `#graphql
scalar Timestamp
scalar DateTime

type User {
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
 type Query {
  allUsers: [User]
  user(id: ID!): User
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

