import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";

const getList = async (req: Request, res: Response) => {
  try {
    const disc = await DiscModel.find().exec();//busca todos los discos
    res.status(200).send(disc);//muestra los discos
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getList;