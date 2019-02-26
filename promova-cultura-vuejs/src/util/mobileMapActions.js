import $ from 'jquery'
import mapActions from "@/util/mapActions.js"

function makeHeatList(ufs, legends) {
    if (ufs.length === 0) {
        console.log("Nothing to heat on mobile list.");
    } else {
        console.log("Painting heat colors")
        for (let i = 0; i<ufs.length; i++){
            let stateColor = mapActions.getColorBylegend(ufs[i].raisedAmount, legends);
            paintListItem(ufs[i].sigla, stateColor)
        }
    }
}

function paintListItem(listItem, color) {
    $("#" + listItem).css({ "border-color": color })
    $("#" + listItem + "-arrow").css({ "background-color": color })
}

export default {
    makeHeatList
}