-- Your SQL goes here

create table posts (
  id serial primary key,
  name varchar not null,
  body varchar not null,
  date varchar not null
)