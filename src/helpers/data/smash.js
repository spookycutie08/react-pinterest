import boardsData from './boardsData';
import pinsData from './pinsData';

const completelyRemoveBoard = (boardId) => new Promise((resolve, reject) => {
  boardsData.deleteBoard(boardId)
    .then(() => {
      pinsData.getPinsByBoardId(boardId)
        .then((boardPins) => {
          boardPins.forEach((p) => pinsData.deletePin(p.id));
          resolve();
        });
    })
    .catch((err) => reject(err));
});

export default { completelyRemoveBoard };
