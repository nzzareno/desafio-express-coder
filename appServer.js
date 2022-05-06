const express = require("express");
const app = express();
const PORT = 3000;
const Contenedor = require("./app.js");
const newShoeProduct = new Contenedor("./products.txt");

app.get("/", (req, res) => {
  res.send("Enter the route /productos to see the products :D");
});

app.get("/productos", async (req, res) => {
  res.json(await newShoeProduct.getAll());
});

app.get("/productoRandom", async (req, res) => {
  res.json(await newShoeProduct.getRandom());
});

const sv = app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (error) => console.error("FAIL" + error));
