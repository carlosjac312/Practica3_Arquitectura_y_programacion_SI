import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";

const getDiscID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;//pedir id
    const disc = await DiscModel.findById({ _id:id }).exec();//buscar por id
    if (!disc) {
      res.status(404).send("No se encontro el disco");
      return;
    }
    res.status(200).send({//si lo encuentra lo muestra
      name: disc.name,
      author: disc.author,
      format: disc.format,
      matrix: disc.matrix,
      country: disc.country,
      id: disc._id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getDiscID;