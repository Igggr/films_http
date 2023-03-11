Небольшой веб-сервер на базе модуля htttp и Postgres.

## запуск 

1) развернуть БД pgAdmin

    ```bash
    $ docker compose up
    ```

2) законектится с ней через pgAdmin. IP в "inspect"-e контейнера

3) запустить сервер 

    ```bash
    $ npm run start
    ```

Запросы thunderclient для тестирования экспортированы в фaйл `thunderclient-collection_films.json`.
Вероятно формат должен быть совместим с postman.
Для использования также придется выставить переменную host = http://localhost:5000.
