const { ApolloServer } = require("apollo-server");

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is the API of a Hackernews Clone`,
    feed: () => links,
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },

    deleteLink: (parent, args) => {
      let deletedLink = {};
      links = links.filter((link) => {
        if (link.id === args.id) {
          deletedLink = { ...link };
          return false;
        }
      });
      return deletedLink;
    },

    updateLink: (parent, args) => {
      link = {
        id: args.id,
        description: args.description,
        url: args.description,
      };
      links = links.map((link) => (link.id === args.id ? link : link));
      return link;
    },
  },
};

const fs = require("fs");
const path = require("path");

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
