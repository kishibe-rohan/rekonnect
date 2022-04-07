const User = require("../models/User");

//Add new user to database
exports.addUser = async (req, res) => {
  try {
    const { name, avatar } = req.body;
    let user = await User.findOne({ name: { $eq: name } });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    user = await User.create({
      name,
      avatar,
    });

    res.status(201).json({
      success: true,
      user,
      message: "User Added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get user
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("friends");

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Add friends
exports.addRelation = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const user1 = await User.findById(id1);
    const user2 = await User.findById(id2);

    //make sure both users exist
    if (!user1 || !user2) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    //Check if they are already friends
    if (user1.friends.includes(id2) || user2.friends.includes(id1)) {
      return res.status(400).json({
        success: false,
        message: "Relation already exists",
      });
    }

    user1.friends.push(id2);
    user2.friends.push(id1);

    await user1.save();
    await user2.save();

    return res.status(200).json({
      success: true,
      message: "Relation added",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//Get degrees of separation
exports.getDegrees = async (req, res) => {
  try {
    const { id1, id2 } = req.params;
    const user1 = await User.findById(id1);
    const user2 = await User.findById(id2);

    //make sure both users exist
    if (!user1 || !user2) {
      return res.status(404).json({
        success: false,
        message: "Users not found",
      });
    }

    if (user1 === user2) {
      return res.status(400).json({
        success: false,
        message: "Users must be different",
      });
    }

    if (user1.friends.length === 0 || user2.friends.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No connection exists between these two users",
      });
    }

    // parentsMap -> HashMap with (node,parent) pairs
    // visited -> set to keep track of users already explored

    const parentsMap = new Map();
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

    var degrees = "";
    for (var i = path.length - 1; i >= 0; i--) {
      var n = path[i];
      degrees += " " + n;
      if (i != 0) degrees += " -->";
    }

    return res.status(200).json({
      success: true,
      message: degrees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
