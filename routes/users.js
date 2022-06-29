var express = require("express");
var router = express.Router();
var { mongodb, MongoClient, dburl } = require("../dbSchema");
const { ObjectId } = require("mongodb");
var {
  hashPassword,
  hashCompare,
  createToken,
  verifyToken,
} = require("../auth");


// Post Hotstar Data
router.post("/posthotstar", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let result = await db.collection("hotstar").insertMany(req.body);
    if (result) {
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Data Post Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// get Method for all data  (find all data)
router.get("/getmoviesortv", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db.collection("hotstar").find().toArray();
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// Latest & Trending  tv and movies (find all data)
router.get("/get-latest-and-Trending", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let dt = new Date();
    var year = dt.getFullYear();
    var pastYear = dt.getFullYear() - 1;
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({
          year: { $gte: 2021, $lte: 2022 },
          key: {
            $in: ["movies", "tvshowes"],
          },
        })
        .sort({ name: 1 })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// Shows Recommended For You (find all data)
router.get("/get-shows-recommended-for-you", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ categoryOfShow: "Shows Recommended For You" })
        .sort({ name: 1 })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "Shows Recommended Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// Hotstar Specials (find all data)
router.get("/get-hotstar-specials", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ categoryOfShow: "Hotstar Specials" })
        .sort({ name: 1 })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Specials Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// All Movies (find all data)
router.get("/get-all-movies", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ moviesOrTv: "Movies" })
        .sort({ name: -1 })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "All Movies Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// All tv shows (find all data)
router.get("/get-all-tv-shows", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ moviesOrTv: "Tv Showes" })
        .sort({ name: -1 })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "All tv showes Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
//find the selected mon=vies and tv shows----------------------------------------------------------------
router.get("/get-find-the-category/:categoryKey", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      if (req.params.categoryKey === "latestandtrending") {
        var result = await db
          .collection("hotstar")
          .find({
            year: { $gte: 2021, $lte: 2022 },
            key: {
              $in: ["movies", "tvshowes"],
            },
          })
          .sort({ name: 1 })
          .toArray();
      } else {
        result = await db
          .collection("hotstar")
          .find({
            $or: [
              { categoryKey: req.params.categoryKey },
              { key: req.params.categoryKey },
            ],
          })
          .toArray();
      }
      res.json({
        statusCode: 200,
        result,
        message: "Shows Recommended Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// --------------------------------------------------------------------
// find selected 1 object details
router.get("/seleteted-moviesandtvshow-details/:keyName", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ keyName: req.params.keyName })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "All Movies Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
// find selected 1 object player
router.get("/seleteted-moviesandtvshow-player/:id", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ _id: ObjectId(req.params.id) })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "All Movies Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

// Search
// post Method  (find all data)
router.post("/post-search-name", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("hotstar");
    if (user) {
      let result = await db
        .collection("hotstar")
        .find({ name: { $regex: req.body.name } })
        .toArray();
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

//post watch List
router.post("/post-add-watch-list", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let result = await db.collection("watchlist").insertOne(req.body);
    if (result) {
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Data Post Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});
// get method for watchlist
router.get("/get-add-watch-list", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("watchlist");
    if (user) {
      let result = await db.collection("watchlist").find().toArray();
      res.json({
        statusCode: 200,
        result,
        message: "Hotstar Data Get Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
});

router.delete("/delete-add-watch-list/:id", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("watchlist").find().toArray();
    if (user) {
      let result = await db
        .collection("watchlist")
        .deleteOne({ _id: req.params.id }); 
      res.json({
        statusCode: 200,
        result,
        message: "Watchlist Data Delete Successfully",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Delete Failed",
    });
  }
});

// sign up
router.post("/sign-up", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("users").find({ email: req.body.email });
    if (user.length > 0) {
      res.json({
        statusCode: 400,
        message: "User does not exist",
      });
    } else {
      let hashedPassword = await hashPassword(
        req.body.password,
        req.body.cpass
      );
      req.body.password = hashedPassword;
      req.body.cpassword = hashedPassword;
      let user = await db.collection("users").insertOne(req.body);
      res.json({
        statusCode: 200,
        message: "User SignUp Successfull",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    client.close();
  }
});

// login
router.post("/login", async (req, res) => {
  const client = await MongoClient.connect(dburl);
  try {
    let db = await client.db("disneypulhotstart");
    let user = await db.collection("users").findOne({ email: req.body.email });
    if (user) {
      let compare = await hashCompare(req.body.password, user.cpassword);
      if (compare) {
        let token = await createToken(user.email);
        res.json({
          statusCode: 200,
          email: user.email,
          token,
        });
      } else {
        res.json({
          statusCode: 400,
          message: "Invalid Password",
        });
      }
    } else {
      res.json({
        statusCode: 404,
        message: "User Not Found",
      });
    }
  } catch (error) {
    res.json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  } finally {
    client.close();
  }
});

router.post("/auth", verifyToken, async (req, res) => {
  res.json({
    statusCode: 200,
    message: req.body.purpose,
  });
});

module.exports = router;
