import { Request, Response } from "npm:express@4.18.2";
import DiscModel from "../db/disc.ts";

const deleteDisc = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const person = await DiscModel.findByIdAndDelete({ _id:id }).exec();
    if (!person) {
      res.status(404).send("No se encontro el disco");
      return;
    }
    res.status(200).send("Disco borrado");
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default deleteDisc;