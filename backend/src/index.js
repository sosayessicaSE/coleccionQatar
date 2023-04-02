import { sequelize } from "./database/database.js";
import figuritasRoutes from './routes/figuritas.routes.js';
import app from './app.js';

const PORT = process.env.PORT || 3000;

async function main() {
    try {
        await sequelize.sync({force: false});
        app.use(figuritasRoutes);
        app.listen(PORT, () => {
          console.log(`Servidor corriendo en: ${PORT}`);
        });
    } catch (error) {
        console.error("No fue posible conectarse", error);
    }
}

main();
