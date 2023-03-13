import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "dotenv";
import { Configuration, OpenAIApi } from "openai";

const app = express();
env.config();
app.use(cors());

app.use(bodyParser.json());

const configuration = new Configuration({
  organization: process.env.OrganizationID,
  apiKey: process.env.api,
});

const openai = new OpenAIApi(configuration);
app.listen("5000", () => console.log("server running on "));

app.get("/", (req, res) => {
  res.send("hello");
});

app.post("/", async (req, res) => {
  const { message } = req.body;

  try {
    const reponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0,
      top_p: 1.0,
      frequency_penalty: 0.2,
      presence_penalty: 0.0,
    });
    res.json({ message: reponse.data.choices[0].text });
  } catch (e) {
    console.log(e);
    res.send(e).status(400);
  }
});
