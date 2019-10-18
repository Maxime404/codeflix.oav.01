module.exports = function parseIni(content) {
    const linesArray = content.split('\n');
    const finalObj = {};
    let groupOfObj = '';
    let arrayOfObj = [];

    for (line of linesArray) {
        const sortedLineOjb = line.match(/^([\[])([\w.]+)([\]])/);
        const sortedLineUndObj = line.match(/^([\w .]+)=([\w "=,-\/]+|(?!.))/);

        if (sortedLineOjb !== null) {
            if (arrayOfObj.length > 0) {
                finalObj[groupOfObj] = arrayOfObj;
                arrayOfObj = [];
            }
            groupOfObj = sortedLineOjb[2].toString().replace(/[^a-zA-Z.]/g, "");
            finalObj[groupOfObj] = [];

        } else if (sortedLineUndObj !== null) {
            const [key, value] = [sortedLineUndObj[1].trim(), sortedLineUndObj[2].replace(/^[\s "]+|[\s "]+$/g, "")];
            const newObj = {};

            newObj[key] = value;
            arrayOfObj.push(newObj)
        }
    }

    return finalObj;
}