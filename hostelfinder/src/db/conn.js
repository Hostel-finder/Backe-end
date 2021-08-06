const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/HostelFinder",{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
}).then(()=>{
    console.log(`connected to db`);
}).catch((e)=>{
    console.log(`Not connected to db`);
})

