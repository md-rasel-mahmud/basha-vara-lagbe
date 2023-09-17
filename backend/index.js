/* eslint-disable no-undef */
// import express , dotenv and cors
import "dotenv/config";
import express from "express";
const app = express();
import cors from "cors";
// import mongodb
import { MongoClient, ObjectId } from "mongodb";

// set cors middleware and express json middleware
app.use(cors());
app.use(express.json());

// local mongodb
const client = new MongoClient(process.env.MONGO_URI);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const users = client.db("bvl").collection("users");
    const postCollection = client.db("bvl").collection("postCollection");

    //---------------------------------------

    // user related apis
    // create a user post route
    app.post("/user", async (req, res) => {
      const user = req.body;

      const findData = await users.findOne({ email: user.email });
      if (findData) {
        return res.send({ message: "User already exists" });
      }
      const result = await users.insertOne(user);

      res.send(result);
    });

    // get user by email
    app.get("/user", async (req, res) => {
      const { email, allUsers } = req.query;
      if (email) {
        const query = { email: email };
        const result = await users.findOne(query);
        return res.send(result);
      }
      if (allUsers) {
        const allUsersResult = await users.find().toArray();
        return res.send(allUsersResult);
      }
    });

    //---------------------------------------

    //post related apis
    // create-post data route
    app.post("/post", async (req, res) => {
      const post = req.body;

      const result = await postCollection.insertOne(post);
      res.send(result);
    });

    // get posts data by pagination
    app.get("/post", async (req, res) => {
      const page = parseInt(req.query.page);
      const size = parseInt(req.query.size);

      const cursor = postCollection.find();
      let result;

      if (page || size) {
        result = await cursor
          .skip(page * size)
          .limit(size)
          .toArray();
      } else {
        result = await cursor.toArray();
      }
      res.send(result);
    });

    // get post by user email
    app.get("/post/user", async (req, res) => {
      const { email } = req.query;
      const result = await postCollection.find({ email: email }).toArray();

      res.send(result);
    });

    // update post
    app.put("/post/:id", async (req, res) => {
      const id = req.params.id;
      const post = req.body;
      const filter = { _id: new ObjectId(id) };

      const options = { upsert: true };
      const updateDoc = {
        $set: post,
      };
      const result = await postCollection.updateOne(filter, updateDoc, options);

      res.send(result);
    });

    // delete post
    app.delete("/post/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await postCollection.deleteOne(query);

      res.send(result);
    });

    //---------------------------------------

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// listen the app
app.listen(process.env.PORT || 5000, () => {
  console.log("server is running on port 5000");
});

// check is server runing
app.get("/", (req, res) => {
  return res.send('<h1 style="text-align:center">Basha vara lagbe?</h1>');
});
