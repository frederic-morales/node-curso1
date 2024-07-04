import express from "express";

const app = express();

const PORT = process.env.PORT ?? 3000;

app.use("/", (req, res) => {
  res.send({ hola: "hola bro2" });
});

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
