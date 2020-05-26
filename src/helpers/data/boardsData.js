import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getBoardsByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/boards.json?orderBy="uid"&equalTo="${uid}"`)
    .then((result) => {
      const allBoardsObject = result.data;
      const boards = [];
      if (allBoardsObject.keys !== null) {
        Object.keys(allBoardsObject).forEach((boardId) => {
          const newBoard = allBoardsObject[boardId];
          newBoard.id = boardId;
          boards.push(newBoard);
        });
      }
      resolve(boards);
    })
    .catch((err) => reject(err));
});

const getSingleBoard = (boardId) => axios.get(`${baseUrl}/boards/${boardId}.json`);

const deleteBoard = (boardId) => axios.delete(`${baseUrl}/boards/${boardId}.json`);

const saveBoard = (boardObject) => axios.post(`${baseUrl}/boards.json`, boardObject);

export default {
  getBoardsByUid,
  getSingleBoard,
  deleteBoard,
  saveBoard,
};
