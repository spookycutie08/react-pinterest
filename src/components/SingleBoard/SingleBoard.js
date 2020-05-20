import React from 'react';
import PropTypes from 'prop-types';

import './SingleBoard.scss';

import Pin from '../Pin/Pin';
import boardsData from '../../helpers/data/boardsData';
import pinsData from '../../helpers/data/pinsData';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    board: {},
    pins: [],
  }

  componentDidMount() {
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
  }

  render() {
    const { setSingleBoard } = this.props;
    const { board, pins } = this.state;

    const makePins = pins.map((p) => <Pin key="p.id" pin={p}/>);

    return (
      <div className="SingleBoard">
        <h2>SINGLE BOARD VIEW</h2>
        <button className="btn btn-dark" onClick={() => { setSingleBoard(''); }} >Close</button>
        <h2>{board.name} Board</h2>
        <div className="d-flex flex-wrap">
          {makePins}
        </div>
      </div>
    );
  }
}

export default SingleBoard;
