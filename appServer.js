const express = require("express");
const app = express();
const PORT = 3000;
const Contenedor = require("./app.js");
const newShoeProduct = new Contenedor("./products.txt");
newShoeProduct.save({
  name: "Zapatillas Reebok",
  price: 1200,
  thumbnail:
    "https://www.tradeinn.com/f/13849/138493599/reebok-classics-zapatillas-club-c-revenge.jpg",
});
app.get("/", (req, res) => {
  res.send("Ingresa a la ruta /productos para ver los productos :D");
});

app.get("/productos", async (req, res) => {
  res.send(JSON.stringify(await newShoeProduct.getAll()));
});

console.log(newShoeProduct);

const servidor = app
  .listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  })
  .on("error", (error) => console.error("FALLASTE" + error));
