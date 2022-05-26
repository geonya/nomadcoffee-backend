require("dotenv").config();
import { makeExecutableSchema } from "@graphql-tools/schema";
import { graphqlUploadExpress } from "graphql-upload";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { createServer } from "http";
import * as express from "express";
import * as logger from "morgan";
import client from "./client";
import { getUser } from "./users/users.utils";

const startServer = async () => {
	const app = express();
	app.use(logger("dev"));
	app.use(graphqlUploadExpress());
	app.use("/static", express.static("uploads"));
	const schema = makeExecutableSchema({ typeDefs, resolvers });
	const httpServer = createServer(app);
	const apolloServer = new ApolloServer({
		schema,
		context: async ({ req }) => {
			if (req) {
				return { loggedInUser: await getUser(req.headers.token), client };
			}
		},
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
