import express, { json } from "express";
import { moviesRouter } from "./routes/movie.js";

const app = express();
app.disable("x-powered-by");
app.use(json());

const PORT = process.env.PORT ?? 3000;

app.use("/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
