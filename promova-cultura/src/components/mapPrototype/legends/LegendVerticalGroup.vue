<template>
    <div class="card">
        <legend class="card-header">Legendas</legend>
        <div class="card-body">
            <div class="card-content">
                <h3>Projetos</h3>    
                <base-legend :dataLegend="legends.heatMap" />
            </div>
            <div class="card-content">
                <h3>Proponentes</h3>    
                <base-legend :dataLegend="legends.proponentes" />
            </div>
            <div class="card-content">
                <h3>Incentivadores</h3>    
                <base-legend :dataLegend="legends.incentivadores" />
            </div>
        </div>
    </div>
</template>

<script>
import Legend from "@/components/mapPrototype/legends/Legend";
export default {
    props: {
        legends: Object,
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