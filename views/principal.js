// Obtener todos los botones de "Agregar +1"
// Obtener todos los botones de "Agregar +1"
// Obtener todos los botones de "Agregar +1"
const buttons = document.querySelectorAll(".add-button");

// Iterar sobre cada botón
buttons.forEach((button) => {
  // Escuchar el evento "click" en cada botón
  button.addEventListener("click", async () => {
    // Obtener el ID de la figurita asociada a este botón
    const id = button.dataset.id;

    try {
      // Hacer una solicitud PUT al servidor para incrementar la cantidad de la figurita en la base de datos
      const response = await fetch(`/figuritas/${id}/cantidad`, {
        method: "PUT",
      });

      if (!response.ok) {
        throw new Error("Error updating figurita");
      }

      // Hacer una solicitud GET a la API para obtener la cantidad actualizada y el estado 'tengo' de la figurita
      const cantidadResponse = await fetch(`/figuritas/${id}`);
      const data = await cantidadResponse.json();

      // Actualizar la cantidad en la página con el valor devuelto por la API
      const cantidadElement = document.getElementById(`cantidad-${id}`);
      if (cantidadElement) {
        cantidadElement.textContent = data.cantidad;
      } else {
        console.warn(
          `Elemento de cantidad no encontrado para la figurita con ID ${id}`
        );
      }

      // Actualizar el estado 'tengo' en la página
      const statusElement = document.getElementById(`tengo-${id}`);
      if (statusElement) {
        statusElement.textContent = data.tengo ? "Tengo" : "Faltante";
      } else {
        console.warn(
          `Elemento de 'tengo' no encontrado para la figurita con ID ${id}`
        );
      }
      location.reload(false);
    } catch (error) {
      console.error(error);
    }
  });
});

// Manejo del evento para reiniciar todas las figuritas
const resetButton = document.querySelector(".reset-button");
resetButton.addEventListener("click", async () => {
  try {
    const response = await fetch("/figuritas/reset", { method: "POST" });
    if (!response.ok) {
      throw new Error("Error resetting data");
    }
    const reset = document.getElementById("success-message");
    reset.style.display = "block";
    setTimeout(() => {
      location.reload();
    }, "1000");
  } catch (error) {
    console.error(error);
    alert("Error en el reinicio");
  }
});

// Obtener los botones y la lista de figuritas
// Obtener los botones y la lista de figuritas
const todasBtn = document.getElementById("todas-button");
const posesionBtn = document.getElementById("posesion-button");
const faltantesBtn = document.getElementById("faltantes-button");
const repetidasBtn = document.getElementById("repetidas-button");
const figuritasList = document.querySelectorAll(".figurita");

// Agregar evento de clic a los botones
todasBtn.addEventListener("click", () => {
  // Mostrar todas las figuritas
  figuritasList.forEach((figurita) => {
    figurita.style.display = "block";
  });
});

posesionBtn.addEventListener("click", () => {
  // Mostrar solo las figuritas que tengo
  figuritasList.forEach((figurita) => {
    if (figurita.querySelector(".cantidad span").textContent !== "0") {
      figurita.style.display = "block";
    } else {
      figurita.style.display = "none";
    }
  });
});

faltantesBtn.addEventListener("click", () => {
  // Mostrar solo las figuritas que no tengo
  figuritasList.forEach((figurita) => {
    if (figurita.querySelector(".cantidad span").textContent === "0") {
      figurita.style.display = "block";
    } else {
      figurita.style.display = "none";
    }
  });
});

repetidasBtn.addEventListener("click", () => {
  // Mostrar solo las figuritas con cantidad mayor o igual a 2
  figuritasList.forEach((figurita) => {
    if (Number(figurita.querySelector(".cantidad span").textContent) >= 2) {
      figurita.style.display = "block";
    } else {
      figurita.style.display = "none";
    }
  });
});
