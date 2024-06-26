import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import router from "./routes/figuritas.routes.js"; // Asegúrate de que la ruta sea correcta
import { supabase } from "./database/database.js"; // Asegúrate de importar supabase

// Configuración de __filename y __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta estática para las vistas
const staticPath = path.join(__dirname, "../../views");

const app = express();

app.set("view engine", "ejs");
app.set("views", staticPath);
app.use(express.static(staticPath));
app.use(express.json()); // Middleware para parsear JSON

// Usar el router para todas las rutas /figuritas
app.use("/figuritas", router);

// Ruta GET para renderizar la página de inicio
app.get("/", async (req, res) => {
  try {
    console.log("Fetching figuritas from Supabase...");
    const { data, error } = await supabase
      .from("figuritas")
      .select("*")
      .order("id");
    if (error) {
      console.error("Supabase error:", error.message);
      throw error;
    }
    console.log("Figuritas data:", data);

    res.render("index", { figuritas: data });
  } catch (error) {
    console.error("Error fetching figuritas:", error.message);
    res.status(500).json({ message: "Error fetching figuritas" });
  }
});

// Ruta para manejar cualquier otra ruta no definida
app.get("*", (req, res) => {
  res.status(404).send("404 Not Found");
});

const port = process.env.PORT || 3000; // Utiliza el puerto proporcionado por el entorno o el 3000 si no está definido

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
