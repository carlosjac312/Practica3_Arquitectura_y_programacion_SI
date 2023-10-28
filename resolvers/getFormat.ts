import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";
import { formato } from "../types.ts";

const getFormat = async (req: Request, res: Response) => {
  try {
    const { format } = req.params;
    if(!Object.values(formato).includes(format)){//solo formatos validos
        res.status(400).send("El formato introducido no es valido");
        return;
      }
    const disc = await DiscModel.find({format}).exec();//busqueda por formato
    res.status(200).send(JSON.stringify(disc));//muestra todos con el mismo format
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getFormat;