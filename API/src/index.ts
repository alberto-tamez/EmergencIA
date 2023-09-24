import { PrismaClient } from '@prisma/client';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { CallDetailsArgs , CallDetails} from './Resolver/Types';


import { typeDefs, Timestamp } from './Models/models'
import { mutation } from './Resolver/Mutations'

const prisma = new PrismaClient();

const resolvers = {
  Timestamp,
  Query: {
    allUsers: () => {
      return prisma.users.findMany();
    }
  },
  Mutation: {
  createUser: async (_: any, args: { name: string, phone: string, address: string }) => {
    const { name, phone } = args;
    console.log("these are the args", args)
    const user = await prisma.users.create({
      data: { name: name, phone: phone }
    });
    if (user) {
      return user;
    }
  },
  createUserCallDetails: async (
    _: any,
    args: CallDetailsArgs) => {
    // Starting a transaction
        const user = await prisma.users.create({
          data: {
            name: args.name,
            phone: args.phone,
          },
        });

        const call = await prisma.calls.create({
          data: {
            userID: user.userID,
            time_called: args.time_called,
            call_ended: args.time_ended
          },
        });

        const transcription = await prisma.transcriptions.create({
          data: {
            callID: call.callID,
            call_transcription: args.call_transcription,
          },
        });

        const emotionDetail = await prisma.emotion_Details.create({
          data: {
            callID: call.callID,
            emotion_name: args.emotion_name,
            emotion_score: args.emotion_score,
          },
        });

        const threatAssessment = await prisma.threat_Assessment.create({
          data: {
            callID: call.callID,
            caller_risk: args.caller_risk,
            assessment_time: args.assessment_time,
            situation_type: args.situation_type,
            recommended_action: args.recommended_action,
            caller_situation: args.caller_situation, // Fixed typo
          },
        });

        return {
          user,
          call,
          transcription,
          emotionDetail,
          threatAssessment,
        };
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at ${url}`);
}

startServer();
