import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";

const getName = async (req: Request, res: Response) => {
  try {
    const { name } = req.params;
    const disc = await DiscModel.find({name}).exec();
    res.status(200).send(JSON.stringify(disc));
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getName;