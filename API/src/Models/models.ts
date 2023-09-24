
// const { objects, Timestamp } = require('./gqlObjects');
import { gqlObjects, t_Timestamp } from './gqlObjects';



// En esta parte del codigo estamos juntando todo los typeDefs para que 
// podamos tener separados tipo los queries y los mutations y los objetos y asi los tenemos declarados y facil de accesar
export const typeDefs = gqlObjects 
export const Timestamp = t_Timestamp;


