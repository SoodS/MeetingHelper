import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

export class Modal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name:this.props.name,
            phone:this.props.phone,
            nameError: false,
            phoneError:false
        };
    }

    render() {
        return(
            <div style={{display:this.props.show ?'block':'none'}}>
                <div className='message--info'>Clear both fields to free this slot.</div>
                <br/><br/>

                <div className='message--error' style={{display:this.state.nameError ?'block':'none'}}> Please Enter a valid name. Max 10 Character.</div>

                <br/>

                <div>
                    <label className='input-style'> Name : </label>
                    <input className='input-style' type="text" placeholder="Enter your name" value={this.state.name} onChange={(e) => this.setState({name : e.target.value.trim()})}/>
                </div>

                <div className='message--error' style={{display:this.state.phoneError ?'block':'none'}}> Please Enter a valid phone number in xxxxxxxxxxx format.</div>

                <br/>

                <div>
                    <label className='input-style'> Phone : </label>
                    <input className='input-style' type="text" placeholder="Enter your phone" value={this.state.phone} onChange={(e) => this.setState({phone : e.target.value.trim()})}/></div>

                <br/><br/>

                <div>
                    <span className="styleButton">
                        <input type="submit" value="Save" onClick={(e) =>this.saveInput(e, this.props.id)} />
                    </span>
                    <span className="styleButton">
                        <input type="button" value="Cancel" onClick={(e) =>this.closeModal(e)} />
                    </span>
                </div>
            </div>

        )
    }

    validateName(n) {
        if(isEmpty(n) || n.length > 10) {
            this.setState({nameError : true});
            return true;
        } else {
            this.setState({nameError : false});
            return false;
        }
    }
    validatePhone(p) {
        var phonePattern = /^\d{10}$/;

        if( (p.match(phonePattern))) {
            this.setState({phoneError : false});
            return false;
        } else {
            this.setState({phoneError : true});
            return true;
        }
    }

    validateInput(n,p) {
        if(isEmpty(n) && isEmpty(p)) {
            return false;
        } else {
            var nErr = this.validateName(n);

            var pErr = this.validatePhone(p);

            return (nErr || pErr);
        }
    }

    saveInput(e, id){
        e.preventDefault();

        var err = this.validateInput(this.state.name, this.state.phone);

        if(!err) {
            this.setState({show:false});
            this.props.onClose();
            this.props.slotsInfo(id, this.state.name, this.state.phone);
        }
    }

    closeModal(e) {
        e.preventDefault();
        this.setState({show:false});
        this.props.onClose();
    }

};

Modal.propTypes = {
    show: PropTypes.bool.isRequired,
    id: PropTypes.string.isRequired,
    slotsInfo: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired
};

Modal.defaultProps ={
    id: "",
    show: false,
    name: "",
    phone: ""
};

export default connect()(Modal);