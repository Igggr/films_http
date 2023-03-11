import { IncomingMessage } from "http";
import { Req, Res } from "../frameworks/type-helpers";
import { getReqData } from "../frameworks/utils";
import { pool } from "../db";

const SELECT = `\
    SELECT film.id, film.title, film.year, json_agg(genre.name) AS genres \
        FROM film \
        LEFT JOIN film_genre ON film.id = film_genre.film_id \
        LEFT JOIN genre ON film_genre.genre_id = genre.id `;

const GROUP = 'GROUP BY film.id';         

const ONE_FILM_QUERY = `${SELECT} WHERE film.id = $1 ${GROUP};`;
const ALL_FILM_QUERY = `${SELECT} ${GROUP};`;

export async function create(req: IncomingMessage, res: Res) {
    const body = await getReqData(req);
    console.log(`Creating film from ${body}`);
    const { title, year, genres = []} = body;
    const film_id = (
        await pool.query('INSERT INTO film (title, year) VALUES ($1, $2) RETURNING id', [title, year])
    ).rows[0].id;
    try {
        await createReferenceToGenres(film_id, genres);
    } catch {
        res.writeHead(422, {
            'Content-Type': 'application/json'
        });
        res.end('One or more genre.id doesn\'t exist');
        return;
    }
    const film = (await pool.query(ONE_FILM_QUERY, [film_id])).rows[0];
    console.log(film);
    res.end(JSON.stringify(film));
}

export async function getAll(req: IncomingMessage, res: Res) {
    console.log('Get info about all films');
    const films = await pool.query(ALL_FILM_QUERY);
    console.log(films.rows);
    res.end(JSON.stringify(films.rows));
}

export async function getOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Get info about specific film ${id}`);
    const films = await pool.query(ONE_FILM_QUERY, [id]);
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
        await dropReferenceToGenres(id);
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
    const film = (await pool.query(ONE_FILM_QUERY, [id])).rows[0];
    console.log(film);
    res.end(JSON.stringify(film));
}

export async function deleteOne(req: IncomingMessage, res: Res) {
    const id = (req as Req).id;
    console.log(`Deleting film ${id}`);
    dropReferenceToGenres(id);
    await pool.query('DELETE FROM film WHERE id = $1', [id]);
    res.end('Deleted');
}

async function createReferenceToGenres(film_id: string, genres: string[]) {
    for (const genre_id of genres) {
        await pool.query('INSERT INTO film_genre (film_id, genre_id) VALUES ($1, $2)', [film_id, genre_id]);
    }
}

async function dropReferenceToGenres(id: string) {
    await pool.query('DELETE FROM film_genre WHERE film_id = $1', [id]);
}