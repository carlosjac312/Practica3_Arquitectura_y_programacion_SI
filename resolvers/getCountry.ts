import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";

const getCountry = async (req: Request, res: Response) => {
  try {
    const { country } = req.params;//pide el dato
    const disc = await DiscModel.find({country}).exec();//buscar por pais
    res.status(200).send(JSON.stringify(disc));//muestra todos con mismo country
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getCountry;