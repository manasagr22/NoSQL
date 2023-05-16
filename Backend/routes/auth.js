const express = require('express');
const router = express.Router();
const object = require('./mukulmongo');

router.get("/getCountUsers", async(req, res) => {
  try {
  res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  const result = await object.getCountUsers();
  res.json({ status: "ok", data: result});
  }
  catch (error) {
    res.json({ status: "error" });
  }
});

router.post("/getInfluencialUsers", async(req, res) => {
  try {
    const { hashtag } = req.body;
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);

    const result = await object.getInfluencialUsers(hashtag);
    res.json({status: "ok", data: result});
  }
  catch (error) {
    res.json({ status: "error" });
  }
})

router.get("/getAllUserNames", async(req, res) => {
  try {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Credentials", true);
    const result = await object.getAllUserNames();
    res.json({status: "ok", data: result});
  }
  catch (error) {
    res.json({ status: "error" });
  }
})

module.exports = router;