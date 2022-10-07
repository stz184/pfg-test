import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from "@faker-js/faker";

const app = express();
const port = 9420;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

let accessToken;

app.use(cors());
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  await delay(1500);
  const body = req.body ?? {};

  res.setHeader("Content-Type", "application/json");

  if (
    body.username != "test@pfgbulgaria.com" ||
    body.password != "test@pfgbulgaria.com"
  ) {
    res.status(401).send(
      JSON.stringify({
        error: "Invalid username or password",
      })
    );
    return;
  }

  accessToken = faker.random.alphaNumeric(64);

  res.send(
    JSON.stringify({
      username: "admin",
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      job: faker.name.jobTitle(),
      phone: faker.phone.number(),
      photo: faker.image.avatar(),
      email: "test@pfgbulgaria.com",
      password: faker.internet.password(),
      token: accessToken,
    })
  );
});

app.get("/news", async (req, res) => {
  await delay(1200);
  res.setHeader("Content-Type", "application/json");

  if (req.get("Authorization") != `Bearer ${accessToken}`) {
    res.status(401).send(
      JSON.stringify({
        error: "Invalid token",
      })
    );
    return;
  }

  let news = [];
  for (let i = 0; i < 20; i++) {
    news.push({
      id: faker.random.numeric(10),
      title: faker.lorem.sentence(),
      published: faker.date.soon(),
      content: faker.lorem.paragraphs(4),
    });
  }

  res.send(JSON.stringify(news));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
