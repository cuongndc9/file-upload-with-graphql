const typeDef = `
  scalar Upload
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }
  extend type Query {
    uploads: [File]
  }
  extend type Mutation {
    singleUpload(file: Upload!): File!
  }
`;

export default typeDef;
