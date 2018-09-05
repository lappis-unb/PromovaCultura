var actual_area = "Artes Cênicas";
var area_changed = false;
var actual_year = "15";

function update_area(area){
    if(area != actual_area){
        area_changed = true;
    }else{
        area_changed = false;
    }

    actual_area = area;

    update_data();
}

var areas = {
    "Artes Cênicas": [],
    "Audiovisual": [],
    "Música": [],
    "Artes Visuais": [],
    "Patrimônio Cultural": [],
    "Humanidades": [],
    "Artes Integradas": [],
    "Museus e Memória": []
}

var segments_per_year = {}

const data = {
    name: 'Artes Cênicas',
    color: '#D3D5D7',
    children:
        [
        ],
};

// Initialize sunburst

const myChart = Sunburst()
myChart.height(600);
myChart.width(600);
myChart.data(data)
    .size('size')
    .color('color')
    (document.getElementById('chart'));

// Initial data

$.get("https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20areas%0A%7D&", function (segments) {
    $.each(segments.data.areas, function (area, value){
        $.each(value, function(index, value){
            let segment = {
                name: value,
                color: "#D3D5D7",
                size: 0,
            };

            areas[area].push(segment);
        });
    });
}).then(function (){
    $.get(`https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20total_por_segmento(ano_projeto%3A%20%2215%22)%0A%7D&`, function(segments_in_a_year) {
        let segments = segments_in_a_year.data.total_por_segmento;
        $.each(areas[actual_area], function(index, body){
            if(segments[body["name"]] != undefined){
                body["size"] = segments[body["name"]];
            }
        });
    }).then(function () {
        insert_data();
        myChart.data(data);
    });
});


// Functions to update data


function insert_data() {
    data.children = areas[actual_area];
    myChart.data(data);
}


function update_data() {
    $.get(`https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20total_por_segmento(ano_projeto%3A%20%22${String(actual_year)}%22)%0A%7D&`, function(segments_in_a_year){
        let segments = segments_in_a_year.data.total_por_segmento;
        $.each(areas[actual_area], function (index, body) {
            if(segments[body["name"]] != undefined){
                body["size"] = segments[body["name"]];
            }else{
                body["size"] = 0;
            }
        });

    }).then(function (){
        if (area_changed) {
            data.children  = [];
        }

        data["name"] = actual_area;

        insert_data();
    });
}

//

$(function () {
    $("#slider-range").slider({
        range: false,
        min: 2010,
        max: 2018,
        values: [2015],
        slide: function (event, ui) {
            $("#amount").val(+ ui.values[0]);
        },
        stop: function (event, ui) {
            let min = String(ui.values[0]).slice(2, 4);
            actual_year = min;

            update_data();
        }
    });
    $("#amount").val("" + $("#slider-range").slider("values", 0));
});
