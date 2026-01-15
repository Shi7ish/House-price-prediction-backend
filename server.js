const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/predict", (req, res) => {
  const features = req.body.features;

  const pythonProcess = spawn(process.platform === "win32" ? "py" : "python3", [
    "predict.py",
    JSON.stringify(features),
  ]);

  let result = "";

  pythonProcess.stdout.on("data", (data) => {
    result += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error("PYTHON ERROR:", data.toString());
  });

  pythonProcess.on("close", () => {
    const match = result.match(/[-+]?[0-9]*\.?[0-9]+/);
    const value = match ? parseFloat(match[0]) : 0;
    res.json({ predicted_price: value });
  });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
