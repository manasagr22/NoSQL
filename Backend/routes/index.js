const express = require('express');
const router = express.Router();
const { connect, getWeeks, getPopularHashtags, getRandomUsers, userTweetFrequency, timeUserHashtags, findConnectedPeople } = require('./mongoconnect.js')
const object = require('./mukulmongo.js')

router.get('/possibleWeeks', async (req, res)=> {
	try{
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
		const [client, db] = await connect();
		const response = await getWeeks(db);
		client.close();
		res.send({status: "ok", data: response});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.get('/randomUsers', async (req, res)=> {
	try {
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const [client, db] = await connect();
	const response = await getRandomUsers(db);
	client.close();
	res.send({status: "ok", data: response});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.post('/popularHashtags', async (req, res) => {
	try {
		const { weekNo } = req.body;
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const [client, db] = await connect();
	const hashtags = await getPopularHashtags(db, parseInt(weekNo));
	client.close()
	res.send({status: "ok", data: hashtags});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.post('/tweetFrequency', async (req,res) => {
	try {
		const { username } = req.body;
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const [client, db] = await connect();
	const result = await userTweetFrequency(db, username);
	client.close()
	res.send({status: "ok", data: result});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.get('/tweetFrequency', async (req,res) => {
	try {
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const [client, db] = await connect();
	const result = await userTweetFrequency(db, null);
	client.close()
	res.send({status: "ok", data: result});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.post('/userHashtags', async (req, res) => {
	try {
		const { username } = req.body;
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const [client, db] = await connect();
	const result = await timeUserHashtags(db, username);
	client.close();
	res.send({status: "ok", data: result});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.post('/connectedComponents', async (req, res) => {
	try {
		const { userId } = req.body;
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const [client ,db] = await connect();
	const result = await findConnectedPeople(userId, db)
	client.close();
	res.send({status: "ok", data: result});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.get('/getTweetsfromDoctors', async (req, res) => {
	try {
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const result = await object.getTweetsfromDoctors();
	res.send({status: "ok", data: result});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

router.get('/usersAfterCovid', async (req, res) => {
	try {
		res.header("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
	const result = await object.users_joined_after_covid19();
	res.send({status: "ok", data: result});
	}
	catch(error) {
		res.send({status: "error"});
	}
})

module.exports = router;