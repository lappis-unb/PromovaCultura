<template>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <div class="slider-container" style="width: 520px; margin: auto;">
                    <div class="slider-title">
                    Projetos por Ano
                    </div>
                    <vue-slider ref="slider" id="custom-tootip" v-bind="slider_data" @drag-end="change_data(this)">
                        <template slot="label" slot-scope="{ label, active }">
                            <span :class="['custom-label', { active }]">
                                {{ label }}
                            </span>
                        </template>
                    </vue-slider>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="chart-container">
                    <div class="chart-content" id="chart">
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import $ from "jquery";
import vueSlider from "vue-slider-component";

export default {
    name: 'NestedPie',
    components: {
        vueSlider
    },
    data() {
        return {
            slider_data: {
                width: "auto",
                min: 2010,
                max: 2018,
                value: 2010,
                height: 4,
                dotSize: 14,
                interval: 1,
                piecewise: true,
                tooltipStyle: {
                    backgroundColor: "#49a0b7",
                    borderColor: "#49a0b7",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "600",
                    padding: "2px 5px 0px 5px"
                },
                tooltipDir: "top",
                sliderStyle: {
                    backgroundColor: "#49A0B7",
                    boxShadow: "none",
                    width: "18px",
                    height: "18px"
                },
                processStyle: {
                    backgroundColor: "#ccc"
                },
                piecewiseStyle: {
                    "backgroundColor": "#aaa",
                    "visibility": "visible",
                    "width": "4px",
                    "height": "4px",
                },
            },
        };
    },
    methods: {
        change_data(){
            actualYear = this.$refs.slider.getValue();
            this.update_data_vue();
        },
        insert_data_vue(){
            let segments_to_show = [];
            let max_projects = 0;
            let increment = 20;

            let others = {
                name: "Outros",
                value: 0,
                itemStyle: {
                    color: "hsl(238, 0%, 70%)"
                }
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
                    var s = 100 - (coefficient_of_degrade * count);
                    count++;
                    body["itemStyle"]["color"] = area_to_color[actual_area].split(',')[0] + ", " + s + "%, " + area_to_color[actual_area].split(',')[2];
            });


            if(others["value"] > 0){
                segments_to_show.push(others);
            }

            option.series[1].data = segments_to_show;
            myChart.setOption(option);
        },
        update_data_vue(){
            var vue_instance = this;

            $.get(`https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20total_por_segmento(ano_projeto%3A%20%22${String(actualYear).slice(2, 4)}%22)%0A%7D&`, function (segments_in_a_year) {
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

                vue_instance.insert_data_vue();
            });
        },
    },
    mounted: function () {
        window.actual_area = "Artes Cênicas";
        window.area_changed = false;
        window.actualYear = 2010;
        window.area_to_color = {};

        // Chart Configuration

        window.myChart = echarts.init(document.getElementById('chart'));

        window.option = {
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
                        { value: 100, name: 'Artes Cênicas', itemStyle:{ color: 'hsl(279,100%,70%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Audiovisual', itemStyle: { color: 'hsl(0,70%,60%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Música', itemStyle: { color: 'hsl(25,80%,65%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Artes Visuais', itemStyle: { color: 'hsl(57,100%,48%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Patrimônio Cultural', itemStyle: { color: 'hsl(90, 73%, 51%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Humanidades', itemStyle: { color: 'hsl(164, 73%, 51%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Artes Integradas', itemStyle: { color: 'hsl(205,73%,64%)', borderColor:"#FFFFFF", borderWidth:"5"}},
                        { value: 100, name: 'Museus e Memória', itemStyle: { color: 'hsl(238,73%,64%)', borderColor:"#FFFFFF", borderWidth:"5"}}
                    ]
                },
                {
                    name: 'Segmentos',
                    type: 'pie',
                    radius: ['52%', '76%'],
                    label: {
                        color: '#666',
                        fontSize:'14',
                    },
                    data: []
                }
            ]
        };

        $.each(option.series[0].data, function(i, v){
            area_to_color[v["name"]] = v["itemStyle"]["color"];
        });

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

        window.areas = {
            "Artes Cênicas": [],
            "Audiovisual": [],
            "Música": [],
            "Artes Visuais": [],
            "Patrimônio Cultural": [],
            "Humanidades": [],
            "Artes Integradas": [],
            "Museus e Memória": []
        }

        window.segments_per_year = {}

        // Initial data

        $.get("https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20areas%0A%7D&", function (segments) {
            $.each(segments.data.areas, function (area, value) {
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
                value: 0,
                itemStyle: {
                    color: "hsl(238, 0%, 70%)"
                }
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
                    var s = 100 - (coefficient_of_degrade * count);
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
            $.get(`https://salic.dev.lappis.rocks/graphiql?query=query%20%7B%0A%20%20total_por_segmento(ano_projeto%3A%20%22${String(actualYear).slice(2, 4)}%22)%0A%7D&`, function (segments_in_a_year) {
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
    }
};



</script>

<style>

.slider-title {
    text-align: center;
    height: 90px;
    color: #777;
    font-size: 35px;
}

.custom-label {
  position: absolute;
  bottom: 100%;
  left: 0;
  transform: translate(-50%, -12px);
  margin-left: 3px;
  color: #666;
  font-size: 15px;
}

.custom-label::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateY(5px);
  width: 2px;
  height: 5px;
  background-color: #49a0b7;
}

/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
    .chart-content {
        margin: auto;
        height: 70vh;
        width: 300px;
    }
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
    .chart-content {
        width: 400px;
    }
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
    .chart-content {
        width: 700px;
    }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
    .chart-content {
        width: 900px;
    }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
    .chart-content {
        width: 1100px;
    }
}

</style>
