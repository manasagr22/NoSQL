import express from 'express'
import {getPopularHashtags, connect, userTweetFrequency, timeUserHashtags, findConnectedPeople, getWeeks, getRandomUsers, findTotoalLikesForConnections} from './mongoconnect.js'
import { getTweetsfromDoctors, users_joined_after_covid19 } from './mukulmongo.js'

const app = express();
const port = 3000;

app.get('/possibleWeeks', async (req, res)=> {
	const [client, db] = await connect();
	const response = await getWeeks(db);
	client.close();
	res.send(response);
})

app.get('/randomUsers', async (req, res)=> {
	const [client, db] = await connect();
	const response = await getRandomUsers(db);
	client.close();
	res.send(response);
})

app.get('/popularHashtags/:username', async (req, res) => {
	const weekNo = req.params.username;
	const [client, db] = await connect();
	const hashtags = await getPopularHashtags(db, parseInt(weekNo));
	client.close()
	res.send(hashtags);
})

app.get('/tweetFrequency/:username', async (req,res) => {
	const username = req.params.username;
	const [client, db] = await connect();
	const result = await userTweetFrequency(db, username);
	client.close()
	res.send(result);
})

app.get('/tweetFrequency', async (req,res) => {
	const [client, db] = await connect();
	const result = await userTweetFrequency(db, null);
	client.close()
	res.send(result);
})

app.get('/userHashtags/:username', async (req, res) => {
	const username = req.params.username;
	const [client, db] = await connect();
	const result = await timeUserHashtags(db, username);
	client.close();
	res.send(result);
})

app.get('/connectedComponents/:userId', async (req, res) => {
	const userId = parseInt(req.params.userId);
	const [client ,db] = await connect();
	const result = await findConnectedPeople(userId, db)
	client.close();
	res.send(result);
})

app.get('/totalLikes/:userId', async (req, res) => {
	const userId = parseInt(req.params.userId);
	const [client ,db] = await connect();
	const result = await findTotoalLikesForConnections(userId, db)
	client.close();
	res.send(result);
})

app.get('/doctors', async (req, res) => {
	const result = await getTweetsfromDoctors();
	res.send(result);
})

app.get('/usersAfterCovid', async (req, res) => {
	const result = await users_joined_after_covid19();
	res.send(result);
})

app.listen(port, () => {
	console.log(`App listening on port ${port}`)
})

// db.sales.aggregate(
//   [
//     {
//       $project:
//         {
//           year: { $year: "$date" },
//           month: { $month: "$date" },
//           day: { $dayOfMonth: "$date" },
//           hour: { $hour: "$date" },
//           minutes: { $minute: "$date" },
//           seconds: { $second: "$date" },
//           milliseconds: { $millisecond: "$date" },
//           dayOfYear: { $dayOfYear: "$date" },
//           dayOfWeek: { $dayOfWeek: "$date" },
//           week: { $week: "$date" }
//         }
//     }
//   ]
//)

// Legendary code to update hashtags from string like array to actual array of string
// for await (const tweet of collection.find({"hashtags": {"$exists": true}}, [
// 	{"$match": {}}
// ])) {
// 	var _id = tweet._id;
// 	var hashString = tweet.hashtags
// 	hashString = hashString.replace(/'/g, '"');
// 	tweet.hashtags = JSON.parse(hashString)
// 	console.log(tweet);
// 	var tweet2 = await collection.findOne({"_id": _id});
// 	if(tweet2 != null) {
// 		collection.replaceOne({"_id": _id}, tweet);
// 	}
// }

// const response = await getPopolarHashtags(db);
// console.log('done');
// response.forEach((month) => {
// 	console.log(month._id);
// 	var value = month.value
// 	value.sort((a, b) => b.count - a.count)
// 	value = value.filter((has) => {
// 		var hash = has.hash.toLowerCase()
// 		return (hash.indexOf("covid") === -1) && (hash.indexOf("corona") === -1)
// 	})
// 	console.log(value.slice(0, 10))
// });
// const response = await userTweetFrequency(db);
// console.log(response);
		// await makePeopleData(db);

