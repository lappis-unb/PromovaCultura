<template>
    <div class="container">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/rangeslider.js/2.3.2/rangeslider.css" />
        <div class="row">
            <div class="col-md-4 slider-goes-here">
                <div id="slider-range" style="height:250px;"></div>
                <output id="output"></output>
            </div>
            <div class="col-md-6">
                <canvas id="myChart" width="400" height="400"></canvas>            
            </div>
        </div>
    </div>    
</template>

<script>
import $ from "jquery"
import "../../static/funil/rangeslider.js"
import "../../static/funil/Chart.js"
import "../../static/funil/d3-funnel.js";
import "../../static/funil/chart.funnel.js";
import "../../static/funil/d3.v5.js"
import "../../static/funil/jquery-ui.js";
import "../../static/funil/jquery-1.12.4.js";
// https://jqueryui.com/slider/

$(function() {
    
window.weight = 50;
window.getWeight = () => (window.weight + Math.floor(Math.random() * 2));

var myCanvas = $("#myChart");
//var ctx = myCanvas[0].getContext("2d");

var projetos = 90 * window.getWeight();
var propostas = 70 * window.getWeight();
var captados = 50 * window.getWeight();
var executados = 30 * window.getWeight();
var data = {
    datasets: [{
    data: [propostas, projetos, captados, executados],
    backgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#34CE56"
    ],
    hoverBackgroundColor: [
        "#FF6384",
        "#36A2EB",
        "#FFCE56",
        "#34CE56"
    ],
    }],
    labels: [
    "Quantidade de projetos",
    "Quantidade de propostas",
    "Quantidade de captados",
    "Quantidade de executados"
    ]
};

window.chart_data = data;
//console.log(window.chart_data.datasets[0].data)
// var myChart = new Chart(ctx, {
//     type: 'funnel',
//     data: data,
//     options: {
//     responsive: true,
//     legend: {
//         position: 'right',
//     },
//     topWidth: 0,
//     // bottomWidth: 0,
//     sort: "desc",
//     }
// });
$(function() {
    $("#slider-range").slider({
        orientation: "vertical",
        range: true,
        min: 1,
        max: 10,
        values: [2, 4],
        slide: function(event, ui) {
        myFunction(parseInt(ui.values[0]), parseInt(ui.values[1]));
        }
    });
});
function addData(chart, data) {
    chart.data.datasets[0].data = data;
    chart.update();
}
function myFunction(min, max) {
    var val = [min, max] //gets the oninput value
    window.weight = (val.reduce((acc, curr) => acc + curr, 0))/(val.length);
    //console.log(window.weight)
    document.getElementById('output').innerHTML = val //displays this value to the html page
    document.getElementById('output').innerHTML = val; //displays this value to the html page
    projetos = 60 * window.getWeight();
    propostas = 40 * window.getWeight();
    captados = 30 * window.getWeight();
    executados = 20 * window.getWeight();
    data = [projetos, propostas, captados, executados];
    addData(myChart, data)
}    
});

export default {
    name: "Funil",
}
</script>

<style>
</style>



