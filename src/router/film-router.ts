import { Router } from "../frameworks/router";
import * as FilmController from "../controller/film-controller";

const filmRouter = new Router();

filmRouter.post('/films', FilmController.create);
filmRouter.get('/films', FilmController.getAll);
filmRouter.get(/films\/(\d*)/, FilmController.getOne);
filmRouter.patch(/films\/(\d*)/, FilmController.updateOne);
filmRouter.delete(/films\/(\d*)/, FilmController.deleteOne);

export { filmRouter };