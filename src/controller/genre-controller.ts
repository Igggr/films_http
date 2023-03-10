import { IncomingMessage } from "http";
import { Req, Res } from "../frameworks/type-helpers";
import { getReqData } from "../frameworks/utils";


export async function create(req: IncomingMessage, res: Res) {
    res.write('Creating genre');
    const body = await getReqData(req);
    console.log(body);
    res.end();
}

export function getAll(req: IncomingMessage, res: Res) {
    res.end('Info about all genres');
}

export function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Info about specific genre ${id}`); 
}

export async function updateOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.write(`Updating genre ${id}`);
    const body = await getReqData(req);
    console.log(body);
    res.end();
}

export function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Deleting genre ${id}`);
}
