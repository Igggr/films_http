import { Req, Router } from "../frameworks/router";

const filmRouter = new Router();

filmRouter.post('/films', (req, res) => { res.end('Creating film'); });
filmRouter.get('/films', (req, res) => { res.end('Info about all films'); });
filmRouter.get(/films\/(\d*)/, (req, res) => { res.end(`Info about specific film ${(req as Req).id}`); });
filmRouter.patch(/films\/(\d*)/, (req, res) => { res.end(`Updating film ${(req as Req).id}`); });
filmRouter.delete(/films\/(\d*)/, (req, res) => { res.end(`Deleting film ${(req as Req).id}`); });

export { filmRouter };