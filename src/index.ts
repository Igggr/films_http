import { config } from 'dotenv';
import { Application } from './frameworks/applications';
import { filmRouter } from './router/film-router';
import { genreRouter } from './router/genre-router';


config();

const PORT = +(process.env.APP_PORT ?? 5000);

const app = new Application();

app.addRouter(filmRouter);
app.addRouter(genreRouter);

app.listen(PORT, () => console.log(`running on port ${PORT}`));
