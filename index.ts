import "reflect-metadata";
import { resolvers, applyInputTypesEnhanceMap } from "@generated/type-graphql";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { MinLength } from "class-validator";
import { PrismaClient } from ".prisma/client";

applyInputTypesEnhanceMap({
  PostCreateInput: {
    fields: {
      title: [MinLength(10)],
    },
  },
});

async function main() {
  const prisma = new PrismaClient();

  const schema = await buildSchema({
    resolvers,
  });

  const server = new ApolloServer({ schema, context: { prisma } });

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
