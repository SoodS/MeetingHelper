const express = require('express');
const cors = require('cors');

const meetingsSlot = require('./routes/meetingSlots');

let app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());

app.use('/meetingsSlot', meetingsSlot);

app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
});