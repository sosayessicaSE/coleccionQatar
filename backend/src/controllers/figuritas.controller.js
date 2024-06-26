import { supabase } from "../database/database.js";

// Controlador para obtener todas las figuritas
export const getFiguritas = async (req, res) => {
  try {
    const { data, error } = await supabase.from("figuritas").select();

    if (error) {
      console.error("Error fetching figuritas:", error.message);
      return res.status(500).json({ message: "Error fetching figuritas" });
    }

    res.json(data);
  } catch (error) {
    console.error("Exception fetching figuritas:", error.message);
    res.status(500).json({ message: "Exception fetching figuritas" });
  }
};

// Controlador para obtener una figurita por su ID
export const getFigurita = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from("figuritas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching figurita:", error.message);
      return res.status(500).json({ message: "Error fetching figurita" });
    }

    if (!data) {
      return res.status(404).json({ message: "Figurita not found" });
    }

    res.json(data);
  } catch (error) {
    console.error("Exception fetching figurita:", error.message);
    res.status(500).json({ message: "Exception fetching figurita" });
  }
};

// Controlador para actualizar la cantidad y estado 'tengo' de una figurita por su ID
export const updateFiguritaCantidad = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la figurita por su ID
    const { data: figurita, error } = await supabase
      .from("figuritas")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching figurita:", error.message);
      return res.status(500).json({ message: "Error fetching figurita" });
    }

    if (!figurita) {
      return res.status(404).json({ message: "Figurita not found" });
    }

    // Actualizar la cantidad
    const updatedFigurita = { ...figurita, cantidad: figurita.cantidad + 1 };

    // Actualizar 'tengo' si la cantidad es igual o mayor a 1
    if (updatedFigurita.cantidad >= 1) {
      updatedFigurita.tengo = true;
    }

    // Actualizar la figurita en Supabase
    const { data: updatedData, error: updateError } = await supabase
      .from("figuritas")
      .update(updatedFigurita)
      .eq("id", id)
      .single();

    if (updateError) {
      console.error("Error updating figurita cantidad:", updateError.message);
      return res
        .status(500)
        .json({ message: "Error updating figurita cantidad" });
    }

    res.json(updatedData);
  } catch (error) {
    console.error("Exception updating figurita cantidad:", error.message);
    res.status(500).json({ message: "Exception updating figurita cantidad" });
  }
};

// Controlador para crear una nueva figurita
export const createFiguritas = async (req, res) => {
  const { nombre, pais, numero, tengo, cantidad } = req.body;

  try {
    const newFigurita = {
      nombre,
      pais,
      numero,
      tengo,
      cantidad,
    };

    const { data, error } = await supabase
      .from("figuritas")
      .insert(newFigurita);

    if (error) {
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error("Error creating figurita:", error.message);
    res.status(500).json({ message: "Error creating figurita" });
  }
};

// Controlador para eliminar una figurita
export const deleteFiguritas = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("figuritas").delete().eq("id", id);

    if (error) {
      throw error;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting figurita:", error.message);
    res.status(500).json({ message: "Error deleting figurita" });
  }
};

// Controlador para resetear todas las figuritas
// Controlador para resetear todas las figuritas
export const resetearFiguritas = async (req, res) => {
  try {
    console.log("Iniciando reseteo de figuritas...");

    // Obtener todas las figuritas de la base de datos
    const { data: figuritas, error } = await supabase
      .from("figuritas")
      .select("*");

    if (error) {
      console.error("Error al obtener las figuritas:", error.message);
      throw error;
    }

    // Actualizar cada figurita individualmente
    const updates = figuritas.map(async (figurita) => {
      const { error: updateError } = await supabase
        .from("figuritas")
        .update({ cantidad: 0, tengo: false })
        .eq("id", figurita.id);

      if (updateError) {
        console.error(
          `Error al actualizar la figurita ${figurita.id}:`,
          updateError.message
        );
        throw updateError;
      }
    });

    // Esperar a que todas las actualizaciones se completen
    await Promise.all(updates);

    // Envía una respuesta de éxito
    res.status(200).json({ message: "Figuritas reseteadas con éxito" });
  } catch (error) {
    console.error("Error resetting figuritas:", error.message);
    res.status(500).json({ message: "Error resetting figuritas" });
  }
};
