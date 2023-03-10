import { Router } from "../frameworks/router";

const genreRouter = new Router();

genreRouter.post('/genres', (req, res) => { res.end('Creating genre'); });
genreRouter.get('/genres', (req, res) => { res.end('Info about all genres'); });
genreRouter.get(/genres\/(\d*)/, (req, res) => { res.end('Info about specific genre'); });
genreRouter.patch(/genres\/(\d*)/, (req, res) => { res.end('Updating genre'); });
genreRouter.delete(/genres\/(\d*)/, (req, res) => { res.end('Deleting genre'); });

export { genreRouter };