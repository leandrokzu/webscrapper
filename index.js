const app = require("express")();
const PORT = 8080;

(async () => {
  const laptops = await require("./laptops");

  app.get("/lenovos", (req, res) => {
    res.status(200).send(laptops);
  });

  app.listen(PORT, () =>
    console.log(`It's alive on http://localhost:${PORT} `)
  );
})();
