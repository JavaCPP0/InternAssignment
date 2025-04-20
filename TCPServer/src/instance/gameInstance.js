import ClickGame from '../classes/game.js';

let gameInstance = null;

const getGame = () => {
    if (!gameInstance) {
        gameInstance = new ClickGame();
        console.log('새 게임 인스턴스가 생성되었습니다.');
    }
    console.log('현재 게임 인스턴스:', gameInstance);
    return gameInstance;
};


export default getGame;