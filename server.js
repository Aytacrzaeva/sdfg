const express = require("express")
const app = express();
const cors = require("cors");
app.use(cors());
const PORT = 8080
const MongooseConnect = ""
const mongoose = require("mongoose")
app.use(express.json());

const productsSchema = mongoose.Schema({
    brand: {
        type: String,
        required: true
    }
});
const Products = mongoose.model("Products", productsSchema)


//Post
app.post("/add", async (req, res) => {
    const newProduct = new Products({
        ...req.body,
    })
    await newProduct.save();
    res.send(newProduct);
})


//Get
app.get("/add", async (req, res) => {
    const data = await Products.find();
    res.send(data)
});


// Delete by id
app.delete("/add/:id", async (req, res) => {
    const { id } = req.params;
    await Products.findByIdAndDelete(id);
    res.send("product has been deleted");
  });

//Update component by id 
app.put("/add/:id", async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await Products.findByIdAndUpdate(id, { ...req.body });
  });
  
//Connect to mongoose
mongoose.connect(MongooseConnect).then(() => {
    console.log("DB CONNECTED");
  });

//Call localHost8080
app.listen(PORT, () => {
    console.log("App running");
  });