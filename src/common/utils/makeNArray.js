export const makeNArray = (n) => {
    const ret = [];

    for(let i = 0; i < n; i++) {
        ret.push(i);
    }

    return ret;
}

export const makeSeed = (semesterCnt, classCnt, playerCnt) => {
    return playerCnt + classCnt * 10000 + semesterCnt * 100000000;
}