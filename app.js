const express=require("express");
const app=express();

const mongoose=require("mongoose")
app.use(express.json())
const mongourl="mongodb+srv://sauhardsingh093:fFu6cHho6eEvtDsJ@cluster0.erw8axu.mongodb.net/?retryWrites=true&w=majority";
const cors=require("cors")
const jwt=require('jsonwebtoken')

const JWT_SECRET="SKFNSIFBNFSNSIF"
app.use(cors())

mongoose.connect(mongourl,{
    useNewUrlParser:true
}).then(()=>{console.log("Connected to database")}).catch(e=>console.log(e))



app.listen(5000,()=>{
    console.log("server started")
}) 


// app.post("/post",async(req,res)=>{
//     console.log(req.body);
//     const {data}=req.body;
//     try{
//         if(data=="harsh"){
//             res.send({status:"ok"})
//         }
//         else {
//             res.send({status:"user not found"});
//         }
//     } catch (error){
//         res.send({status:"something went wrong"});
//     }
// })

require("./voterDetails")
    const Voter=mongoose.model("VoterInfo")

    //register to add voterInfo in mongodb database
app.post("/register", async (req,res)=>{
    const {Vname,Vepic,Vaadhar,Vmobile} = req.body
    try{
        const oldVoter = await Voter.findOne({Vepic})

        if(oldVoter){
           return res.send({error:"Voter exists"})
        }
        await Voter.create({
            name:Vname,
            epic:Vepic,
            aadhar:Vaadhar,
            mobile:Vmobile
        })
        res.send({status :"ok"})
    } catch (error){
        res.send({status :"error"})
    }
})



    app.post("/login-voter",async (req,res)=>{
        const{epic,aadhar} =req.body;

        const voter = await Voter.findOne({epic})
        if(!voter){
            return res.json({error:"Voter not found"})
        }

        if(aadhar==voter.aadhar){
            const token=jwt.sign({},JWT_SECRET)
        

        if(res.status(201)){
            return res.json({status:"ok", data:token})
        } else {
            return res.json({error:"error"})
        }
    }
        res.json({status:"error", error:"Invalid credentials"})
})
   
