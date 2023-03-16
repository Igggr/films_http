-- - таблица жанров
-- -- id
-- -- название жанра

-- - таблица фильмов
-- -- id
-- -- название
-- -- год выпуска
-- у каждого фильма может быть несколько жанров

DROP TABLE IF EXISTS film_genre;
DROP TABLE IF EXISTS film;
DROP TABLE IF EXISTS genre;

CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256) NOT NULL UNIQUE
);

CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    title VARCHAR(256) NOT NULL,
    year INTEGER
);

CREATE TABLE film_genre (
    genre_id INTEGER REFERENCES genre(id) ON DELETE CASCADE,
    film_id INTEGER REFERENCES film(id) ON DELETE CASCADE,
    CONSTRAINT id PRIMARY KEY (genre_id, film_id)
);


-- USE VIEW and FUnctions for incapsulating tables (for reading)

CREATE OR REPLACE VIEW film_join_genre AS (
    SELECT film.id, film.title, film.year, json_agg(genre.name) AS genres 
        FROM film 
        LEFT JOIN film_genre ON film.id = film_genre.film_id 
        LEFT JOIN genre ON film_genre.genre_id = genre.id
        GROUP BY film.id
 );

CREATE VIEW genre_join_film AS (
    SELECT genre.id, genre.name, json_agg(film.title) AS films 
        FROM genre 
        LEFT JOIN film_genre ON genre.id = film_genre.genre_id
        LEFT JOIN film ON film_genre.film_id = film.id
        GROUP BY genre.id
);

CREATE OR REPLACE FUNCTION one_film_info(id int)
  returns table (id int, title text, year int, genres text)
AS
$body$
  SELECT id, title, year, genres FROM film_join_genre
  WHERE id = $1 
$body$
language sql;

CREATE OR REPLACE FUNCTION one_genre_info(id int)
  returns table (id int, name text, films text)
AS
$body$
  SELECT id, name, films FROM genre_join_film
  WHERE id = $1 
$body$
language sql;
