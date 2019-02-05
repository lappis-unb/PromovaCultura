const proponentIcons = [
    "@/../static/svg-icons/proponente_LVL_1.svg",
    "@/../static/svg-icons/proponente_LVL_2.svg",
    "@/../static/svg-icons/proponente_LVL_3.svg",
    "@/../static/svg-icons/proponente_LVL_4.svg",
    "@/../static/svg-icons/proponente_LVL_5.svg"
];

const investorIcons = [
    "@/../static/svg-icons/Investidores_LVL_1.svg",
    "@/../static/svg-icons/Investidores_LVL_2.svg",
    "@/../static/svg-icons/Investidores_LVL_3.svg",
    "@/../static/svg-icons/Investidores_LVL_4.svg",
    "@/../static/svg-icons/Investidores_LVL_5.svg"
];

/**
 * Default intervals for numbers 
 * this defines the range like so: 0 - 0.12%, 0.121 - 1.4%, 1.41 - 10.12%... etc.
 * */
const defaultNumberIntervals = [0, 0, 0.12, 1.4, 10.2, 20.3, 100];

function getDefaultLegendColors() {
    return [
        "#dadada",
        "#75CC75",
        "#3AA53A",
        "#1F661F",
        "#1A3D1A",
        "#0B230B"
    ]
}

function generateLegend(maxValue, imageList = []) {
    if (imageList.length == 0)
        return getMapLegend(maxValue)
    else {
        const intervals = [0, 5, 10, 20, 100] // from 0-5%, 5.1-10%, etc...
        return getMapLegend(maxValue, intervals, imageList, true);
    }
}

function getMapLegend(maxValue, intervals = [], colorList = [], isImage = false) {
    let legends = [];

    let percents =
        intervals.length == 0 ? defaultNumberIntervals : intervals;
    let colors =
        colorList.length == 0
            ? getDefaultLegendColors()
            : colorList;


    let min = 0;
    let max = 0;
    for (let i = 0; i < percents.length - 1; i++) {
        let colorBackground = colors[i];

        min = max == 0 ? 0 : max + 1;
        max = parseInt((percents[i + 1] / 100) * maxValue);
        legends[i] = {
            image: isImage,
            color: colorBackground,
            min: max != 0 && min == 0 ? 1 : min,
            max: max
        };
    }
    return legends;
}

function compareRaisedAmount(stateA, stateB) {
    if (stateA.raisedAmount < stateB.raisedAmount)
        return -1;
    if (stateA.raisedAmount > stateB.raisedAmount)
        return 1;
    return 0;
}

function compareByName(stateA, stateB){
    const stateAName = stateA.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    const stateBName = stateB.name.normalize('NFD').replace(/[\u0300-\u036f]/g, "")
    if(stateAName < stateBName){
        return -1;
    }
    if(stateAName > stateBName){
        return 1;
    }
    return 0;
}

export default {
    generateLegend,
    proponentIcons,
    investorIcons,
    compareRaisedAmount,
    compareByName
}