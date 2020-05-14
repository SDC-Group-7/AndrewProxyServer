const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Incoming from ${req.method} request`, req.path);
    next();
})

// Reviews API
app.get('/api/products/:productId/reviews', (req, res) => {
    const productId = req.params.productId;
    const apiUrl = `http://localhost:8080/api/products/${productId}/reviews`;

    fetch(apiUrl)
      .then((result) => (result.json()))
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    const apiUrl = `http://localhost:8080/api/products/${productId}/reviews/${reviewId}`;
    fetch(apiUrl)
      .then((result) => (result.json()))
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.put('/api/products/:productId/reviews/:reviewId', (req, res) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const apiUrl = `http://localhost:8080/api/products/${productId}/reviews/${reviewId}`;
    const data = req.body;

    fetch(apiUrl, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify(data),
      })
      .then((result) => (result.json()))
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

// Product API
app.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const apiUrl = `http://localhost:3002/product/${productId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.get('/product/:productId/find-store', (req, res) => {
    const productId = req.params.productId;
    const query = req.query.q;
    const apiUrl = `http://localhost:3002/product/${productId}/find-store?q=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

// Gallery API
app.get('/api/images/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const apiUrl = `http://localhost:3001/api/images/${imageId}`;

    fetch(apiUrl)
      .then((result) => result.json())
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`listening on ${port}`));
