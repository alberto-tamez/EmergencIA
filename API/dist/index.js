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
const client_1 = require("@prisma/client");
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const models_1 = require("./Models/models");
const prisma = new client_1.PrismaClient();
const resolvers = {
    Timestamp: models_1.Timestamp,
    Query: {
        allUsers: () => {
            return prisma.users.findMany();
        },
        users: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.users.findMany(); }),
        calls: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.calls.findMany(); }),
        transcriptions: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.transcriptions.findMany(); }),
        emotionDetails: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.emotion_Details.findMany(); }),
        threatAssessments: () => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.threat_Assessment.findMany(); }),
    },
    User: {
        calls: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.calls.findMany({ where: { userID: parent.userID } }); }),
    },
    Call: {
        user: (parent) => __awaiter(void 0, void 0, void 0, function* () { return parent.userID !== null ? yield prisma.users.findUnique({ where: { userID: parent.userID } }) : null; }),
        transcriptions: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.transcriptions.findMany({ where: { callID: parent.callID } }); }),
        emotionDetails: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.emotion_Details.findMany({ where: { callID: parent.callID } }); }),
        threatAssessments: (parent) => __awaiter(void 0, void 0, void 0, function* () { return yield prisma.threat_Assessment.findMany({ where: { callID: parent.callID } }); }),
    },
    Transcription: {
        call: (parent) => __awaiter(void 0, void 0, void 0, function* () { return parent.callID !== null ? yield prisma.calls.findUnique({ where: { callID: parent.callID } }) : null; }),
    },
    EmotionDetail: {
        call: (parent) => __awaiter(void 0, void 0, void 0, function* () { return parent.callID !== null ? yield prisma.calls.findUnique({ where: { callID: parent.callID } }) : null; }),
    },
    ThreatAssessment: {
        call: (parent) => __awaiter(void 0, void 0, void 0, function* () { return parent.callID !== null ? yield prisma.calls.findUnique({ where: { callID: parent.callID } }) : null; }),
    },
    Mutation: {
        createUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { name, phone } = args;
            console.log("these are the args", args);
            const user = yield prisma.users.create({
                data: { name: name, phone: phone }
            });
            if (user) {
                return user;
            }
        }),
        createUserCallDetails: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            // Starting a transaction
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
                    call_ended: args.time_ended,
                    caller_location: args.caller_location
                },
            });
            const transcription = yield prisma.transcriptions.create({
                data: {
                    callID: call.callID,
                    call_transcription: args.call_transcription,
                },
            });
            const emotionDetail = yield prisma.emotion_Details.create({
                data: {
                    callID: call.callID,
                    emotion_name: args.emotion_name,
                    emotion_score: args.emotion_score,
                },
            });
            const threatAssessment = yield prisma.threat_Assessment.create({
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
        })
    },
};
const server = new server_1.ApolloServer({
    typeDefs: models_1.typeDefs,
    resolvers
});
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const { url } = yield (0, standalone_1.startStandaloneServer)(server, {
            context: ({ req }) => __awaiter(this, void 0, void 0, function* () { return ({ token: req.headers.token }); }),
            listen: { port: 4000 },
        });
        console.log(`🚀  Server ready at ${url}`);
    });
}
startServer();
