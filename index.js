const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.blfnlbm.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)


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

        
       

        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

const productCollection = client.db('productDB').collection('product')
        // const itemCollection = client.db('itemDB').collection('item')

        app.get('/product', async(req, res)=>{

            const cursor = productCollection.find()
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/product/:name', async(req, res)=>{

            const name = req.params.name
            const cursor = productCollection.find({brand:name})
            const result = await cursor.toArray()
            res.send(result)
            console.log('add korchi', name)
        })


        app.get('/product/single/:id', async(req, res)=>{
            
            const id = req.params.id
            const query = {_id: new ObjectId(id ),
               
            }
            const result= await productCollection.findOne(query)
            res.send(result)
          })
        
      

       
        app.post('/product', async (req, res) => {
            const addProduct = req.body
            console.log(addProduct)
            const result = await productCollection.insertOne(addProduct)
            res.send(result)
        })


app.get('/', (req, res) => {
    res.send('style and fashion server is Running')
})

app.listen(port, () => {
    console.log(`style and fashion server is Running on port ${port}`)
})