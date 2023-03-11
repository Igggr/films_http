-- - таблица жанров
-- -- id
-- -- название жанра

-- - таблица фильмов
-- -- id
-- -- название
-- -- год выпуска
-- у каждого фильма может быть несколько жанров


CREATE TABLE genre (
    id SERIAL PRIMARY KEY,
    name VARCHAR(256)
);

CREATE TABLE film (
    id SERIAL PRIMARY KEY,
    title VARCHAR(256),
    year INTEGER
);

CREATE TABLE film_genre (
    id SERIAL PRIMARY KEY,
    genre_id INTEGER  REFERENCES genre(id),
    film_id INTEGER REFERENCES film(id)
);