import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";
import { formato } from "../types.ts";

const addDisc = async (req: Request, res: Response) => {
  try {
    const { name, author, format, matrix, country} = req.body;//solicitar datos para crear el disco
    if (!name || !author || !format || !matrix || !country) {//prevencion falta de datos
      res.status(400).send("Faltan datos");
      return;
    }else if(!Object.values(formato).includes(format)){//prevencion formato no valido
      res.status(400).send("El formato introducido no es valido");
      return;
    }

    const newDisc = new DiscModel({ name, author, format, matrix, country});//creacion disco nuevo
    await newDisc.save();

    res.status(200).send({//envio del disco
      name: newDisc.name,
      author: newDisc.author,
      format: newDisc.format,
      matrix: newDisc.matrix,
      country: newDisc.country,
      id: newDisc._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default addDisc;