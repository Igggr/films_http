import { IncomingMessage } from "http";
import { pool } from "../db";
import { Req, Res } from "../frameworks/type-helpers";
import { getReqData } from "../frameworks/utils";

const SELECT = `\
    SELECT genre.id, genre.name, json_agg(film.title) AS films \
        FROM genre 
        LEFT JOIN film_genre ON genre.id = film_genre.genre_id \
        LEFT JOIN film ON film_genre.film_id = film.id`;

const GROUP = `GROUP BY genre.id`;

const ONE_GENRE_QUERY = `${SELECT} WHERE genre.id = $1 ${GROUP};`;
const ALL_GENRE_QUERY = `${SELECT} ${ GROUP };`;

export async function create(req: IncomingMessage, res: Res) {
    const body = await getReqData(req);
    console.log(`Creating genre from ${body}`);
    const { name } = body;
    // JOIN-ить с фильмами смысла нет - пока ссылок на этот жанр еще нету
    const genres = await pool.query('INSERT INTO genre (name) VALUES ($1) RETURNING id', [name]);
    const genre = genres.rows[0];
    console.log(genre);
    res.end(JSON.stringify(genre));
}

export async function getAll(req: IncomingMessage, res: Res) {
    console.log('Info about all genres');
    const genres = await pool.query(ALL_GENRE_QUERY);
    console.log(genres.rows);
    res.end(JSON.stringify(genres.rows));
}

export async function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Info about specific genre ${id}`); 
    const genres = await pool.query(ONE_GENRE_QUERY, [id]);
    const genre = genres.rows[0];
    console.log(genre);
    res.end(JSON.stringify(genre));
}

export async function updateOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    const body = await getReqData(req);
    console.log(`Updating genre ${id} with ${body}`);
    const { name } = body;
    await pool.query('UPDATE genre SET name = $2 WHERE id = $1', [id, name]);
    const genre = (await pool.query(ONE_GENRE_QUERY, [id])).rows[0];
    console.log(genre);
    res.end(JSON.stringify(genre));
}

export async function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Deleting genre ${id}`);
    await pool.query('DELETE FROM genre WHERE id = $1', [id]);
    res.end('Deleted');
}
