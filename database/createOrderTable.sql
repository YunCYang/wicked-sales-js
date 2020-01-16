create table "orders" (
  "orderId"         serial         primary key,
  "cartId"          integer        not null,
  "name"            text           not null,
  "creditCard"      text           not null,
  "shippingAddress" text           not null,
  "createdAt"       timestamptz(6) not null default now()
);
