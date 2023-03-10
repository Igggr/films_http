import { Req, Router } from "../frameworks/router";

const genreRouter = new Router();

genreRouter.post('/genres', (req, res) => { res.end('Creating genre'); });
genreRouter.get('/genres', (req, res) => { res.end('Info about all genres'); });
genreRouter.get(/genres\/(\d*)/, (req, res) => { res.end(`Info about specific genre ${(req as Req).id}`); });
genreRouter.patch(/genres\/(\d*)/, (req, res) => { res.end(`Updating genre ${(req as Req).id}`); });
genreRouter.delete(/genres\/(\d*)/, (req, res) => { res.end(`Deleting genre ${(req as Req).id}`); });

export { genreRouter };