CREATE DATABASE warhammer_builder_api;

-- CREATE TABLE armies (
--     id SERIAL PRIMARY KEY,
--     content TEXT NOT NULL,
--     content_html TEXT NOT NULL,
--     color TEXT
-- );

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_disgest TEXT NOT NULL
);