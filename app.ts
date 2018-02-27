import { Express } from "express";

import express from "express";

let app = express();

app.use("/", (req: any, res: any) => {
  res.send("Hi :)");
});

app.listen(3000);
