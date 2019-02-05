import $ from 'jquery'
import mapActions from "@/util/map-actions.js"
function makeHeatList(ufs, raisedAmounts, legends) {
    const localList = Object.keys(raisedAmounts);

    if (localList.length === 0) {
        console.log("AAAAAAAAAAAA Cel Vazio");
        return;
    }    
    for (let state in ufs) {
        let stateColor = mapActions.getColorBylegend(raisedAmounts[state], legends);
        //pintar state usando backgroundcolor da div do state
        console.log($("#"+state))

        $("#"+state).css({ "border-color": stateColor })
        $("#"+state + "-arrow").css({ "background-color": stateColor })
    }

}

export default {
    makeHeatList
}