const jsonServer = require('json-server');
const auth = require('json-server-auth');
const path = require('path');
const cors = require('cors');

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, './db.json'));
const middlewares = jsonServer.defaults();

server.db = router.db;
server.use(cors());
server.use(auth);
server.use(router);
server.use(middlewares);

server.listen(3001, () => {
  console.log('JSON Server is running in prot 3001');
});