### Project Pocket Game

This Project have a backend and a frontend that work together,
the backend works with a database, that saves the games that are
provided, the backend is responsible to give the API´s and process the information that will be saved, the frontend use the API that the backend gives to start a game, the frontend is the interface that will help to the user with putting the information that is need it and show the players, their hands and the winner.

## Instructions

1.  This project works with React, Node.js, MySQL and Docker, we need to have Docker installed in our computer to run the command that will construct all the environment.

    Just download or clone the repository, go to the project path, and run the command "docker-compose up --build" and this will created everything.

    Example:
    C:\Users\Teracius\Desktop\proyect&gt;docker-compose up --build

    - The Frontend part will run in the http://localhost:3000
    - The Backend part will run in the http://localhost:8000
    - The Database part will run in the http://localhost:3306

    The backend is the API´s, so we don't need really to check that part if the API is working.

    We can look at the info of the database using Docker.

        1. First we need to start the docker compose or just start the container that it's for the database.
        2. Run "docker ps" to look at the id of the container of mysql.
        3. Run "docker exec -it container_name mysql -u root -p".
        4. Put the password "12345".
        5. Run "USE pocket_game;".
        6. Run "SHOW TABLES";, to look if we have a table.
        7. Then Run "SELECT \* FROM games;", and look at the data.

## Extra

1. I put a JSON that is the collection of the API´s of this project that explains how it works and their structure.

2. They file "init.sql" its a command that its used in the docker compose to create a table "games", in the database that the backend need to work.

## Environment

1.Frontend: React 19
2.Backend: Node.js 18
3.Database: MySQL 5.7
4.Postman Link: https://ivans2.postman.co/workspace/Ivan´s-Workspace~1d8d028d-5956-42c2-8514-432c361d09b5/documentation/41945890-c235493b-d911-4e26-a294-5ec66835b65d
