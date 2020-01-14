create table "carts" (
  "cartId"    serial         primary key,
  "createdAt" timestamptz(6) not null default now()
);
