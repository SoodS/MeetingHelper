import constants from '../constants/actionTypes'

export function meetingSlotsData(state = [], action) {
    switch (action.type) {
        case constants.MEETING_SLOTS:
            return action.meetingSlots;

        default:
            return state;
    }
}