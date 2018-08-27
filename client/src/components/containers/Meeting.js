import React, { Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty, forEach, eq, remove } from 'lodash';
import { fetchMeetingSlots} from '../../actions/actions';
import { Modal } from './Modal';
import ReactModal from 'react-modal';
import index from "../../reducers/index";

export class Meeting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen :false,
            currentSlotId: "",
            currentSlotName:"",
            currentSlotPhone:"",
            slotsInfo :[]
        };
    }

    componentDidMount() {
        this.props.meetingsSlotsDetails();
    }

    render() {
        var meetingSlots = [];

        if(!isEmpty(this.props.meetingsSlots)) {
            meetingSlots = this.getMeetingsSlot();
        }

        return (
            <div>
                <div>
                List of Meeting Slots
                {
                    meetingSlots.map((slot,i) => {
                       return(
                           <div className='slot-display' key={i}>
                               <div/>
                               <div/>
                               <div id={'slot_' + slot.id} className={(slot.booked) ? 'slot-booked' :''} key={i} onClick={(e) => this.toggleState(e, slot.id, slot.name, slot.phone)}>
                                   <div>
                                        <label> Slot : </label> <span>{slot.time}</span>
                                   </div>
                                   <div>
                                        <label> Booked By  : </label> <span>{slot.name}</span>
                                   </div>
                                   <div>
                                        <label> Phone No  : </label> <span>{slot.phone}</span>
                                   </div>
                               </div>
                           </div>)
                    })
                }
                </div>

                {this.state.isOpen &&
                    <ReactModal isOpen={this.state.isOpen} contentLabel="Meeting Modal" ariaHideApp={false}>

                        <div>
                            <button style={{float:'right'}} onClick={this.toggleModal}>Close</button>
                        </div>
                        <br/><br/><br/>

                        <Modal show={true} id={this.state.currentSlotId} name={this.state.currentSlotName}
                               phone={this.state.currentSlotPhone}
                               onClose={this.toggleModal} slotsInfo={this.modalCallBack}/>

                    </ReactModal>
                }
            </div>
        )
    }

    getMeetingsSlot = () => {
        let defaultSlots = [];

        if(!isEmpty(this.props.meetingsSlots)){
            defaultSlots = this.props.meetingsSlots;
        }

        var updatedSlots = this.getUpdatedSlotInfo(this.state.slotsInfo, defaultSlots);

        return updatedSlots;
    };

    getUpdatedSlotInfo(slotsInfo, slots) {
        slots.map((s) => {
            var slotIndex = slotsInfo.findIndex((obj => obj.id == s.id));

            if(slotIndex >= 0) {
                s.name = slotsInfo[slotIndex].name;
                s.phone = slotsInfo[slotIndex].phone;
                s.booked = (!isEmpty(s.name) && !isEmpty(s.phone));
            }
        });

        return slots;
    }

    modalCallBack = (id, name, phone) => {
        var slotsObj = this.state.slotsInfo;

        remove(slotsObj, function(s) {
           return eq(id, s.id);
        });

        slotsObj.push({'id':id, 'name': name, 'phone': phone});

        this.setState({slotsInfo: slotsObj});
    };

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    };

    toggleState = (e,id, name, phone) => {
        e.preventDefault();

        this.state.slotsInfo.map((slot) => {
            if(eq(id, slot.id)) {
                name = slot.name;
                phone = slot.phone;
            }
        });

        this.setState({
            currentSlotId: id,
            currentSlotName:name,
            currentSlotPhone:phone,
            isOpen: true

        });
    };
};

Meeting.propTypes = {
    meetingsSlotsDetails : PropTypes.func.isRequired,
    meetingsSlots : PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        meetingsSlots : state.meetingSlotsData
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        meetingsSlotsDetails: () => dispatch(fetchMeetingSlots())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Meeting);