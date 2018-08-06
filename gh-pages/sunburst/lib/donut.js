var actual_area = "Artes Cênicas";
var area_changed = false;
var actual_year = "15";
var area_to_color = {};

// Chart Configuration

var myChart = echarts.init(document.getElementById('chart'));

option = {
    tooltip: {
        trigger: 'item',
        formatter: "{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        y: 'bottom',
        data: ['Artes Cênicas', 'Audiovisual', 'Música', 'Artes Visuais', 'Patrimônio Cultural', 'Humanidades', 'Artes Integradas', 'Museus e Memória']
    },
    series: [
        {
            type: 'pie',
            selectedMode: 'single',
            radius: [0, '40%'],
            label: {
                show: false,
            },
            data: [
                { value: 100, name: 'Artes Cênicas', itemStyle:{ color: 'hsl(279,100%,80%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Audiovisual', itemStyle: { color: 'hsl(0,100%,86%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Música', itemStyle: { color: 'hsl(25,100%,89%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Artes Visuais', itemStyle: { color: 'hsl(76,100%,90%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Patrimônio Cultural', itemStyle: { color: 'hsl(96,100%,90%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Humanidades', itemStyle: { color: 'hsl(118,100%,82%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Artes Integradas', itemStyle: { color: 'hsl(197,100%,84%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                { value: 100, name: 'Museus e Memória', itemStyle: { color: 'hsl(224,100%,75%)', borderColor:"#FFFFFF", borderWidth:"5"}}
            ]
        },
        {
            name: 'Segmentos',
            type: 'pie',
            radius: ['52%', '76%'],
            label: {
                color: '#000000'
            },
            labelLine: {
                lineStyle: {
                    color: '#000000'
                }
            },
            data: []
        }
    ]
};

$.each(option.series[0].data, function(i, v){
    area_to_color[v["name"]] = v["itemStyle"]["color"];
});

console.log(area_to_color);

myChart.on('click', function(e){
    if(!e.seriesIndex){
        actual_area = e.data["name"];
        update_area(e.data["name"]);
    }
});

myChart.on('mousemove', function(params){
    if(params.seriesIndex === 1)
        myChart.getZr().setCursorStyle('default');
});

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

// Initial data

$.get("https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20areas%0A%7D&", function (segments) {
    $.each(segments.data.areas, function (area, value) {
        // let color = '#000000';
        let count=0;
        let increment=0.05;

        $.each(value, function (index, value) {
            let alpha = (1-(increment*count))

            let segment = {
                name: value,
                value: 0,
                itemStyle:{
                    borderColor:"#FFFFFF",
                    borderWidth:"5",
                }
            };
            // count++;
            areas[area].push(segment);
        });
    });
}).then(function () {
    $.get(`https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20total_por_segmento(ano_projeto%3A%20%2215%22)%0A%7D&`, function (segments_in_a_year) {
        let segments = segments_in_a_year.data.total_por_segmento;
        $.each(areas[actual_area], function (index, body) {
            if (segments[body["name"]] != undefined) {
                body["value"] = segments[body["name"]];
            }
        });
    }).then(function () {
        $.get("https://salic.dev.lappis.rocks/graphiql?query=query{total_por_area}", function (areas) {
            $.each(areas.data.total_por_area, function (area, value) {
                $.each(option.series[0]["data"], function(k, v){
                    v["value"] = areas.data.total_por_area[v["name"]];
                });
            });
        }).then(function() {
            insert_data();
        });

    });
});


// // Functions to update data

function update_area(area) {
    if (area != actual_area) {
        area_changed = true;
    } else {
        area_changed = false;
    }

    actual_area = area;
    update_data();
}


function insert_data() {
    let segments_to_show = [];
    let max_projects = 0;
    let increment = 20;

    let others = {
        name: "Outros",
        value: 0
    }

    $.each(areas[actual_area], function(index, body) {
        max_projects += body["value"];
    });

    $.each(areas[actual_area], function (index, body) {
        let percentage = body["value"] / max_projects;

        if(percentage > 0.01){
            segments_to_show.push(body);
        }else{
            others["value"] += body["value"];
        }
    });

    let coefficient_of_degrade = 100/segments_to_show.length;
    let count = 0;

    $.each(segments_to_show, function (index, body) {
            s = 100 - (coefficient_of_degrade * count);
            count++;
            body["itemStyle"]["color"] = area_to_color[actual_area].split(',')[0] + ", " + s + "%, " + area_to_color[actual_area].split(',')[2];
    });


    if(others["value"] > 0){
        segments_to_show.push(others);
    }

    option.series[1].data = segments_to_show;
    myChart.setOption(option);

}


function update_data() {
    $.get(`https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20total_por_segmento(ano_projeto%3A%20%22${String(actual_year)}%22)%0A%7D&`, function (segments_in_a_year) {
        let segments = segments_in_a_year.data.total_por_segmento;

        $.each(areas[actual_area], function (index, body) {
            if (segments[body["name"]] != undefined) {
                body["value"] = segments[body["name"]];
            } else {
                body["value"] = 0;
            }
        });

    }).then(function () {
        if (area_changed) {
            option.series[1].data = [];
        }

        insert_data();
    });
}



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
