import React from 'react';
import PropTypes from 'prop-types';

import './BoardContainer.scss';
import boardsData from '../../helpers/data/boardsData';
import authData from '../../helpers/data/authData';
import smash from '../../helpers/data/smash';

import Board from '../Board/Board';
import BoardForm from '../BoardForm/BoardForm';


class BoardContainer extends React.Component {
  static propTypes = {
    setSingleBoard: PropTypes.func.isRequired,
  }

  state = {
    boards: [],
    formOpen: false,
    editBoard: {},
  }

  getAllBoards = () => {
    boardsData.getBoardsByUid(authData.getUid())
      .then((boards) => this.setState({ boards }))
      .catch((err) => console.error('unable to get boards:', err));
  };

  componentDidMount() {
    this.getAllBoards();
  }

  removeBoard = (boardId) => {
    smash.completelyRemoveBoard(boardId)
      .then(() => this.getAllBoards())
      .catch((err) => console.error('could not delete board:', err));
  };

  saveNewBoard = (boardObject) => {
    const newBoard = boardObject;
    boardsData.saveBoard(newBoard)
      .then(() => {
        this.getAllBoards();
        this.setState({ formOpen: false });
      })
      .catch((err) => console.error('could not add new board:', err));
  };

  putBoard = (boardId, boardObject) => {
    boardsData.updateBoard(boardId, boardObject)
      .then(() => {
        this.getAllBoards();
        this.setState({ formOpen: false, editABoard: {} });
      })
      .catch((err) => console.error('problem with putBoard:', err));
  };

  editABoard = (board) => {
    this.setState({ formOpen: true, editBoard: board });
  };

  render() {
    const { boards, formOpen, editBoard } = this.state;
    const { setSingleBoard } = this.props;
    const makeBoards = boards.map((board) => <Board key={board.id} board={board} editABoard={this.editABoard} setSingleBoard={setSingleBoard} removeBoard={this.removeBoard}/>);

    return (
      <div className="BoardContainer">
        <h2>Boards</h2>
        <button className="btn btn-info" onClick={() => this.setState({ formOpen: true })}>Add New Board</button>
        {/* this line above was written in-line function for formOpen, but could be called from elsewhere */}
        { formOpen ? <BoardForm saveNewBoard={this.saveNewBoard} board={editBoard} putBoard={this.putBoard}/> : ''}
        <div className="d-flex flex-wrap">
            {makeBoards}
        </div>
      </div>
    );
  }
}

export default BoardContainer;
