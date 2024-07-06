import { readJSON } from "../utils.js";
import { Router } from "express";
import { validateMovie } from "../schemas/movies.js";
import { validatePartialMovie } from "../schemas/movies.js";
import { randomUUID } from "node:crypto";

const moviesDoc = readJSON("./movies.json");

export const moviesRouter = Router();

//GET ALL
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

// Sincrónica: Esta implementación es sincrónica, lo que significa que no se espera ninguna operación asíncrona como llamadas a una base de datos o una API externa.
// moviesRouter.get("/", (req, res) => {
//   const { genre } = req.query;
//   if (genre) {
//     const moviesFilter = moviesDoc.filter((movie) =>
//       movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
//     );
//     res.json(moviesFilter);
//   }
//   res.json(moviesDoc);
// });

//GET BY ID
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

//POST
moviesRouter.post("/", async (req, res) => {
  const data = validateMovie(req.body);
  if (!data.success) {
    return res.status(404).json({ error: JSON.parse(data.error.message) });
  }
  const newMovie = await createMovie({ input: data.data });
  res.status(201).json(newMovie);
});

async function createMovie({ input }) {
  const newMovie = {
    id: randomUUID(),
    ...input,
  };
  moviesDoc.push(newMovie);
  return newMovie;
}
