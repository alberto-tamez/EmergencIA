
const { objects, CustomTimestamp } = require('./gqlObjects');

const mutations = require('./mutations');


// En esta parte del codigo estamos juntando todo los typeDefs para que 
// podamos tener separados tipo los queries y los mutations y los objetos y asi los tenemos declarados y facil de accesar
const final = objects + mutations

console.log("Final typeDefs: " , final),

module.exports = {final, CustomTimestamp};
