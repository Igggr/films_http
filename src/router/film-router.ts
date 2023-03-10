import { Router } from "../frameworks/router";

const filmRouter = new Router();

filmRouter.post('/films', (req, res) => { res.end('Creating film'); });
filmRouter.get('/films', (req, res) => { res.end('Info about all films'); });
filmRouter.get(/films\/(\d*)/, (req, res) => { res.end('Info about specific film'); });
filmRouter.patch(/films\/(\d*)/, (req, res) => { res.end('Updating film'); });
filmRouter.delete(/films\/(\d*)/, (req, res) => { res.end('Deleting film'); });

export { filmRouter };