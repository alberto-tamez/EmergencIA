"use strict";
const mutation_string = `

type Mutation {
    createUser(name: String, phone: String, address: String): User
  }
`;
module.exports = mutation_string;
