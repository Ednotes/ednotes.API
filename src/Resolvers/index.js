import { GraphQLDateTime } from "graphql-iso-date";

// ========= Resolvers ========//
import userResolver from "./user";
import schoolResolver from "./school";
import facultyResolver from "./faculty";
import deptResolver from "./dept";
import levelResolver from "./level";
import studentResolver from "./student";

const customDateScalarResolver = {
  Date: GraphQLDateTime
};

export default [
  userResolver,
  schoolResolver,
  facultyResolver,
  deptResolver,
  levelResolver,
  studentResolver,
  customDateScalarResolver
];