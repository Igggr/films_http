import { IncomingMessage } from "http";
import { Req, Res } from "../frameworks/type-helpers";
import { getReqData } from "../frameworks/utils";
import { pool } from "../db";


export async function create(req: IncomingMessage, res: Res) {
    const body = await getReqData(req);
    console.log(`Creating film from ${body}`);
    const { title, year, genres = []} = body;
    const films = await pool.query('INSERT INTO film (title, year) VALUES ($1, $2) RETURNING *', [title, +year]);
    const film_id = films.rows[0].id;
    try {
        await createReferenceToGenres(film_id, genres);
    } catch {
        res.writeHead(422, {
            'Content-Type': 'application/json'
        });
        res.end('One or more genre.id doesn\'t exist');
        return;
    }
    const film = films.rows[0];
    console.log(film);
    res.end(JSON.stringify(film));
}

export async function getAll(req: IncomingMessage, res: Res) {
    console.log('Get info about all films');
    const films = await pool.query('SELECT * FROM film');
    console.log(films.rows);
    res.end(JSON.stringify(films.rows));
}

export async function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Get info about specific film ${id}`);
    const films = await pool.query('SELECT * FROM film WHERE id = $1', [id]);
    const film = films.rows[0];
    console.log(film);
    res.end(JSON.stringify(film));
}

export async function updateOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    const body = await getReqData(req);
    console.log(`Updating film ${id} with ${body}`);

    const { title, year, genres } = body;

    // user may want't to update all fields, only one field, or subset of fields
    // Perform few query is uneficient - but it makes if more readable (and maintanable), then checking all
    // possible combinations of fields

    if (title !== undefined) {
        await pool.query('UPDATE film SET title = $2 WHERE id = $1', [id, title]);
    }
    if (year !== undefined) {
        await pool.query('UPDATE film SET year = $2 WHERE id = $1', [id, year]);
    }
    if (genres !== undefined) {
        await dropReferenceToGenre(id);
        try {
            await createReferenceToGenres(id, genres);
        } catch {
            res.writeHead(422, {
                'Content-Type': 'application/json'
            });
            res.end('One or more genre.id doesn\'t exist');
            return;
        }
    }
    const films = await pool.query('SELECT * FROM film WHERE id = $1', [id]);
    const film = films.rows[0];
    console.log(film);
    res.end(JSON.stringify(film));
}

export async function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Deleting film ${id}`);
    dropReferenceToGenre(id);
    await pool.query('DELETE FROM film WHERE id = $1', [id]);
    res.end('Deleted');
}

async function createReferenceToGenres(film_id: string, genres: string[]) {
    for (const genre_id of genres) {
        await pool.query('INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)', [film_id, genre_id]);
    }
}

async function dropReferenceToGenre(id: string) {
    await pool.query('DELETE FROM film_genre WHERE genre_id = $1', [id]);
}