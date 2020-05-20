import React from 'react';
import PropTypes from 'prop-types';

import './SingleBoard.scss';

class SingleBoard extends React.Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    setSingleBoard: PropTypes.func.isRequired,
  }

  render() {
    const { boardId, setSingleBoard } = this.props;

    return (
      <div className="SingleBoard">
        <h2>SINGLE BOARD VIEW</h2>
        <button className="btn btn-dark" onClick={() => { setSingleBoard(''); }} >Close</button>
        <h3>{boardId}</h3>
      </div>
    );
  }
}

export default SingleBoard;
