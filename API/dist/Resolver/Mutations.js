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
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutation = void 0;
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
exports.mutation = {
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, phone, address } = args;
            const user = yield prisma.users.create({
                data: { name, phone, address }
            });
            return user;
        }),
        createUserCallDetails: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            // Starting a transaction
            return context.prisma.$transaction((prisma) => __awaiter(void 0, void 0, void 0, function* () {
                try {
                    const user = yield prisma.users.create({
                        data: {
                            name: args.name,
                            phone: args.phone,
                        },
                    });
                    const call = yield prisma.calls.create({
                        data: {
                            userID: user.userID,
                            time_called: args.time_called,
                            time_ended: args.time_ended,
                        },
                    });
                    const transcription = yield prisma.transcriptions.create({
                        data: {
                            callID: call.callID,
                            call_transcription: args.call_transcription,
                        },
                    });
                    const emotionDetail = yield prisma.emotion_details.create({
                        data: {
                            callID: call.callID,
                            emotion_name: args.emotion_name,
                            emotion_score: args.emotion_score,
                        },
                    });
                    const threatAssessment = yield prisma.threat_assessment.create({
                        data: {
                            callID: call.callID,
                            caller_risk: args.caller_risk,
                            assessment_time: args.assessment_time,
                            situation_type: args.situation_type,
                            recommended_action: args.recommended_action,
                            caller_situation: args.caller_situation,
                            threat_timestamp: args.threat_timestamp, // Fixed typo
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
                catch (error) {
                    console.error(error);
                }
            }));
        }),
    },
};
// export const mutation = {
//     Mutation: {
//       createUser: async (_: any, args: { name: string, phone: string, address: string }) => {
//         const { name, phone, address } = args;
//         const user = await prisma.users.create({
//           data: { name, phone, address }
//         });
//         return user;
//       },
//       createUserCallDetails: async (
//         _: undefined, 
//         args: CallDetailsArgs, 
//         context: { prisma: typeof PrismaClient }, 
//       ): Promise<CallDetails> => {
//         // Starting a transaction
//         return context.prisma.$transaction(async (prisma: typeof PrismaClient) => {
//           try {
//             const user = await prisma.users.create({
//               data: {
//                 name: args.name,
//                 phone: args.phone,
//               },
//             });
//             const call = await prisma.calls.create({
//               data: {
//                 userID: user.userID,
//                 time_called: args.time_called,
//                 time_ended: args.time_ended,
//               },
//             });
//             const transcription = await prisma.transcriptions.create({
//               data: {
//                 callID: call.callID,
//                 call_transcription: args.call_transcription,
//               },
//             });
//             const emotionDetail = await prisma.emotion_details.create({
//               data: {
//                 callID: call.callID,
//                 emotion_name: args.emotion_name,
//                 emotion_score: args.emotion_score,
//               },
//             });
//             const threatAssessment = await prisma.threat_assessment.create({
//               data: {
//                 callID: call.callID,
//                 caller_risk: args.caller_risk,
//                 assessment_time: args.assessment_time,
//                 situation_type: args.situation_type,
//                 recommended_action: args.recommended_action,
//                 caller_situation: args.caller_situation,
//                 timestamp: args.timestamp,
//               },
//             });
//             return {
//               user,
//               call,
//               transcription,
//               emotionDetail,
//               threatAssessment
//             };
//           } catch (error) {
//             // Handle your error in whatever way is appropriate in your case
//             throw new Error(`Something went wrong during creation: ${error}`);
//           }
//         });
//       },
// }
// }
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
