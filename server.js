import express, { json } from "express";
import Archivo from "./archivo.js";

const app = express();
const PORT = 3000;
const counter = {
  visitas: {
    items: 0,
    item: 0,
  },
};

//METODO QUE INSTANCIA UN Archivo Y CONSUME SU METODO leer()
//PARA COMUNICARSE CON EL FILE DE productos.txt
const getItems = async () => {
  const archivo = new Archivo("productos.txt");
  const arr = await archivo.leer();
  return arr;
};

//METODO PARA OBTENER UN RANDOM
const getRandom = (min, max, decimalPlaces) => {
  return (Math.random() * (max - min) + min).toFixed(decimalPlaces || 0);
};

//ENDPOINT
app.get("/items", async (req, res) => {
  const arr = await getItems();
  const itemsResponse = {
    items: arr,
    cantidad: arr.length,
  };
  res.json(itemsResponse);
  counter.visitas.items++; //incremento contador de items
});

//ENDPOINT
app.get("/item-random", async (req, res) => {
  const arr = await getItems();
  const itemRandomResponse = {
    item: arr[getRandom(0, arr.length - 1)],
  };
  res.json(itemRandomResponse);
  counter.visitas.item++; //incremento contador de item
});

//ENDPOINT
app.get("/visitas", (req, res) => {
  res.json(counter); //muestro el objeto que contiene las visitas
});

//SERVER INFO
const server = app.listen(PORT, () =>
  console.log(`Server listening, port ${server.address().port}`)
);

server.on("error", (error) => console.error(error));
