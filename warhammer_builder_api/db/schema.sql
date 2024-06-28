CREATE DATABASE warhammer_builder_api;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_disgest TEXT NOT NULL
);

CREATE TABLE factions (
    id SERIAL PRIMARY KEY, 
    faction_id TEXT NOT NULL,
    faction_info JSON
);

CREATE TABLE units (
    id SERIAL PRIMARY KEY,
    faction_id TEXT NOT NULL,
    unit_id INT NOT NULL,
    unit_data JSON,
);

CREATE TABLE army (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    faction_chosen_id TEXT NOT NULL,
    subfaction_chosen TEXT NOT NULL,
    army_name TEXT NOT NULL,
    points INT NOT NULL,
    user_army_array INT[]
);
