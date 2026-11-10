import http from "node:http";
import { readFile, writeFile, rename } from "node:fs/promises";

const INVENTARY_FILE = new URL("./inventary.json", import.meta.url);
const INVENTARY_TEMP_FILE = new URL("./inventary.tmp", import.meta.url);
const INVENTARY = JSON.parse(await readFile(INVENTARY_FILE, "utf8"));
if (INVENTARY.stones === undefined && INVENTARY.STONES !== undefined) {
  INVENTARY.stones = INVENTARY.STONES;
  delete INVENTARY.STONES;
}
if (!Number.isSafeInteger(INVENTARY?.stones) || INVENTARY.stones < 0) {
  throw new Error("inventary.json debe contener una cantidad válida de piedras");
}

function resJSON(res, data) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(data));
}

let savedPromise = Promise.resolve();

function addStones() {
  const SAVED = savedPromise.then(async () => {
    const STONES = INVENTARY.stones + 1;
    if (!Number.isSafeInteger(STONES)) throw new Error("Cantidad fuera de rango");
    const DATA = { ...INVENTARY, stones: STONES };
    await writeFile(INVENTARY_TEMP_FILE, JSON.stringify(DATA, null, 2), "utf8");
    await rename(INVENTARY_TEMP_FILE, INVENTARY_FILE);
    INVENTARY.stones = STONES;
    return DATA;
  });
  // Si falla un guardado, el siguiente clic todavía puede volver a intentarlo.
  savedPromise = SAVED.catch(() => {});
  return SAVED;
}

const RESOURCES = {
  "/": ["index.html", "text/html"],
  "/style.css": ["style.css", "text/css"],
  "/main.js": ["main.js", "text/javascript"]
};

const SERVER = http.createServer(async (req, res) => {
  console.log(req.method, req.url);
  const RUTE = req.url.split("?")[0];
  if (RUTE === "/inventary" && req.method === "GET") {
    return resJSON(res, INVENTARY);
  }
  if (RUTE === "/inventary" && req.method === "POST") {
    try {
      return resJSON(res, await addStones());
    } catch {
      res.statusCode = 500;
      return res.end("No se pudo guardar el inventary");
    }
  }
  if (req.method !== "GET" || !Object.hasOwn(RESOURCES, RUTE)) {
    res.statusCode = 404;
    return res.end("Recurso no encontrado");
  }
  const [archive, type] = RESOURCES[RUTE];

  try {
    const MY_URL = new URL("./src/" + archive, import.meta.url);
    const CONTENT = await readFile(MY_URL);
    res.setHeader("Content-Type", type + "; charset=utf-8");
    res.end(CONTENT);
  } catch {
    res.statusCode = 500;
    res.end("Error al leer el archivo");
  }
});

SERVER.listen(3000, "127.0.0.1", () => {
  console.log("Servidor en http://127.0.0.1:3000/");
});
