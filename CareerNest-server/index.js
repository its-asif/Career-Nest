const express = require("express");
const cors = require("cors");
const app = express();
const { ObjectId } = require('mongodb');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gf8ipgr.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    const userCollection = client.db('careerDB').collection('user');
    const jobCollection = client.db('careerDB').collection('job');


     // user related APIs

    // get user data from database
    app.get('/user', async(req, res)=>{ // getting all data from database
        const cursor = userCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })

    app.post('/user', async(req, res)=>{
        const user = req.body;
        console.log(user);
        const result = await userCollection.insertOne(user);
        res.send(result);
    })

    app.get('/user/:email', async(req, res)=>{
        const email = req.params.email;
        const query = {email: email};
        const result = await userCollection.findOne(query);
        res.send(result);
        
    })

    app.put('/user/:email', async(req, res)=>{ // updating data into database
        const email = req.params.email;
        const filter = {email: email};
        const options = {upsert : true};
        const updateUser = req.body;
        const user ={
            $set: {
                appliedJobs : updateUser.appliedJobs, 
                myCart : updateUser.myCart,
                myJobs : updateUser.myJobs,
            }
        }
        const result = await userCollection.updateOne(filter, user, options);
        res.send(result);
    })


    // job related APIs

    // get job data from database
    app.get('/job', async(req, res)=>{ // getting all data from database
        const cursor = jobCollection.find();
        const result = await cursor.toArray();
        res.send(result);
    })


    app.post('/job', async(req, res)=>{ // posting data to database
        const job = req.body;
        console.log(job);
        const result = await jobCollection.insertOne(job);
        res.send(result);
    })

    app.get('/job/:id', async (req, res) => {
        const id = req.params.id;
    
        try {
            // Convert the string id to ObjectId
            const objectId = new ObjectId(id);
    
            const query = { _id: objectId };
            const result = await jobCollection.findOne(query);
    
            res.send(result);
        } 
        catch (e) {
            console.log(e);
        }
    });

    app.put('/job/:id', async(req, res)=>{ // updating data into database
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const filter = {_id: objectId};
        const options = {upsert : true};
        const updateJob = req.body;

        const job ={
            $set: {

                title : updateJob.title,
                jobCategory : updateJob.jobCategory,
                image : updateJob.image,
                postedBy : updateJob.postedBy,
                description : updateJob.description,
                // postingDate : updateJob.postingDate,
                applicationDeadline : updateJob.applicationDeadline,
                // applicantsNumber : updateJob.applicantsNumber,
                salaryRange : updateJob.salaryRange,
                // applicants : updateJob.applicants,

                appliedUsers : updateJob.appliedUsers,

            }
            
        }


        const result = await jobCollection.updateOne(filter, job, options);
        res.send(result);
    })

    
    app.delete('/job/:id', async(req, res)=>{
        const id = req.params.id;
        const objectId = new ObjectId(id);
        const query = {_id: objectId};
        const result = await jobCollection.deleteOne(query);
        res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();  
  }
}
run().catch(console.dir);  



app.get('/', (req, res) =>{
    res.send("Server is running");
})


app.listen( port, () =>{
    console.log(`Server Port : ${port}`);
})
