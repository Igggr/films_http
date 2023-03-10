import { createServer } from 'http';
import { config } from 'dotenv';
import { Application } from './frameworks/applications';
import { filmRouter } from './router/film-router';


config();

const PORT = +(process.env.APP_PORT ?? 5000);

const app = new Application();

app.addRouter(filmRouter);

app.listen(PORT, () => console.log(`running on port ${PORT}`));
