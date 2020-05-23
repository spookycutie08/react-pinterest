import React from 'react';
import PropTypes from 'prop-types';
import './Board.scss';

import BoardShapez from '../../helpers/propz/boardShape';

class Board extends React.Component {
  static propTypes = {
    board: BoardShapez.boardShape,
    setSingleBoard: PropTypes.func.isRequired,
    removeBoard: PropTypes.func.isRequired,
  }

  openSingleBoardEvent = (e) => {
    e.preventDefault();
    const { board, setSingleBoard } = this.props;
    setSingleBoard(board.id);
  };

  deleteBoardEvent = (e) => {
    e.preventDefault();
    const { board, removeBoard } = this.props;
    removeBoard(board.id);
  };

  render() {
    const { board } = this.props;
    return (
      <div className="Board col-4">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{board.name}</h5>
            <p className="card-text">{board.description}</p>
            <button className="btn btn-danger" onClick={this.openSingleBoardEvent}>View Pins</button>
            <button className="btn btn-dark" onClick={this.deleteBoardEvent}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
