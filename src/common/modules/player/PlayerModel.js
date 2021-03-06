import {makeAutoObservable, set} from "mobx";

export const StrategyType = {
    same: 'All Same',
    t4t: 'T4T',
    reputation: 'Reputation',
    stamina: 'Stamina',
}

export const SelectType = {
    cooperation: '협동',
    freeRide: '프리라이딩'
}

export class PlayerModel {
    nickname = '';
    stamina = 50;
    strategyType = StrategyType.same;
    selectType = SelectType.cooperation;
    projectLoad = 100;
    staminaLimit = 0;
    rejectedCount = 0;
    count = 0;
    partnerReputation = 0;
    initIntelligence = 5;
    initFriendship = 1.8;
    initStamina = 50;
    initSelectType = SelectType.cooperation;
    t4tCount = 0;
    Reputation = 50;
    GPA = 0;
    totalGPA = 0;
    totalStamina = 0;
    SavedStamina = 0;
    point = 0;
    totalRejected = 0;

    constructor(data) {
        makeAutoObservable(this, {}, {autoBind: true});
        set(this, data);
        if(data.i + data.f + data.s !== 10){
            console.error(`${this.nickname}의 point 합이 10이 아닙니다!`)
        }
        this.initFriendship -= (0.1 * data.f);
        this.initIntelligence += data.i;
        this.initStamina += (10 * data.s);
        this.stamina = this.initStamina;
    }

    get makeRow() {
        return ([
            this.nickname,
            this.point,
            this.GPA,
            this.Reputation,
            this.SavedStamina,
            this.initIntelligence.toString(),
            this.initFriendship.toString(),
            this.initStamina.toString(),
            this.strategyType,
            this.makeStrategyStr,
            this.totalRejected
        ])
    }

    get makeStrategyStr() {
        if(this.strategyType === StrategyType.same) {
            return `항상 ${this.initSelectType}`;
        }
        if(this.strategyType === StrategyType.reputation) {
            return `평판 ${this.partnerReputation} 이상일 때만 협동`;
        }
        if(this.strategyType === StrategyType.stamina) {
            return `내 체력이 ${this.staminaLimit} 이상이고, 과제 로드가 ${this.projectLoad} 이하일 때 협동`;
        }
        if(this.strategyType === StrategyType.t4t) {
            return `프리라이딩 ${this.t4tCount}번 당할 때까지 협동하고, 그 이후는 프리라이딩.`;
        }

        return "오류! : 올바르지 않은 입력 양식입니다!";
    }

    playWith(load, partner) {
        if(this.stamina <= 0) {
            return SelectType.freeRide;
        }
        if(this.strategyType === StrategyType.same) {
            return this.initSelectType;
        }
        if(this.strategyType === StrategyType.reputation) {
            if(partner.Reputation >= this.partnerReputation){
                return SelectType.cooperation;
            }
            else
                return SelectType.freeRide;
        }
        if(this.strategyType === StrategyType.t4t) {
            if(this.rejectedCount === this.t4tCount){
                return SelectType.freeRide;
            } else {
                return SelectType.cooperation;
            }
        }
        if(this.strategyType === StrategyType.stamina) {
            if(load >= this.projectLoad || this.stamina <= this.staminaLimit)
                return SelectType.freeRide;
            else
                return SelectType.cooperation;
        }

        alert('playWith error!!');

        return SelectType.cooperation;
    }

    addReputation(n) {
        this.Reputation += n;
        if(this.Reputation > 100)
            this.Reputation = 100;
    }

    minusReputation(n) {
        this.Reputation -= n;
        if(this.Reputation < 0)
            this.Reputation = 0;
    }

    cooperate(load) {
        this.addReputation(5);
        this.stamina -= load/2;
    }

    rejected(load) {
        this.stamina -= load;
        this.addReputation(10);
        this.rejectedCount++;
        this.totalRejected++;
    }

    reject() {
        this.minusReputation(10);
        this.rejectedCount = 0;
    }

    addGPA(totalNumber, n) {
        this.totalGPA += n;
        this.GPA = Math.round((this.totalGPA / totalNumber) * 100) / 100;
    }

    setPoint(n) {
        this.point = n;
    }

    finishSemester(totalNumber) {
        if(this.stamina < 0)
            this.stamina = 0;
        this.totalStamina += Math.round((this.stamina / this.initStamina) * 10000) / 100;
        this.SavedStamina = Math.round((this.totalStamina / totalNumber) * 100) / 100;
        this.stamina = this.initStamina;
    }
}