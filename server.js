const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add custom middleware to include X-Total-Count header
server.use((req, res, next) => {
  if (req.method === 'GET' && req.url.includes('/clients')) {
    const clients = router.db.get('clients').value();
    res.setHeader('X-Total-Count', clients.length);
  }
  next();
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running on http://localhost:3000');
});
