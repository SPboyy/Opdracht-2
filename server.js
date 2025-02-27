const express = require('express');
const app = express();
const port = 3000;

// Simulatie van een lijst van producten
const products = [
  { id: 1, name: 'Product 1', description: 'Beschrijving van product 1', price: '€10.00', details: 'Dit is een gedetailleerde beschrijving van Product 1.' },
  { id: 2, name: 'Product 2', description: 'Beschrijving van product 2', price: '€15.00', details: 'Dit is een gedetailleerde beschrijving van Product 2.' },
  { id: 3, name: 'Product 3', description: 'Beschrijving van product 3', price: '€20.00', details: 'Dit is een gedetailleerde beschrijving van Product 3.' },
  { id: 4, name: 'Product 4', description: 'Beschrijving van product 4', price: '€25.00', details: 'Dit is een gedetailleerde beschrijving van Product 4.' }
];

// Stel een statische map in voor de frontendbestanden
app.use(express.static('public'));

// Route voor de hoofdpagina
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Route voor de productenpagina die de producten als HTML retourneert
app.get('/products', (req, res) => {
  let productListHtml = `
    <html>
      <head>
        <title>Producten Lijst</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f4f4f4;
          }

          h1 {
            color: #333;
          }

          .product-list {
            list-style-type: none;
            padding: 0;
          }

          .product-item {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin: 10px;
            padding: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .product-item a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
          }

          .product-item:hover {
            background-color: #f0f0f0;
          }

          button {
            padding: 10px 15px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
          }

          button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>

        <h1>Producten Lijst</h1>
        <button onclick="window.location.href='index.html'">Terug naar Hoofdpagina</button>

        <ul class="product-list">
  `;

  // Loop door de producten en voeg ze toe aan de HTML
  products.forEach(product => {
    productListHtml += `
      <li class="product-item">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <a href="/product-details?id=${product.id}">Bekijk details</a>
      </li>
    `;
  });

  // Sluit de lijst en HTML-tag af
  productListHtml += `
        </ul>
      </body>
    </html>
  `;

  // Stuur de HTML naar de browser
  res.send(productListHtml);
});

// Route voor de productdetailspagina
app.get('/product-details', (req, res) => {
  const productId = parseInt(req.query.id, 10);  // Verkrijg de product-ID uit de queryparameter
  const product = products.find(p => p.id === productId);  // Zoek het product op basis van de ID

  if (!product) {
    return res.status(404).send('Product niet gevonden');
  }

  // Bouw de HTML-pagina met de productdetails
  const productDetailHtml = `
    <html>
      <head>
        <title>${product.name} - Details</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
            background-color: #f4f4f4;
          }

          h1 {
            color: #333;
          }

          .product-details {
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-top: 20px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          .product-details h2 {
            color: #4CAF50;
          }

          button {
            padding: 10px 15px;
            font-size: 16px;
            cursor: pointer;
            margin-top: 20px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
          }

          button:hover {
            background-color: #45a049;
          }
        </style>
      </head>
      <body>
        <h1>Product Details</h1>
        <div class="product-details">
          <h2>${product.name}</h2>
          <p><strong>Prijs:</strong> ${product.price}</p>
          <p><strong>Beschrijving:</strong> ${product.description}</p>
          <p><strong>Details:</strong> ${product.details}</p>
        </div>
        <button onclick="window.location.href='/products'">Terug naar productenlijst</button>
      </body>
    </html>
  `;

  // Stuur de HTML-pagina van het product naar de browser
  res.send(productDetailHtml);
});

// Start de server
app.listen(port, () => {
  console.log(`Server draait op http://localhost:${port}`);
});
