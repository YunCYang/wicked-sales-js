create table "cartItems" (
  "cartItemId" serial  primary key,
  "cartId"     integer not null,
  "productId"  integer not null,
  "price"      integer not null
);
