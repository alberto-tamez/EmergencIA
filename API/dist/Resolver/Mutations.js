"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const mutation = {
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, phone, address } = args;
            const user = yield prisma.users.create({
                data: { name, phone, address }
            });
            return user;
        })
    }
};
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
