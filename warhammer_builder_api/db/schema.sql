CREATE DATABASE warhammer_builder_api;

CREATE TABLE warhammer_users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_disgest TEXT NOT NULL
);

CREATE TABLE warhammer_factions (
    id SERIAL PRIMARY KEY, 
    faction_id TEXT NOT NULL,
    faction_info JSONB
);

CREATE TABLE warhammer_units (
    id SERIAL PRIMARY KEY,
    faction_id TEXT NOT NULL,
    unit_id TEXT NOT NULL,
    unit_data JSONB
);

CREATE TABLE warhammer_army (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    faction_chosen_id TEXT NOT NULL,
    subfaction_chosen JSONB,
    army_name TEXT NOT NULL,
    points INT NOT NULL,
    pointLimit INT NOT NULL,
    colour TEXT,
    user_army_array JSONB
);


`INSERT INTO factions (faction_id, faction_info) VALUES ($1, $2);`
`INSERT INTO units (faction_id, unit_id, unit_data) VALUES ($1, $2, $3);`