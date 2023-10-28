import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";
import { formato } from "../types.ts";

const updateDisc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, author, format, matrix, country } = req.body;
    if (!name || !author || !format || !country) {
      res.status(400).send("Faltan datos");
      return;
    }else if(!Object.values(formato).includes(format)){
      res.status(400).send("El formato introducido no es valido");
      return;
    }

    const updatedDisc = await DiscModel.findByIdAndUpdate(
      { _id:id },
      { name, author, format, matrix, country },
      { new: true }
    ).exec();

    if (!updatedDisc) {
      res.status(404).send("Disco no encontrado");
      return;
    }

    res.status(200).send({
      name: updatedDisc.name,
      author: updatedDisc.author,
      format: updatedDisc.format,
      matrix: updatedDisc.matrix,
      country: updatedDisc.country,
      id: updatedDisc._id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default updateDisc;