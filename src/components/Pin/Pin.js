import React from 'react';
import PropTypes from 'prop-types';

import './Pin.scss';

import PinShapePropz from '../../helpers/propz/pinShape';

class Pin extends React.Component {
  static propTypes = {
    pin: PinShapePropz.pinShape,
    removePin: PropTypes.func.isRequired,
    editAPin: PropTypes.func.isRequired,
  }

  deletePinEvent = (e) => {
    e.preventDefault();
    const { pin, removePin } = this.props;
    removePin(pin.id);
  };

  editPinEvent = (e) => {
    e.preventDefault();
    const { pin, editAPin } = this.props;
    editAPin(pin);
  };

  render() {
    const { pin } = this.props;
    return (
      <div className="Pin col-3">
        <div className="card" >
          <img src={pin.imageUrl} className="card-img-top" alt="card cap"/>
          <div className="card-body">
            <h5 className="card-title">{pin.title}</h5>
            <button className="btn btn-dark" onClick={this.deletePinEvent}>Delete</button>
            <button className="btn btn-info" onClick={this.editPinEvent}>Edit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pin;
