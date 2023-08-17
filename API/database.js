const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/api-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error('Error connecting to database:\n', err));
