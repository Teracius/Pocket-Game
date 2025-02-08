const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const gameRoutes = require("./routes/gameRoutes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(express.json());

app.use(cors());
app.use(bodyParser.json());

app.use("/api", gameRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
