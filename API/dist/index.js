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
const typeDefs = require('./Models/models');
const prisma = new client_1.PrismaClient();
const resolvers = {
    Query: {
        allUsers: () => {
            return prisma.users.findMany();
        }
    }
};
const server = new server_1.ApolloServer({ typeDefs, resolvers });
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
