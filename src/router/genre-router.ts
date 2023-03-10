import { Router } from "../frameworks/router";
import * as GenreController from "../controller/genre-controller";

const genreRouter = new Router();

genreRouter.post('/genres', GenreController.create);
genreRouter.get('/genres', GenreController.getAll);
genreRouter.get(/genres\/(\d*)/, GenreController.getOne);
genreRouter.patch(/genres\/(\d*)/, GenreController.updateOne);
genreRouter.delete(/genres\/(\d*)/, GenreController.deleteOne);

export { genreRouter };