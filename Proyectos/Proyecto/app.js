import http from "node:http";
import { readFile, writeFile, rename } from "node:fs/promises";

const archivoInventario = new URL("./inventario.json", import.meta.url);
const archivoTemporal = new URL("./inventario.tmp", import.meta.url);
const inventario = JSON.parse(await readFile(archivoInventario, "utf8"));
if (!Number.isSafeInteger(inventario?.piedras) || inventario.piedras < 0) {
  throw new Error("inventario.json debe contener una cantidad válida de piedras");
}

function responderJSON(res, datos) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(datos));
}

let guardados = Promise.resolve();

function añadirPiedra() {
  const guardado = guardados.then(async () => {
    const piedras = inventario.piedras + 1;
    if (!Number.isSafeInteger(piedras)) throw new Error("Cantidad fuera de rango");
    const datos = { piedras };
    await writeFile(archivoTemporal, JSON.stringify(datos, null, 2), "utf8");
    await rename(archivoTemporal, archivoInventario);
    inventario.piedras = piedras;
    return datos;
  });
  // Si falla un guardado, el siguiente clic todavía puede volver a intentarlo.
  guardados = guardado.catch(() => {});
  return guardado;
}

const recursos = {
  "/": ["index.html", "text/html"],
  "/style.css": ["style.css", "text/css"],
  "/main.js": ["main.js", "text/javascript"]
};

const servidor = http.createServer(async (req, res) => {
  console.log(req.method, req.url);
  const ruta = req.url.split("?")[0];
  if (ruta === "/inventario" && req.method === "GET") {
    return responderJSON(res, inventario);
  }
  if (ruta === "/inventario" && req.method === "POST") {
    try {
      return responderJSON(res, await añadirPiedra());
    } catch {
      res.statusCode = 500;
      return res.end("No se pudo guardar el inventario");
    }
  }
  if (req.method !== "GET" || !Object.hasOwn(recursos, ruta)) {
    res.statusCode = 404;
    return res.end("Recurso no encontrado");
  }
  const [archivo, tipo] = recursos[ruta];

  try {
    const url = new URL("./src/" + archivo, import.meta.url);
    const contenido = await readFile(url);
    res.setHeader("Content-Type", tipo + "; charset=utf-8");
    res.end(contenido);
  } catch {
    res.statusCode = 500;
    res.end("Error al leer el archivo");
  }
});

servidor.listen(3000, "127.0.0.1", () => {
  console.log("Servidor en http://127.0.0.1:3000/");
});
 