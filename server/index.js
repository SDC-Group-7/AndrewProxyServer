const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const port = 8000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
    console.log(`Incoming from ${req.method} request`, req.path);
    next();
})

// Reviews API
const reviewsURL = process.env.REVIEWS_URL;
app.get('/api/products/:productId/reviews', (req, res) => {
    const productId = req.params.productId;
    const apiUrl = `${reviewsURL}/api/products/${productId}/reviews`;

    fetch(apiUrl)
      .then((result) => (result.json()))
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.get('/api/products/:productId/reviews/:reviewId', (req, res) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    const apiUrl = `${reviewsURL}/api/products/${productId}/reviews/${reviewId}`;
    console.log(apiUrl)
    fetch(apiUrl)
      .then((result) => (result.json()))
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.put('/api/products/:productId/reviews/:reviewId', (req, res) => {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;
    const apiUrl = `${reviewsURL}/api/products/${productId}/reviews/${reviewId}`;
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
const productsURL = process.env.PRODUCTS_URL;
app.get('/product/:productId', (req, res) => {
    const productId = req.params.productId;
    const apiUrl = `${productsURL}/product/${productId}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.get('/product/:productId/find-store', (req, res) => {
    const productId = req.params.productId;
    const query = req.query.q;
    const apiUrl = `${productsURL}/product/${productId}/find-store?q=${query}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

// Gallery API
const galleryURL = process.env.GALLERY_URL;
app.get('/api/images/:imageId', (req, res) => {
    const imageId = req.params.imageId;
    const apiUrl = `${galleryURL}/api/images/${imageId}`;

    fetch(apiUrl)
      .then((result) => result.json())
      .then((json) => res.json(json))
      .catch((err) => console.error(err));
});

app.listen(port, () => console.log(`listening on ${port}`));
