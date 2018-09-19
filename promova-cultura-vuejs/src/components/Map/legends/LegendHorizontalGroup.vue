<template>
    <div class="container">
        <div class="card">
            <legend class="card-header">Legendas</legend>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <div class="card-content">
                            <h3>Projetos</h3>
                            <base-legend :dataLegend="legends.heatMap" :typeOfData="'projetos'" :filtersActivate="filtersActivate"/>
                        </div>
                    </div>
                    <div class="col-md-4" v-if="filtersActivate.proponentes">
                        <div class="card-content">
                            <h3>Proponentes</h3>
                            <base-legend :dataLegend="legends.proponentes" :typeOfData="'proponentes'" :filtersActivate="filtersActivate" />
                        </div>
                    </div>
                    <div class="col-md-4" v-if="filtersActivate.incentivadores">
                        <div class="card-content">
                            <h3>Incentivadores</h3>
                            <base-legend :dataLegend="legends.incentivadores" :typeOfData="'incentivadores'" :filtersActivate="filtersActivate"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import Legend from "@/components/Map/legends/Legend";
export default {
    props: {
        legends: Object,
        filtersActivate: Object
    },
    components: {
        "base-legend": Legend,
    },
};
</script>

<style scoped>
    .card-header {
        font-size: 16px;
        font-weight: bold;
        text-transform: uppercase;
    }

    .card-content h3 {
        margin-bottom: 20px;
        font-size: 18px;
        display: block;
        border-bottom: 1px dotted #ddd;
        padding-bottom: 5px;
    }

    .card-content {
        margin-bottom: 30px;
    }
</style>
