import express from "npm:express@4.18.2";
import mongoose from "npm:mongoose@7.6.3";

import getDiscID from "./resolvers/getDiscID.ts";
import addDisc from "./resolvers/addDisc.ts";
import updateDisc from "./resolvers/updateDisc.ts";
import deleteDisc from "./resolvers/deleteDisc.ts";
import getList from "./resolvers/getList.ts";
import getName from "./resolvers/getName.ts";
import getCountry from "./resolvers/getCountry.ts";
import getFormat from "./resolvers/getFormat.ts";

import { load } from "https://deno.land/std@0.204.0/dotenv/mod.ts";
const env = await load();

const MONGO_URL = env.MONGO_URL || Deno.env.get("MONGO_URL");

if (!MONGO_URL) {
  console.log("No mongo URL found");
  Deno.exit(1);
}

await mongoose.connect(MONGO_URL);
const app = express();
app.use(express.json());
app
  .get("/getDisc", getList)
  .get("/getDisc/id/:id", getDiscID)
  .get("/getDisc/name/:name", getName)
  .get("/getDisc/format/:format", getFormat)
  .get("/getDisc/country/:country", getCountry)
  .post("/addDisc", addDisc)
  .put("/updateDisc/:id", updateDisc)
  .delete("/deleteDisc/:id", deleteDisc);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});