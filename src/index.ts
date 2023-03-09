import { createServer } from 'http';

const PORT = 3000;
const server = createServer();

server.on('request', (req, res) => { res.end("hello") });

server.listen(PORT, () => console.log(`running on Port ${PORT}`));
