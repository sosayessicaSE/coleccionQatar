import express from 'express'; 
import { Figurita } from './models/figuritas.js'; 
import { fileURLToPath } from 'url'; 
import path from 'path'; 

// Obtener el nombre del archivo actual y el directorio actual utilizando fileURLToPath y path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Crear una instancia de la aplicación Express
const app = express();

// Establecer el motor de plantillas de EJS y la ruta de vistas
app.set('view engine', 'ejs');
app.set('views', 'views');

// Establecer la ruta de archivos estáticos para servir CSS y JS
const staticPath = path.join(__dirname, '../../views');
app.use(express.static(staticPath));

// Definir una ruta GET para obtener todas las figuritas
app.get('/figuritas', async (req, res) => {
  try {
    const figuritas = await Figurita.findAll(); // Obtener todas las figuritas del modelo Figurita
    res.render('figuritas', { figuritas }); // Renderizar la vista de figuritas y pasarle las figuritas obtenidas
  } catch (error) {
    console.error(error); // Imprimir el error en la consola
    res.status(500).json({ message: 'Error obteniendo figuritas' }); // Enviar una respuesta de error con un mensaje descriptivo
  }
});

// Definir una ruta GET para obtener la página de inicio
app.get('/', async (req, res) => {
  try {
    const figuritas = await Figurita.findAll();
    figuritas.sort((a, b) => a.id - b.id); // Ordenar por id ascendente
    res.render('index', { figuritas });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error obteniendo figuritas' });
  }
});

// Actualiza la cantidad de una figurita en la base de datos
app.put('/figuritas/:id/cantidad', async (req, res) => {
  try {
    // Busca la figurita por su ID
    const figurita = await Figurita.findByPk(req.params.id);
    // Incrementa la cantidad de la figurita en 1
    figurita.cantidad += 1;
    // Si la cantidad es mayor o igual a 1, marca que el usuario tiene la figurita
    if (figurita.cantidad >= 1) {
      figurita.tengo = true;
    }
    // Guarda los cambios en la base de datos
    await figurita.save();
    // Devuelve la figurita actualizada al cliente
    res.status(200).json({ figurita });
  } catch (error) {
    console.error(error);
    // Devuelve un mensaje de error al cliente si ocurre un error en el servidor
    res.status(500).json({ message: 'Error actualizando figurita' });
  }
});

// Restablece la cantidad y el estado de todas las figuritas en la base de datos
app.post('/reset', async (req, res) => {
  try {
    // Actualiza todas las figuritas en la base de datos
    await Figurita.update({ cantidad: 0, tengo: false }, { where: {} });
    // Devuelve un mensaje de éxito al cliente
    res.status(200).json({ message: 'Reset successful' });
  } catch (error) {
    console.error(error);
    // Devuelve un mensaje de error al cliente si ocurre un error en el servidor
    res.status(500).json({ message: 'Error resetting data' });
  }
});

// Exporta la aplicación express para su uso en otros módulos
export default app;
