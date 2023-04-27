//mongodb schema
const mongoose=require("mongoose")
const VoterDetailsSchema=new mongoose.Schema({
name: String,
epic : { type: String, unique:true},
aadhar: Number,
mobile: Number
},{
    collection:"VoterInfo",
})

mongoose.model("VoterInfo",VoterDetailsSchema)