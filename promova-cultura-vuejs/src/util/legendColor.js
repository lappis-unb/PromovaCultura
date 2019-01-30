getMaxByUF(data, type) {
  const ufList = Object.keys(data);

  if (this.useMaxWithRanking) {
    const max = ufList.reduce((currentMax, uf) => {
      if (data[uf] > currentMax) {
        return data[uf];
      } else {
        return currentMax;
      }
    }, 0);
    return max;
  } else {
    let max = 0;
    Object.keys(data).forEach(uf => {
      max += data[uf];
    });

    return max;
  }
},
generateLegends() {
  let imagesListP = [
    "@/../static/svg-icons/proponente_LVL_1.svg",
    "@/../static/svg-icons/proponente_LVL_2.svg",
    "@/../static/svg-icons/proponente_LVL_3.svg",
    "@/../static/svg-icons/proponente_LVL_4.svg",
    "@/../static/svg-icons/proponente_LVL_5.svg"
  ];
  let imagesListI = [
    "@/../static/svg-icons/Investidores_LVL_1.svg",
    "@/../static/svg-icons/Investidores_LVL_2.svg",
    "@/../static/svg-icons/Investidores_LVL_3.svg",
    "@/../static/svg-icons/Investidores_LVL_4.svg",
    "@/../static/svg-icons/Investidores_LVL_5.svg"
  ];
  this.legends.proponentes = this.getMapLegend(
    this.maxValues.proponentes,
    [0, 5, 10, 20, 100],
    imagesListP,
    true
  );
  this.legends.incentivadores = this.getMapLegend(
    this.maxValues.incentivadores,
    [0, 5, 10, 20, 100],
    imagesListI,
    true
  );
  this.legends.heatMap = this.getMapLegend(this.maxValues.projects);
},
getMapLegend(maxValue, percentList = [], colorList = [], isImage = false) {
  let legends = [];
  let percents =
    percentList.length == 0 ? [0, 0, 1, 5, 10, 20, 100] : percentList;
  let colors =
    colorList.length == 0
      ? [
          "#dadada",
          "#daf39d",
          "#b8e844",
          "#8db824",
          "#66861a",
          "#2c380e"
        ]
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
},
