require("dotenv").config();
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { createServer } from "http";
import express from "express";
import logger from "morgan";

const startServer = async () => {
	const app = express();
	app.use(logger("dev"));
	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const httpServer = createServer(app);
	const apolloServer = new ApolloServer({
		schema,
	});
	await apolloServer.start();
	apolloServer.applyMiddleware({ app });
	httpServer.listen(process.env.PORT, () =>
		console.log(
			`🚀 Server Ready at http://localhost:${process.env.PORT}${apolloServer.graphqlPath} ✅`
		)
	);
};

startServer();
