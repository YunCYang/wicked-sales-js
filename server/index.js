require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  const sql = `
    select *
      from "products";
  `;
  db.query(sql)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const sql = `
    select *
      from "products"
     where "productId" = $1;
  `;
  const value = [req.params.productId];
  db.query(sql, value)
    .then(result => {
      if (result.rows[0]) {
        res.json(result.rows[0]);
      } else {
        next(new ClientError(`Requested product (id: ${req.params.productId}) does not exist in the database.`, 404));
      }
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) res.json([]);
  const sql = `
    select "c"."cartItemId",
       "c"."price",
       "p"."productId",
       "p"."image",
       "p"."name",
       "p"."shortDescription"
  from "cartItems" as "c"
  join "products" as "p" using ("productId")
 where "c"."cartId" = $1
  `;
  const value = [req.session.cartId];
  db.query(sql, value)
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.post('/api/cart', (req, res, next) => {
  const pattern = /^[1-9]\d*$/;
  if (pattern.exec(req.body.productId) === null) {
    next(new ClientError(`Requested product (id: ${req.body.productId}) is not a positive integer.`, 400));
  }
  const getPriceSql = `
    select "price"
      from "products"
     where "productId" = $1;
  `;
  const getPriceValue = [req.body.productId];
  db.query(getPriceSql, getPriceValue)
    .then(result => {
      if (!result.rows[0]) {
        throw (new ClientError(`Requested product (id: ${req.body.productId}) does not exist in the database.`, 404));
      }
      if (req.session.cartId) {
        return { cartId: req.session.cartId, price: result.rows[0].price };
      }
      const newCartSql = `
        insert into "carts" ("cartId", "createdAt")
        values (default, default)
        returning "cartId";
      `;
      return db.query(newCartSql)
        .then(cartResult => {
          return { cartId: cartResult.rows[0].cartId, price: result.rows[0].price };
        });
    })
    .then(result => {
      req.session.cartId = result.cartId;
      const newCartItemSql = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId"
      `;
      const newCartItemValue = [result.cartId, req.body.productId, result.price];
      return db.query(newCartItemSql, newCartItemValue)
        .then(itemResult => itemResult.rows[0]);
    })
    .then(result => {
      const newJoinSql = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartItemId" = $1
      `;
      const newJoinValue = [result.cartItemId];
      return db.query(newJoinSql, newJoinValue)
        .then(cartItemResult => {
          res.status(201).send(cartItemResult.rows[0]);
        });
    })
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
