import { MongoClient } from "mongodb";

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'twitter';

// Number of users to create
const numUsers = 10000;

// Number of connected components
const numComponents = 179;

async function createSocialMediaDatabase() {
  try {
    // Connect to the MongoDB server
    const client = await MongoClient.connect(url, { useUnifiedTopology: true });

    // Create the database
    const db = client.db(dbName);

    // Create the users collection
    const usersCollection = db.collection('users');

    // Generate connected components
    const components = generateConnectedComponents(numUsers, numComponents);

    // Insert users into the collection
    const users = [];
    let userId = 1;
    for (const component of components) {
      const componentSize = component.length;
      for (let i = 0; i < componentSize; i++) {
        const user = {
          _id: userId,
          name: `User ${userId}`,
          friends: getRandomFriends(component, userId),
          likes: generateLikes()
        };
        users.push(user);
        userId++;
      }
    }
    await usersCollection.insertMany(users);

    console.log('Social media database created successfully!');

    // Close the database connection
    client.close();
  } catch (err) {
    console.error('Error creating social media database:', err);
  }
}

// Function to generate connected components
function generateConnectedComponents(numUsers, numComponents) {
  const components = [];

  const usersPerComponent = Math.floor(numUsers / numComponents);
  const remainingUsers = numUsers % numComponents;

  let userId = 1;
  for (let i = 0; i < numComponents; i++) {
    const componentSize = usersPerComponent + (i < remainingUsers ? 1 : 0);
    const component = [];

    for (let j = 0; j < componentSize; j++) {
      component.push(userId);
      userId++;
    }

    components.push(component);
  }

  return components;
}

// Function to get random friends for a user from the same connected component
function getRandomFriends(component, userId) {
  const friends = [];

  // Generate random friend connections from the same component
  for (let i = 0; i < 10; i++) {
    const friendId = getRandomElementExcept(component, userId);
    friends.push(friendId);
  }

  return friends;
}

// Function to get a random element from an array except for a given value
function getRandomElementExcept(arr, except) {
  let element = arr[Math.floor(Math.random() * arr.length)];
  while (element === except) {
    element = arr[Math.floor(Math.random() * arr.length)];
  }
  return element;
}

function generateLikes() {
  const likes = [];
  for (let year = 1; year <= 5; year++) {
    const likesCount = Math.floor(Math.random() * 80000); // Mean: 1000, Standard Deviation: 500
    likes.push({ year, count: likesCount });
  }
  return likes;
}

// Function to generate a random number with Gaussian distribution
function gaussianRandom(mean, standardDeviation) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); // Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  return num * standardDeviation + mean;
}

// Create the social media database
createSocialMediaDatabase();