import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})

app.get("/", async (req, res) => {
  try {
    const url = req.query.pokemonPageUrl;
    if (url) {
      const result = await axios.get(url);
      res.render("index.ejs", { pokemon: result.data.results, next: result.data.next, previous: result.data.previous });
      return;
    }
    const result = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
    res.render("index.ejs", { pokemon: result.data.results, next: result.data.next, previous: result.data.previous });
  } catch (error) {
    console.log(error);
  }
});

app.get("/pokemon", async (req, res) => {
  try {
    if (req.query.name) {
      const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${req.query.name}`);
      res.render("pokemon.ejs", { pokemon: result.data });
      return;
    }
    const url = req.query.pokemonUrl;
    const result = await axios.get(url);
    res.render("pokemon.ejs", { pokemon: result.data });
  } catch (error) {
    console.log(error);
  }
});