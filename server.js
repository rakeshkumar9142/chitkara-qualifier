require("dotenv").config();
const express = require("express");
const axios = require("axios");

const {
  generateFibonacci,
  filterPrimes,
  calculateLCM,
  calculateHCF
} = require("./utils");

const app = express();
app.use(express.json());

const EMAIL = "rakesh1415.be23@chitkarauniversity.edu.in";
const PORT = process.env.PORT || 10000;


app.get("/health", (req, res) => {
  return res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});


app.post("/bfhl", async (req, res) => {
  try {
    const body = req.body;

   
    if (!body || Object.keys(body).length === 0) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Empty request body"
      });
    }

    const allowedKeys = ["fibonacci", "prime", "lcm", "hcf", "AI"];
    const keys = Object.keys(body);

    if (keys.length !== 1 || !allowedKeys.includes(keys[0])) {
      return res.status(400).json({
        is_success: false,
        official_email: EMAIL,
        error: "Exactly one valid key must be provided"
      });
    }

    const key = keys[0];
    let result;

    switch (key) {
      case "fibonacci":
        result = generateFibonacci(body.fibonacci);
        break;

      case "prime":
        result = filterPrimes(body.prime);
        break;

      case "lcm":
        result = calculateLCM(body.lcm);
        break;

      case "hcf":
        result = calculateHCF(body.hcf);
        break;

      case "AI":
        if (typeof body.AI !== "string" || body.AI.trim() === "")
          throw new Error("AI input must be a non-empty string");

        result = await askAI(body.AI);
        break;
    }

    return res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: result
    });

  } catch (error) {
    console.error(error.message);

    return res.status(400).json({
      is_success: false,
      official_email: EMAIL,
      error: error.message
    });
  }
});


async function askAI(question) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
  
      const response = await axios.post(
        url,
        {
          contents: [
            {
              parts: [
                { text: question }
              ]
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 8000
        }
      );
  
      const text =
        response.data.candidates[0].content.parts[0].text;
  
      
      return text.trim().split(/\s+/)[0];
  
    } catch (error) {
      console.error(error.response?.data || error.message);
      throw new Error("AI service unavailable");
    }
  }
  
  
  




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
