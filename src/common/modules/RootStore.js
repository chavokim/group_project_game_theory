import PlayerStore from "./player/PlayerStore";
import GameStore from "./GameStore";

export default class RootStore {
    constructor() {
        this.playerStore = new PlayerStore(this);
        this.gameStore = new GameStore(this);
    }
}