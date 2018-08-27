import actionTypes from '../constants/actionTypes';
import axios from 'axios';

export function meetingSlotsDetails(meetingSlots){
    return {
        type: actionTypes.MEETING_SLOTS,
        meetingSlots
    };
};

export function fetchMeetingSlots() {
    console.log('Fetching Meeting Slots..');

    return(dispatch) => {
        axios.get('meetingsSlot')
            .then((response) => {
                console.log('response');
                console.log(response);
                return response.data.data;
            })
            .then((slots) => {
                dispatch(meetingSlotsDetails(slots));
            }).catch(() => {
                console.log('Error Loading Slots..');
                dispatch(meetingSlotsDetails([]));
        })
    }
}
