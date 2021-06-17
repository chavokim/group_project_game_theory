import {makeAutoObservable} from "mobx";
import {makeNArray, makeSeed} from "../utils/makeNArray";
import {mulberry32} from "../utils/mulberry32";
import {getProjectGPA} from "../utils/getProjectScore";

export const MAX_SEMESTER = 10;
export const MAX_CLASS = 6;
const CLASS_LOADS = [
    [5, 10, 15, 20, 30, 20],
    [16, 16, 16, 16, 16, 20],
    [17, 17, 17, 17, 17, 15],
    [3, 6, 11, 10, 25, 45],
    [5, 5, 5, 29, 28, 28],
    [10, 20, 10, 20, 10, 30],
    [15, 30, 15, 10, 10, 20],
    [40, 10, 20, 10, 10, 10],
    [15, 15, 30, 5, 10, 25],
    [10, 20, 30, 30, 5, 5],
]

const compare = (a, b) => {
    if(a.score < b.score)
        return 1;
    if(a.score > b.score)
        return -1;
    return 0;
}

export default class GameStore {
    debugLog = '';

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {}, {autoBind: true});
        this.init();
    }

    printLog(log) {
        this.debugLog += log;
    }

    init() {
        this.debugLog = '';
    }

    start(semesterCnt, classCnt) {
        this.printLog(`-----${classCnt+1}번째 수업(로드 = ${CLASS_LOADS[semesterCnt][classCnt]}) 시작-----\n`);
        const n = this.rootStore.playerStore.players.length
        const ids = makeNArray(n);
        const pairs = [];
        const scores = [];

        for(let playerCnt = 0; playerCnt < n; playerCnt++) {
            const rand = mulberry32(makeSeed(semesterCnt, classCnt, playerCnt)) * ids.length;
            const id = Math.floor(rand);
            pairs.push(ids[id]);
            ids.splice(id, 1);
        }

        for(let playerCnt = 0; playerCnt < n; playerCnt += 2) {
            const score = this.rootStore.playerStore.game(CLASS_LOADS[semesterCnt][classCnt], pairs[playerCnt], pairs[playerCnt+1]);
            scores.push({
                score,
                id: playerCnt
            })
        }

        scores.sort(compare);

        const scoresLength = scores.length;

        for(let scoreCnt = 0; scoreCnt !== scoresLength; scoreCnt++) {
            const percent = ((scoreCnt + 1) / scoresLength) * 100;
            const gpa = getProjectGPA(percent, scores[scoreCnt].score);
            this.rootStore.playerStore.giveGPA(gpa, pairs[scores[scoreCnt].id], pairs[scores[scoreCnt].id + 1]);
        }
    }
}