<h1><b>Rekonnect</b> | Social Degrees of Separation Finder</h1>

Six degrees of separation is the idea that all people are six or fewer social connections away from each other. As a result, a chain of "friend of a friend" statements can be made to connect any two people in a maximum of six steps. It is also known as the six handshakes rule.
Welcome to Rekonnect! The app is based on the six handshakes rule and allows you to add new users , add relations between them and find degrees of separation between two users.
--

![Rekonnect](https://i.ibb.co/nb2RZsb/Screenshot-566.png)
--

<h2><b>Highlights:</b></h2>
<hr/>
<h3><i>Add User & Add Relation</i></h3>
<hr/>

![User](https://i.ibb.co/vXNTQfr/Screenshot-562.png)

![UserMob](https://i.ibb.co/tsBFgj2/Screenshot-561.png)

![Relation](https://i.ibb.co/YWxpbQM/Screenshot-565.png)
<hr/>

<h3><i>Find Degrees</i></h3>
<hr/>

![Degrees](https://i.ibb.co/Qbm1LG3/Screenshot-568.png)
<hr/>

<h3><i>Demo:</i></h3>
<hr/>

https://vimeo.com/697225882

<h3><i>Instructions for testing:</i></h3>
<hr/>

- Clone the repository
- Add a .env in the server directory and add MONGO_URI connection string and PORT
- Run 'npm start' in the client and server directory
- The app will run on localhost:3000
<hr/>

<h3><i>Algorithm:</i></h3>
<p> A breadth-first search approach is used to find the degrees of separation between two users. We picture the social network as a graph with the users as nodes and the connection between friends as edges.</p>

- User 1 is treated as 'source' and User 2 as 'destination'
- We create a map to keep track of parent-child values where the friends of User 1 are treated as children of User 1 and so on..
- We also create a Set to keep track of visited nodes
- We push User 1 to the queue and traverse through every one of its friends and search for User 2
- If the friend is not yet visited,we push it to the queue and set user 1 as its parent and add it to visited set
- We continue this till the queue is empty or till we find User 2.

<p> Snippet from User.js in 'controllers' folder in 'server' directory </p>

``` const parentsMap = new Map();
    const visited = new Set();

    // BFS from user1 till we encounter user2
    var queue = [];
    visited.add(user1.name);
    queue.push(user1.name);

    while (queue.length > 0) {
      var current = queue.shift();

      //if found user2, stop traversing
      if (current === user2.name) break;

      //else traverse through next level
      var user = await User.findOne({ name: { $eq: current } });
    

      for (var i = 0; i < user.friends.length; i++) {
        var neighbor = user.friends[i];
        var neighborUser = await User.findById(neighbor);

        if (!visited.has(neighborUser.name)) {
          visited.add(neighborUser.name);
          parentsMap.set(neighborUser.name, current);
          queue.push(neighborUser.name);
        }
      }
    }

    //create the resultant path by linking parent nodes
    var path = [];
    path.push(user2.name);

    var next = parentsMap.get(user2.name);
    while (next != null) {
      path.push(next);
      next = parentsMap.get(next);
    }
