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

function getMapLegend(maxValue, percentList = [], colorList = [], isImage = false) {
    let legends = [];
    let percents =
        percentList.length == 0 ? [0, 0, 0.12, 1.4, 10.2, 20.3, 100] : percentList;
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

export default {
    getMapLegend
}