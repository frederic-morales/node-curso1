import { readJSON } from "../utils.js";
import { Router } from "express";

const moviesDoc = readJSON("./movies.json");

export const moviesRouter = Router();

moviesRouter.get("/", async (req, res) => {
  const { genre } = req.query;
  const movie = await getAll({ genre });
  res.json(movie);
});

async function getAll({ genre }) {
  if (genre) {
    return moviesDoc.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    );
  }

  return moviesDoc;
}

moviesRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  const movie = await getById({ id });
  res.json(movie);
});

async function getById({ id }) {
  if (id) {
    return moviesDoc.find((movie) => movie.id === id);
  }
}
