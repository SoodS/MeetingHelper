const express = require('express');
const router = express.Router();

const meetingSlots = [{
    id:'1',
    time: '9am - 10am',
    name:'',
    phone:'',
    booked:false
}, {
    id:'2',
    time: '10am - 11am',
    name:'',
    phone:'',
    booked:false
}, {
    id:'3',
    time: '11am - 12pm',
    name:'Sam',
    phone:'1234567890',
    booked:true
},{
    id:'4',
    time: '12pm - 1pm',
    name:'',
    phone:'',
    booked:false
}, {
    id:'5',
    time: '1pm - 2pm',
    name:'',
    phone:'',
    booked:false
}, {
    id:'6',
    time: '2pm - 3pm',
    name:'',
    phone:'',
    booked:false
}, {
    id:'7',
    time: '3pm - 4pm',
    name:'',
    phone:'',
    booked:false
},{
    id:'8',
    time: '4pm - 5pm',
    name:'',
    phone:'',
    booked:false
} ];

router.get('/', function(req, res, next) {
    res.status(200).send({
        data: meetingSlots
    })
});

module.exports = router;