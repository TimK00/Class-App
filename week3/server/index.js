const express = require('express');
const app = express();

app.use(express.static('public'));
app.use('/js', express.static(__dirname + 'public/src'));

app.listen(3000, function() {
    console.log('Server started at http://localhost:%s', 3000);
});