"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Timestamp = exports.typeDefs = void 0;
// const { objects, Timestamp } = require('./gqlObjects');
const gqlObjects_1 = require("./gqlObjects");
// En esta parte del codigo estamos juntando todo los typeDefs para que 
// podamos tener separados tipo los queries y los mutations y los objetos y asi los tenemos declarados y facil de accesar
exports.typeDefs = gqlObjects_1.gqlObjects;
exports.Timestamp = gqlObjects_1.t_Timestamp;
