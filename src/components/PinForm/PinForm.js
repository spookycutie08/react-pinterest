import React from 'react';
import PropTypes from 'prop-types';

import './PinForm.scss';
import authData from '../../helpers/data/authData';

class PinForm extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    saveNewPin: PropTypes.func.isRequired,
  }

  state = {
    pinTitle: '',
    pinImageUrl: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ pinTitle: e.target.value });
  };

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ pinImageUrl: e.target.value });
  };

  savePin = (e) => {
    e.preventDefault();
    const { pinImageUrl, pinTitle } = this.state;
    const { boardId, saveNewPin } = this.props;
    const newPinObject = {
      boardId,
      title: pinTitle,
      imageUrl: pinImageUrl,
      uid: authData.getUid(),
    };
    saveNewPin(newPinObject);
  };

  render() {
    const { pinTitle, pinImageUrl } = this.state;

    return (
      <div className="PinForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="pin-title">Pin Title</label>
            <input
              type="text"
              className="form-control"
              id="pin-title"
              placeholder="Title of your new Pin"
              value={pinTitle}
              onChange={this.nameChange}
            />
          </div>
          {/* both formats of code are acceptable for these two inputs */}
          <div className="form-group">
            <label htmlFor="pin-desc">Image URL</label>
            <input type="text" className="form-control" id="pin-desc" placeholder="Tell us about it" value={pinImageUrl} onChange={this.descriptionChange}/>
          </div>
          <button type="submit" className="btn btn-info" onClick={this.savePin}>Save Pin</button>
        </form>
      </div>
    );
  }
}

export default PinForm;
