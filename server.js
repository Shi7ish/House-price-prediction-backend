const express = require("express");
const cors = require("cors");
const { spawn } = require("child_process");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/predict", (req, res) => {
    const features = req.body.features;

    const pythonProcess = spawn("python3", ["predict.py", JSON.stringify(features)]);

    let result = "";

    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Python Error:", data.toString());
    });

    pythonProcess.on("close", () => {
        console.log("Raw Output:", result);

        // Extract only the first number in the output
        const match = result.match(/[-+]?[0-9]*\.?[0-9]+/);
        const value = match ? parseFloat(match[0]) : 0;

        console.log("Prediction:", value);
        res.json({ predicted_price: value });
    });
});

app.listen(5000, () => console.log("Backend running on port 5000"));
