const BUTTON = document.querySelector("#add");
const QUANTITY = document.querySelector("#quantity");
const STATUS = document.querySelector("#status");

async function updateQuantity(myMethod) {
  const ANSWER = await fetch("/inventary", { method: myMethod });
  if (!ANSWER.ok) throw new Error("No se pudo actualizar el inventario");
  const INVENTARY = await ANSWER.json();
  QUANTITY.textContent = INVENTARY.stones;
}

async function init() {
  try {
    await updateQuantity("GET");
    BUTTON.disabled = false;
  } catch (error) {
    STATUS.textContent = error.message;
  }
}

BUTTON.addEventListener("click", async () => {
  BUTTON.disabled = true;
  STATUS.textContent = "";
  try {
    await updateQuantity("POST");
  } catch (error) {
    STATUS.textContent = error.message;
  } finally {
    BUTTON.disabled = false;
  }
});

init();
