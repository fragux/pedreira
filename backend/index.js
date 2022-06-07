const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql");
const StoneCut = require("./Routes/StoneCut");
const Lousada = require("./Routes/Lousada");
const MinorcaRoute = require("./Routes/MinorcaRoute");
const MonofioRoute = require("./Routes/MonofioRoute");
const Serra3500 = require("./Routes/Serra3500");
const StoneCut45Mill = require('./Routes/StoneCut45Mill');
const client = require("twilio")(
  "AC30d90c932ea37c30c67b90ed466a24ad",
  "d2994d9914dcabe2dd60190c96fb4b0d"
);

const db = mysql.createPool({
  host: "orion.morecolab.pt",
  port: "5505",
  user: "pedra",
  password: "pedra",
  insecureAuth: true,
  database: "db",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", StoneCut);
app.use("/", StoneCut45Mill);
app.use("/", Lousada);
app.use("/", MinorcaRoute);
app.use("/", MonofioRoute);
app.use("/", Serra3500);

app.post("/sendnotification", (req, res) => {
  const data = req.body.data;
  console.log("Mensagem a enviar: ", data);
  client.messages
    .create({
      body: data,
      messagingServiceSid: "MGb2518061199ca35940162d5cc523d424",
      to: "+351937012912",
    })
    .then((message) => console.log(message.sid))
    .done();
  res.json("Mensagem enviada!");
});

app.listen(3001, () => {
  console.log("Running on port 3001");
});
