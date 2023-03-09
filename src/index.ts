import { createServer } from 'http';
import { config } from 'dotenv';


config();

const PORT = process.env.APP_PORT;
const server = createServer();

server.on('request', (req, res) => { res.end("hello"); });

server.listen(PORT, () => console.log(`running on port ${PORT}`));
