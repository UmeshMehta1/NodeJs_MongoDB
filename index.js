const express= require('express')
require('./config')
const product = require('./product')

const app = express();

app.use(express.json());
//=========post====================
app.post('/home', async(req,resp)=>{
    let data = new product(req.body);
    let result = await data.save()
    
    console.log(result)
    resp.send(result)
    // console.log(req.body)
})
//===========find()====================
app.get("/list", async (req, resp) => {
    let data = await product.find();
    resp.send(data);
})
//==================delete()=======================
app.delete("/delete/:_id", async (req, resp) => {
    console.log(req.params)
    let data = await product.deleteOne(req.params);
    resp.send(data);
})
//================update===========
app.put("/update/:_id",async (req, resp) => {
    console.log(req.params)
    let data = await product.updateOne(
        req.params,
        {$set: req.body}
    );
    resp.send(data);
})
//====================search()======================
app.get("/search/:key",async (req,resp)=>{
    let data = await product.find(
        {
            "$or":[
                {name:{$regex:req.params.key}},
                {price:{$regex:req.params.key}}
            ]
        }
    )
    resp.send(data);

})

app.listen(4000,()=>{
    console.log('started in port 4000')
})

