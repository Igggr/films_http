import { IncomingMessage } from "http";
import { pool } from "../db";
import { Req, Res } from "../frameworks/type-helpers";
import { getReqData } from "../frameworks/utils";


export async function create(req: IncomingMessage, res: Res) {
    const body = await getReqData(req);
    console.log(`Creating genre from ${body}`);
    const { name } = body;
    const genres = await pool.query('INSERT INTO genre (name) VALUES ($1) RETURNING *', [name]);
    const genre = genres.rows[0];
    console.log(genre);
    res.end(JSON.stringify(genre));
}

export async function getAll(req: IncomingMessage, res: Res) {
    console.log('Info about all genres');
    const genres = await pool.query("SELECT * FROM genre");
    console.log(genres.rows);
    res.end(JSON.stringify(genres.rows));
}

export async function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Info about specific genre ${id}`); 
    const genres = await pool.query('SELECT * FROM genre WHERE id = $1', [id]);
    const genre = genres.rows[0];
    console.log(genre);
    res.end(JSON.stringify(genre));
}

export async function updateOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    const body = await getReqData(req);
    console.log(`Updating genre ${id} with ${body}`);
    const { name } = body;
    const genres = await pool.query('UPDATE genre SET name = $2 WHERE id = $1 RETURNING *', [id, name]);
    const genre = genres.rows[0];
    console.log(genre);
    res.end(JSON.stringify(genre));
}

export async function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Deleting genre ${id}`);
    await pool.query('DELETE FROM film_genre WHERE genre_id = $1', [id]);
    await pool.query('DELETE FROM genre WHERE id = $1', [id]);
    res.end('Deleted');
}
