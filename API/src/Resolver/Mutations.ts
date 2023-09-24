
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const mutation = {
    Mutation: {
      createUser: async (_: any, args: { name: string, phone: string, address: string }) => {
        const { name, phone, address } = args;
        const user = await prisma.users.create({
          data: { name, phone, address }
        });
        return user;
      }
}
}



// const resolvers = {
//   Mutation: {
//     createNewUser: async (parent, args, { prisma }, info) => 
//       await prisma.user.create({
//         data: {
//           ...args
//         }
//       }),
    
//     createNewCall: async (parent, args, { prisma }, info) => 
//       await prisma.call.create({
//         data: {
//           ...args,
//           user: {
//             connect: {
//               id: args.userID
//             }
//           }
//         }
//       }),

//     createNewTranscription: async (parent, args, { prisma }, info) => 
//       await prisma.transcription.create({
//         data: {
//           ...args,
//           call: {
//             connect: {
//               id: args.callID
//             }
//           }
//         }
//       }),

//     createNewEmotion: async (parent, args, { prisma }, info) => 
//       await prisma.emotion.create({
//         data: {
//           ...args,
//           transcription: {
//             connect: {
//               id: args.transcriptionID
//             }
//           }
//         }
//       }),
    
//     createNewEmotionDetail: async (parent, args, { prisma }, info) => 
//       await prisma.emotionDetail.create({
//         data: {
//           ...args,
//           emotion: {
//             connect: {
//               id: args.emotion_analysisID
//             }
//           }
//         }
//       }),

//     createNewThreatAssessment: async (parent, args, { prisma }, info) => 
//       await prisma.threatAssessment.create({
//         data: {
//           ...args,
//           emotion: {
//             connect: {
//               id: args.emotion_analysisID
//             }
//           }
//         }
//       })
//   }
// }

module.exports = mutations;
