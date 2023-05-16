const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/twitter');
  console.log("MongoDB connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const TwitterSchema = new mongoose.Schema({
  user_name: String,
  user_location: String,
  user_description: String,
  user_created: String,
  user_followers: Number,
  user_friends: Number,
  user_favourites: Number,
  user_verified: Boolean,
  date: String,
  text: String,
  hashtags: Array,
  source: String,
});

const covid19_tweet = mongoose.model("covid19", TwitterSchema);

async function getCountUsers() {
  const res = await covid19_tweet.aggregate([{ $unwind: "$hashtags" }, { $group: { _id: "$hashtags", count: { $sum: 1 }}}, {$sort: {count: -1}}])
  return res;
}

async function getInfluencialUsers(hashtag) {
  const res = await covid19_tweet.aggregate([{ $match: { hashtags: hashtag } }, { $unwind: "$hashtags" },  { $match: { hashtags: hashtag } }, { $group: { _id: "$user_name", user_followers: { $max: "$user_followers" } }},  { $sort: { user_followers: -1 } }, { $limit: 10 }]) 
  return res;
}

async function getAllUserNames() {
  const res = await covid19_tweet.distinct("user_name")
  return res;
}

async function getTweetsfromDoctors() {
  const res = await covid19_tweet.find({ user_name: { $regex: /Dr. | Dr\s/} }, {user_name: 1, text: 1});
  return res;
}

async function users_joined_after_covid19() {
  const res = await covid19_tweet.aggregate([
    { $match: { user_created: { $gte: "2020-03-01 00:00:00" } } },
    { $group: { _id: "$user_name", user_created: { $addToSet: "$user_created" } } }
  ]);
  
  return res;
}

module.exports = {
  getTweetsfromDoctors: getTweetsfromDoctors,
  users_joined_after_covid19: users_joined_after_covid19,
  getCountUsers: getCountUsers,
  getInfluencialUsers: getInfluencialUsers,
  getAllUserNames: getAllUserNames
}