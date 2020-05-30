import React from 'react';
import PropTypes from 'prop-types';

import './SingleBoard.scss';

import Pin from '../Pin/Pin';
import PinForm from '../PinForm/PinForm';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    editPin: {},
    pins: [],
    formOpen: false,
  }

  getInfo = () => {
    const { boardId } = this.props;
    boardsData.getSingleBoard(boardId)
      .then((request) => {
        const board = request.data;
        this.setState({ board });
        pinsData.getPinsByBoardId(boardId)
          .then((pins) => {
            this.setState({ pins });
          });
      })
      .catch((err) => console.error('unable to get single board:', err));
  };

  componentDidMount() {
    this.getInfo();
  }

  removePin = (pinId) => {
    pinsData.deletePin(pinId)
      .then(() => this.getInfo()) // call this to update the state (refresh and reprint pins)
      .catch((err) => console.error('could not delete pin:', err));
  };

  saveNewPin = (pinObject) => {
    pinsData.savePin(pinObject)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('could not make new pin: ', err));
  };

  editAPin = (pin) => {
    this.setState({ editPin: pin, formOpen: true });
  };

  putPin = (pinId, pinObject) => {
    pinsData.updatePin(pinId, pinObject)
      .then(() => {
        this.getInfo();
        this.setState({ formOpen: false, editPin: {} });
      })
      .catch((err) => console.error('could not update pin:', err));
  };


  render() {
    const { setSingleBoard, boardId } = this.props;
    const {
      board,
      pins,
      formOpen,
      editPin,
    } = this.state;

    const makePins = pins.map((p) => <Pin key={p.id} pin={p} removePin={this.removePin} editAPin={this.editAPin}/>);

    return (
      <div className="SingleBoard">
        <h2>SINGLE BOARD VIEW</h2>
        <button className="btn btn-dark" onClick={() => { setSingleBoard(''); }} >Close</button>
        <h2>{board.name} Board</h2>
        <h3>{board.description}</h3>
        <button className="btn btn-success" onClick={() => this.setState({ formOpen: true })}>Add New Pin</button>
        { formOpen ? <PinForm boardId={boardId} saveNewPin={this.saveNewPin} pin={editPin} putPin={this.putPin}/> : ''}
        <div className="d-flex flex-wrap">
          {makePins}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
