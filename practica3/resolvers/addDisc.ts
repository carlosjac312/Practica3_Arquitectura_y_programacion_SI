import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";
import { formato } from "../types.ts";

const addDisc = async (req: Request, res: Response) => {
  try {
    const { name, author, format, matrix, country} = req.body;
    if (!name || !author || !format || !matrix || !country) {
      res.status(400).send("Faltan datos");
      return;
    }else if(!Object.values(formato).includes(format)){
      res.status(400).send("El formato introducido no es valido");
      return;
    }

    const alreadyExists = await DiscModel.findOne({ name }).exec();
    if (alreadyExists) {
      res.status(400).send("el disco ya está en la base");
      return;
    }

    const newDisc = new DiscModel({ name, author, format, matrix, country});
    await newDisc.save();

    res.status(200).send({
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