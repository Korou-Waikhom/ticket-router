const express = require("express");
require("dotenv").config();

const ticketRoutes = require("./routes/ticketRouter");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/tickets", ticketRoutes);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
