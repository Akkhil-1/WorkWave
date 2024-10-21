const mongoose = require('mongoose')

const url = 'mongodb+srv://akhil1216be22:mithu.12@cluster1.vrezmmd.mongodb.net/booking_management_system?retryWrites=true&w=majority&appName=Cluster1'

const dbConnect = async ()=>{
    try{
        await mongoose.connect(url)
        console.log('Db connected');
        
    }
    catch(err)
    {
        console.log('Error is ' + err);
        res.json({
            msg : 'Db not connected'
        })
    }
}

module.exports = dbConnect