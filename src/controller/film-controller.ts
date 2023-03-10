import { IncomingMessage } from "http";
import { Req, Res } from "../frameworks/type-helpers";


export async function create(req: IncomingMessage, res: Res) {
    res.end('Creating film'); 
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
    res.end(`Updating film ${id}`);
}

export async function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    res.end(`Deleting film ${id}`);
}
