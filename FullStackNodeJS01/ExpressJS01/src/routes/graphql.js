import { createHandler } from "graphql-http/lib/use/express";
import schema from "../graphql/schema.js";
import auth from "../middleware/auth.js";

const graphqlRouter = (app) => {
  // GraphQL endpoint with authentication
  app.all(
    "/graphql",
    auth,
    createHandler({
      schema: schema,
      context: (req) => {
        // graphql-http wraps the original express req in req.raw
        const user = req.raw?.user || req.user;
        return { user };
      },
    })
  );

  // GraphiQL interface (optional, for testing)
  app.get("/graphiql", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>GraphiQL</title>
          <style>
            body {
              height: 100vh;
              margin: 0;
              width: 100%;
              overflow: hidden;
            }
            #graphiql {
              height: 100vh;
            }
          </style>
          <script
            crossorigin
            src="https://unpkg.com/react@18/umd/react.production.min.js"
          ></script>
          <script
            crossorigin
            src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"
          ></script>
          <link rel="stylesheet" href="https://unpkg.com/graphiql/graphiql.min.css" />
        </head>
        <body>
          <div id="graphiql">Loading...</div>
          <script
            src="https://unpkg.com/graphiql/graphiql.min.js"
            type="application/javascript"
          ></script>
          <script>
            const fetcher = GraphiQL.createFetcher({
              url: '/graphql',
              headers: {
                'Authorization': 'Bearer ' + (localStorage.getItem('access_token') || '')
              }
            });

            const root = ReactDOM.createRoot(document.getElementById('graphiql'));
            root.render(
              React.createElement(GraphiQL, {
                fetcher: fetcher,
                defaultEditorToolsVisibility: true,
              })
            );
          </script>
        </body>
      </html>
    `);
  });
};

export default graphqlRouter;
