const express = require("express")
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://sobujrana43997:BB2CuuyHuwWdOS0S@cluster0.udy85xl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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
        

        const documentCollection = client.db('plandentallDb').collection('documents')


        app.post("/documents",async(req,res) =>{
            const document = req.body ;
            const result = await documentCollection.insertOne(document)
            res.send(result)
        })


        app.get('/documents',async(req,res) =>{
            const result =await documentCollection.find().toArray()
            res.send(result)
        })

        app.delete('/documents/:id',async(req,res) =>{
            const id = req.params.id
            const query = {_id:new ObjectId(id)}
            const result = await documentCollection.deleteOne(query)
            res.send(result)
        })

        app.get('/document/:id',async(req,res)=>{
            const id = req.params.id
            const query = {_id: new ObjectId(id)}
            const result = await documentCollection.findOne(query)
            res.send(result)
        })
 
 
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('plandentall server is running.............')
})



app.listen(port, () => {
    console.log(`running port ${port}`)
})