import ClickGame from '../classes/game.js';

let gameInstance = null;

const getGame = () => {
    if (!gameInstance) {
        gameInstance = new ClickGame();
    }
    return gameInstance;
};

export default getGame;