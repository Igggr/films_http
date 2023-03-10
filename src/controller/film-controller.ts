import { IncomingMessage } from "http";
import { Req, Res } from "../frameworks/type-helpers";
import { getReqData } from "../frameworks/utils";


export async function create(req: IncomingMessage, res: Res) {
    res.write('Creating film');
    const body = await getReqData(req);
    console.log(body);
    res.end();
}

export async function getAll(req: IncomingMessage, res: Res) {
    res.end('Info about all films');
}

export async function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Info about specific film ${id}`);
}

export async function updateOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.write(`Updating film ${id}`);
    const body = await getReqData(req);
    console.log(body);
    res.end();
}

export async function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Deleting film ${id}`);
}
