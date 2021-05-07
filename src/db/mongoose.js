const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI, {
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(()=> console.log('Connected to database'))
    .catch(() => console.log('Refuse to connect with database... !'))