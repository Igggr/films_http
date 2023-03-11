INSERT INTO genre VALUES 
(1, 'Vestern'),
(2, 'Comedy'),
(3, 'Fantasy'),
(4, 'Shooter');

INSERT INTO film (id, title, year) VALUES
(1, 'Good, Bad, Ugly', 2013),
(2, 'Dead for a dollar', 2022),
(3, 'Matrix', 1999),
(4, 'Terminator', 1984);

INSERT INTO film_genre (film_id, genre_id) VALUES
(1, 1),
(2, 1),
(3, 3),
(4, 3),
(4, 4);
