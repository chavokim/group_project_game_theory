export const getPoints = ({Reputation, SavedStamina, GPA, Reputations, SavedStaminas, GPAs}) => {
    return Math.round(getPoint(Reputation, Reputations) + getPoint(SavedStamina, SavedStaminas) + getPoint(GPA, GPAs) * 100) / 100;
}

const getPoint = (value, values) => {
    const z = (value - average(values)) / standardDeviation(values);
    return (z * 10 + 50);
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