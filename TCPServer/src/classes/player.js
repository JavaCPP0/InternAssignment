class Player {
    constructor() {
        this.clickCount = 0;
        this.lastClickTime = null;
        this.startTime = Date.now();
        this.isDisqualified = false;
    }

    incrementClick() {
        this.clickCount++;
        this.lastClickTime = Date.now();
    }

    getClickCount() {
        return this.clickCount;
    }

    getPlayTime() {
        return Date.now() - this.startTime;
    }
}

export default Player;