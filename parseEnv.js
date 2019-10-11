module.exports = function parseEnv(content) {

    const linesArray = content.split('\n');
    newObj = {};

    for (line of linesArray) {
        const sortedLine = line.match(/^([\w]+)=(.+)/);
        if (sortedLine !== null) {
            const [key, value] = [sortedLine[1], sortedLine[2]];
            newObj[key] = value;
        }
    }
    return newObj;
}