import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";

const getName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;//solicita dato
    const disc = await DiscModel.find({name}).exec();//busca discos con mismo name
    res.status(200).send(JSON.stringify(disc));//muestra discos con mismo name
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getName;