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