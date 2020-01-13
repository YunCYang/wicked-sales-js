create table "products" (
  "productId"        serial  primary key,
  "name"             text    not null,
  "price"            integer not null,
  "image"            text    not null,
  "shortDescription" text    not null,
  "longDescription"  text    not null
);
