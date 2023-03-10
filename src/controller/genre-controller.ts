import { IncomingMessage } from "http";
import { Req, Res } from "../frameworks/type-helpers";


export function create(req: IncomingMessage, res: Res) {
    res.end('Creating genre');
}

export function getAll(req: IncomingMessage, res: Res) {
    res.end('Info about all genres');
}

export function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Info about specific genre ${id}`); 
}

export function updateOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Updating genre ${id}`);
}

export function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Deleting genre ${id}`);
}
