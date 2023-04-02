
// Obtener todos los botones de "Agregar +1"
const buttons = document.querySelectorAll('.add-button');

// Iterar sobre cada botón
buttons.forEach((button) => {
  // Escuchar el evento "click" en cada botón
  button.addEventListener('click', async () => {
    // Obtener el ID de la figurita asociada a este botón
    const id = button.dataset.id;

    try {
      // Hacer una solicitud PUT al servidor para incrementar la cantidad de la figurita en la base de datos
      const response = await fetch(`/figuritas/${id}/cantidad`, {
        method: 'PUT',
        
      });

      if (!response.ok) {
        throw new Error('Error updating figurita');
      }

      // Hacer una solicitud GET a la API para obtener la cantidad actualizada de la figurita
      if (response.ok) {
        
      const cantidadResponse = await fetch(`/figuritas/${id}`);
      const data = await cantidadResponse.json();
      location.reload(); // Recarga la página para mostrar los nuevos valores
      // Actualizar la cantidad en la página con el valor devuelto por la API
      button.parentNode.querySelector('.cantidad').textContent = `Cantidad: ${data.cantidad}`;
      
    }
    } catch (error) {
      console.error(error);
    }
  });
});
const resetButton = document.getElementById('reset-button');
resetButton.addEventListener('click', async () => {
  const response = await fetch('/reset', { method: 'POST' });
  if (response.ok) {
    location.reload(); // Recarga la página para mostrar los nuevos valores
  } else {
    alert('Error en el reinicio');
  }
});
// Obtener los botones y la lista de figuritas
const todasBtn = document.getElementById('todas-button');
const posesionBtn = document.getElementById('posesion-button');
const faltantesBtn = document.getElementById('faltantes-button');
const repetidasBtn = document.getElementById('repetidas-button');
const figuritasList = document.querySelectorAll('.figurita');

// Agregar evento de click a los botones
todasBtn.addEventListener('click', () => {
  // Mostrar todas las figuritas
  figuritasList.forEach(figurita => {
    figurita.style.display = 'block';
  });
});

posesionBtn.addEventListener('click', () => {
  // Mostrar solo las figuritas que tengo
  figuritasList.forEach(figurita => {
    if (figurita.querySelector('.cantidad span').textContent !== '0') {
      figurita.style.display = 'block';
    } else {
      figurita.style.display = 'none';
    }
  });
});

faltantesBtn.addEventListener('click', () => {
  // Mostrar solo las figuritas que no tengo
  figuritasList.forEach(figurita => {
    if (figurita.querySelector('.cantidad span').textContent === '0') {
      figurita.style.display = 'block';
    } else {
      figurita.style.display = 'none';
    }
  });
});

repetidasBtn.addEventListener('click', () => {
  // Mostrar solo las figuritas con cantidad mayor o igual a 2
  figuritasList.forEach(figurita => {
    if (Number(figurita.querySelector('.cantidad span').textContent) >= 2) {
      figurita.style.display = 'block';
    } else {
      figurita.style.display = 'none';
    }
  });
});


