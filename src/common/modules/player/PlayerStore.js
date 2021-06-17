import {makeAutoObservable} from "mobx";
import {PlayerModel, SelectType, StrategyType} from "./PlayerModel";
import {getProjectScore} from "../../utils/getProjectScore";
import {getPoints} from "../../utils/getPoint";

const compare = (a, b) => {
    if(a.point > b.point)
        return -1;
    if(b.point > a.point)
        return 1;
    return 0;
}

export default class PlayerStore {
    players = [];

    constructor(rootStore) {
        this.rootStore = rootStore;
        makeAutoObservable(this, {}, {autoBind: true});
        this.init();
    }

    init() {
        this.players = [];
        this.addPlayer({nickname: '장수민', i:5, f:3, s:2, strategyType: StrategyType.t4t, t4tCount: 1});
        this.addPlayer({nickname: 'ABCD', i:4, f:3, s:3, strategyType: StrategyType.t4t, t4tCount: 1});
        this.addPlayer({nickname: '황혜주', i:3, f:2, s:5, strategyType: StrategyType.stamina, staminaLimit: 10});
        this.addPlayer({nickname: '파인애플', i:7, f:0, s:3, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: '박경민', i:1, f:4, s:5, strategyType: StrategyType.t4t, t4tCount: 2});
        this.addPlayer({nickname: 'mamamama', i:5, f:0, s:5, strategyType: StrategyType.reputation, partnerReputation: 50});
        this.addPlayer({nickname: 'ㅎㅈㅎ', i:5, f:0, s:5, strategyType: StrategyType.stamina, staminaLimit: 40});
        this.addPlayer({nickname: '수타니', i:1, f:1, s:8, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: '제자', i:2, f:2, s:6, strategyType: StrategyType.t4t, t4tCount: 1});
        this.addPlayer({nickname: '정회훈', i:0, f:6, s:4, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: '마피', i:4, f:2, s:4, strategyType: StrategyType.reputation, partnerReputation: 60});
        this.addPlayer({nickname: '이렇게둘이', i:6, f:1, s:3, strategyType: StrategyType.stamina, staminaLimit: 20, projectLoad: 20});
        this.addPlayer({nickname: '박한빈', i:3, f:4, s:3, strategyType: StrategyType.t4t, t4tCount: 1});
        this.addPlayer({nickname: '님아', i:5, f:4, s:1, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: '안태혁', i:3, f:4, s:3, strategyType: StrategyType.t4t, t4tCount: 1});
        this.addPlayer({nickname: '기맣', i:1, f:1, s:8, strategyType: StrategyType.reputation, partnerReputation: 30});
        this.addPlayer({nickname: '이서호', i:10, f:0, s:0, strategyType: StrategyType.reputation, partnerReputation: 40});
        this.addPlayer({nickname: '날먹갑', i:10, f:0, s:0, strategyType: StrategyType.stamina, projectLoad: 10});
        this.addPlayer({nickname: '스테고', i:4, f:2, s:4, strategyType: StrategyType.stamina, staminaLimit: 15, projectLoad: 25});
        this.addPlayer({nickname: '미네랄워터', i:4, f:4, s:2, strategyType: StrategyType.reputation, partnerReputation: 50});
        this.addPlayer({nickname: '무뇨준', i:0, f:0, s:10, strategyType: StrategyType.same, initSelectType: SelectType.freeRide});
        this.addPlayer({nickname: '배완', i:0, f:0, s:10, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: '생크림초코', i:6, f:1, s:3, strategyType: StrategyType.reputation, partnerReputation: 70});
        this.addPlayer({nickname: '쏠문', i:5, f:3, s:2, strategyType: StrategyType.reputation, partnerReputation: 50});
        this.addPlayer({nickname: 'YY', i:4, f:2, s:4, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: '도우미', i:1, f:4, s:5, strategyType: StrategyType.same, initSelectType: SelectType.cooperation});
        this.addPlayer({nickname: 'gogo', i:5, f:0, s:5, strategyType: StrategyType.reputation, partnerReputation: 30});
        this.addPlayer({nickname: '쿠쿠쿠', i:5, f:1, s:4, strategyType: StrategyType.t4t, t4tCount: 1});
        this.addPlayer({nickname: '어드민1', i:3, f:3, s:4, strategyType: StrategyType.reputation, partnerReputation: 30});
        this.addPlayer({nickname: '어드민2', i:2, f:4, s:4, strategyType: StrategyType.t4t, t4tCount: 2});
    }

    addPlayer(data) {
        this.players.push(new PlayerModel(data));
    }

    game(load, l, r) {
        const lStu = this.players[l];
        const rStu = this.players[r];

        const lSel = this.players[l].playWith(load, r);
        const rSel = rStu.playWith(load, l);

        this.rootStore.gameStore.printLog(`${lStu.nickname}: ${lSel}, ${rStu.nickname}: ${rSel}\n`);

        if(lSel === SelectType.cooperation && rSel === SelectType.cooperation) {
            lStu.cooperate(load);
            rStu.cooperate(load);
            return getProjectScore(lStu, rStu);
        }

        if(lSel === SelectType.cooperation && rSel === SelectType.freeRide) {
            lStu.rejected(load);
            rStu.reject();
            return lStu.initIntelligence;
        }

        if(rSel === SelectType.cooperation && lSel === SelectType.freeRide) {
            rStu.rejected(load);
            lStu.reject();
            return rStu.initIntelligence;
        }

        return 0;
    }

    giveGPA(gpa, l, r) {
        const lStu = this.players[l];
        const rStu = this.players[r];
        lStu.addGPA(gpa);
        rStu.addGPA(gpa);
    }

    finishClass(){
        const Reputations = this.players.reduce((acc, curr) => [...acc, curr.Reputation], []);
        const SavedStaminas = this.players.reduce((acc, curr) => [...acc, curr.SavedStamina], []);
        const GPAs = this.players.reduce((acc, curr) => [...acc, curr.GPA], []);
        this.players.forEach((item)=>item.setPoint(getPoints({...item, Reputations, SavedStaminas, GPAs})));
        this.players.replace(this.players.sort(compare));
        console.log(this.players);
    }

    finishSemester(){
        this.players.forEach((item)=>item.finishSemester());
    }

    get playerGrid() {
        return this.players.reduce((acc, curr) => [...acc, curr.makeRow], [])
    }
}