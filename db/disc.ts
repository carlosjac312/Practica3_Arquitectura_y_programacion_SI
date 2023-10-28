import mongoose from "npm:mongoose@7.6.3";
import { Disc, formato } from "../types.ts";

const Schema = mongoose.Schema;

const discSchema = new Schema(//esquema disco con todos obligatorios menos matriz
  {
    name: { type: String, required: true },
    author: { type: String, required: true},
    format: { type: String, formato, required: true },
    matrix: { type: String, required: false },
    country:{ type: String, required: true },
  },
  { timestamps: true }
);

export type DiscModelType = mongoose.Document & Omit<Disc, "id">;

export default mongoose.model<DiscModelType>("Disco", discSchema);