import { gql } from "apollo-server-express";

import userTypeDefs from "./user";
import schoolTypeDefs from "./school";
import facultyTypeDefs from "./faculty";
import deptTypeDefs from "./dept";
import levelTypeDefs from "./level";
import studentTypeDefs from "./student";

const typeDefs = gql`
  scalar Date

  type Query {
    _: String
  }
  type Mutation {
    _: String
  }
  type Subscription {
    _: String
  }
`;

export default [
  typeDefs,
  userTypeDefs,
  schoolTypeDefs,
  facultyTypeDefs,
  deptTypeDefs,
  levelTypeDefs,
  studentTypeDefs
];