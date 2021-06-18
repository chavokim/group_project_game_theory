export const getPoints = ({Reputation, SavedStamina, GPA, Reputations, SavedStaminas, GPAs}) => {
    return {
        RepPoint: getPoint(Reputation, Reputations),
        StamPoint: getPoint(SavedStamina, SavedStaminas),
        GPAPoint: getPoint(GPA, GPAs)
    }
}

const getPoint = (value, values) => {
    const z = (value - average(values)) / standardDeviation(values);
    return (z * 20 + 100);
}

const standardDeviation = (values) => {
    const avg = average(values);

    const squareDiffs = values.map(function(value){
        const diff = value - avg;
        const sqrDiff = diff * diff;
        return sqrDiff;
    });

    const avgSquareDiff = average(squareDiffs);

    const stdDev = Math.sqrt(avgSquareDiff);
    return stdDev;
}

const average = (data) => {
    const sum = data.reduce(function(sum, value){
        return sum + value;
    }, 0);

    const avg = sum / data.length;
    return avg;
}