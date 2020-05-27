import React from 'react';
import PropTypes from 'prop-types';

import './BoardForm.scss';
import authData from '../../helpers/data/authData';

class BoardForm extends React.Component {
  static propTypes = {
    saveNewBoard: PropTypes.func.isRequired,
  }

  state = {
    boardName: '',
    boardDescription: '',
  }

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ boardName: e.target.value });
  };

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ boardDescription: e.target.value });
  };

  saveBoard = (e) => {
    e.preventDefault();
    const newBoardObject = {
      description: this.state.boardDescription,
      name: this.state.boardName,
      uid: authData.getUid(),
    };
    this.props.saveNewBoard(newBoardObject);
  };

  render() {
    const { boardName, boardDescription } = this.state;

    return (
      <div className="BoardForm">
        <form className="col-6 offset-3">
          <div className="form-group">
            <label htmlFor="board-name">Board Name</label>
            <input
              type="text"
              className="form-control"
              id="board-name"
              placeholder="Title of your new board"
              value={boardName}
              onChange={this.nameChange}
            />
          </div>
          {/* both formats of code are acceptable for these two inputs */}
          <div className="form-group">
            <label htmlFor="board-desc">Description</label>
            <input type="text" className="form-control" id="board-desc" placeholder="Tell us about it" value={boardDescription} onChange={this.descriptionChange}/>
          </div>
          <button type="submit" className="btn btn-info" onClick={this.saveBoard}>Save Board</button>
        </form>
      </div>
    );
  }
}

export default BoardForm;
