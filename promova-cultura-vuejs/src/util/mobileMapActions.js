import $ from 'jquery'
import mapActions from "@/util/map-actions.js"

function makeHeatList(ufs, raisedAmounts, legends) {
    const localList = Object.keys(raisedAmounts);

    if (localList.length === 0) {
        console.log("Nothing to heat on mobile list.");
    } else {
        for (let state in ufs) {
            let stateColor = mapActions.getColorBylegend(raisedAmounts[state], legends);
            paintListItem(state, stateColor)
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