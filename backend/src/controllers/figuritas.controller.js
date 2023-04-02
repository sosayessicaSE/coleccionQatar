import { Figurita } from '../models/figuritas.js';


//CONTROLADOR DE ACTUALIZACION DE CANTIDAD DE FIGURITAS
export const updateFiguritaCantidad = async (req, res) => {
  try {
    const { id } = req.params;
    //encuentra la figurita segun su id
    const figurita = await Figurita.findOne({
      where: {
        id,
      },
    });

    if (!figurita) {
      return res.status(404).json({ message: 'Figurita not found' });
    }
//incrementa un valor en la tabla "cantidad" y lo guarda
    figurita.cantidad += 1;

    await figurita.save();

    res.json(figurita);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error actualizando figurita cantidad' });
  }
};

//CONTROLADOR PARA OBTENER TODAS LAS FIGURITAS
export const getFiguritas = async (req, res) => {
  try {
    //encuentra todas las figuritas y las ordena de forma ascendente
    const figuritas = await Figurita.findAll({
        order: [['id', 'ASC']]
      });
    res.json(figuritas)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//CONTROLADOR PARA OBTENER UNA FIGURITA
export const getFigurita = async  (req, res) => {
  try {
    //encuentra una figurita segun su id
    const { id } = req.params
    const figurita = await Figurita.findOne({
        where: {
            id
        }
    })   
    res.json(figurita) 
  } catch (error) {
    return res.status(500).json({message: error.message})
  }
};

//CONTROLADOR PARA CREAR FIGURITA (EN CASO DE POSIBLE FUTURO USO)
export const createFiguritas = async (req, res) => {
  const { nombre, pais, numero, tengo, cantidad } = req.body
  try {
    //define los parametros necesarios
    const newFiguritas = await Figurita.create({
        nombre,
        pais,
        numero,
        tengo,
        cantidad,
    });

    res.json(newFiguritas);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//CONTROLADOR PARA ELIMINAR FIGURITAS (EN CASO DE POSIBLE FUTURO USO)
export const deleteFiguritas = async (req, res) => {
    try {
        //encuentra la figurita segun su id para eliminarla
      const { id } = req.params;
      await Figurita.destroy({
        where: {
          id,
        },
      });
      res.sendStatus(204)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  };
  
//CONTROLADOR PARA RESETEAR EL VALOR DE "CANTIDAD" A 0 Y EL VALOR "TENGO" A FALSE
export const resetearFiguritas = async (req, res) => {
    try {
        //actualiza los valores de "cantidad" y "tengo" donde {} (todos)
      await Figurita.update({ cantidad: 0, tengo: false }, { where: {} });
      res.redirect('/');
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error resetting figuritas' });
    }
  };
  