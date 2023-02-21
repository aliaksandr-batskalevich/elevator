
export const initPeoplesOnFloors = (totalFloors: number, peoplesNum: number): Array<number> => {
    const getRandomNum = (maxValue: number) => {
        let result;
        while (result === undefined || result > maxValue || result > 20) {
            result = Math.floor(Math.random() * 100);
        }
        return result;
    };

    let array = [];
    let sum = 0;
    for (let i = 0; i < totalFloors; i++) {
        if (i === totalFloors - 1) {
            array.push(100 - sum);
        } else {
            let num = getRandomNum(100 - sum);
            sum += num;
            array.push(num);
        }
    }
    return array;
};