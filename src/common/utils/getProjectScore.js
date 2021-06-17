export const getProjectScore = (l, r) => {
    const sum = (l.initIntelligence + r.initIntelligence) / Math.min(l.initFriendship, r.initFriendship);
    const maxInt = Math.max(l.initIntelligence, r.initIntelligence);

    return Math.max(sum, maxInt);
}

export const getProjectGPA = (percent, score) => {
    if(score === 0){
        return 69;
    }
    if(percent < 10) {
        return 100;
    }
    if(percent < 20) {
        return 96;
    }
    if(percent < 30) {
        return 93;
    }
    if(percent < 43) {
        return 89;
    }
    if(percent < 56) {
        return 86;
    }
    if(percent < 70) {
        return 83;
    }
    if(percent < 80) {
        return 79;
    }
    if(percent < 90) {
        return 76;
    }
    return 73;
}