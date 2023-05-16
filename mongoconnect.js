import { MongoClient } from 'mongodb';
const url = 'mongodb://127.0.0.1:27017';
const database = 'twitter'
const stopwords = ['covid', 'corona', 'pandemic']

export async function connect() {
	const client = new MongoClient(url);
	const result = await client.connect();
	return [client, result.db(database)];
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export async function getWeeks(db) {
	const covid19 = await db.collection('covid19')
	const response = await covid19.aggregate([
		{'$group': {'_id': {'$week': '$date'}}},
	]).toArray()
	return response;
}

export async function getRandomUsers(db) {
	const covid19 = await db.collection('covid19');
	const response = await covid19.aggregate([
		{'$group': {
			'_id': '$user_name'
		}}
	]).toArray();
	const shuffledArray =  shuffle(response);
	return shuffledArray.slice(0, 10);
}

export async function getPopularHashtags(db, weekNo) {
	const covid19 = await db.collection('covid19');
	const response = covid19.aggregate([
		{ 
			$unwind: "$hashtags"
		},
		{
			$group: {
				"_id": { week: {"$week": "$date"}, tags: "$hashtags"},
				// "id": {"$first":{"$toString": {"$week": "$date"}}},
				// "tag": {"$first":"$hashtags"},
				"count": {"$sum": 1}
			}
		},
		{
			$group: {
				"_id": "$_id.week",
				 "value": {"$push": {"hash": "$_id.tags", "count": "$count"}}
			}
		},
		{
			$match: {
				"_id": weekNo
			}
		}
	])
	const array = await response.toArray();
    // console.log(array)
    const weekData = array[0];
    const hashArray = weekData.value;
    hashArray.sort((a, b)=> b.count - a.count);
    const filteredHashArray = hashArray.filter((hashObj) => {
        const hashValue = hashObj.hash.toLowerCase();
        for (var i = 0; i < stopwords.length; i++) {
            if(hashValue.indexOf(stopwords[i]) !== -1)
                return false;
        }
        return true;
    })
	return filteredHashArray.slice(0, 10);
}

export async function userTweetFrequency(db, username) {
	const covid19 = await db.collection('covid19');
    const match = (username) ? {"$match": {
        "_id.username": username
    }} : {"$limit": 20}
	const response = covid19.aggregate([
		{"$group": {
			"_id" : {
				"username": "$user_name",
				"week": {"$week": "$date"}
			},
			"count": {"$sum": 1}
		}},
		{"$sort": {
			"count": -1
		}},
		match
	])
	const tweetCount = await response.toArray();
	return tweetCount;
}

export async function timeUserHashtags(db, username) {
	const covid19 = await db.collection('covid19');
	const response = await covid19.aggregate([
		{'$unwind': '$hashtags'},
		{'$group': {
			'_id': {
				'username': '$user_name',
				'week': {'$week': '$date'}
			},
			'tags': {'$push': '$hashtags'} 
		}},
        {"$match": {"_id.username": username}}
	]).toArray()
    return response
}

export async function findConnectedPeople(userId, db) {
	try {	
		const result = await db.collection('users').aggregate([
		{
		  $graphLookup: {
			from: 'users',
			startWith: '$friends',
			connectFromField: 'friends',
			connectToField: '_id',
			as: 'connectedComponent',
			maxDepth: 1000, // Set a large value to ensure all connected components are retrieved
		  }
		},
		{$match: {
			'_id': userId
		}},
		{
		  $project: {
			_id: '$_id',
			connectPeople: { $size: '$connectedComponent' },
			peopleConnected: '$connectedComponent'
		  }
		}
	  ]).toArray();
	  return result
  	} catch (err) {
	  console.error('Error finding connected components:', err);
	}
}

export async function findTotoalLikesForConnections(userId, db) {
	try {	
		const result = await db.collection('users').aggregate([
			{
			  $graphLookup: {
				from: 'users',
				startWith: '$friends',
				connectFromField: 'friends',
				connectToField: '_id',
				as: 'connectedComponent',
				maxDepth: 1000 // Set a large value to ensure all connected components are retrieved
			  }
			},
			{
			  $match: {
				'_id': userId
			  }
			},
			{
			  $lookup: {
				from: 'users',
				localField: 'connectedComponent._id',
				foreignField: '_id',
				as: 'connectedLikes'
			  }
			},
			{
			  $unwind: '$connectedLikes'
			},
			{
			  $group: {
				_id: '$_id',
				totalLikes: {
				  $sum: {
					$sum: '$connectedLikes.likes.count'
				  }
				}
			  }
			}
		  ]).toArray();
	  return result
  	} catch (err) {
	  console.error('Error finding connected components:', err);
	}
}