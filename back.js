const express = require('express');
const mongoose = require ('mongoose');
const app = express();

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/category-roster', { useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('error', function(error) {
    console.error(error);
});



app.listen(3000, () => console.log('Listening on port 3000!'));
