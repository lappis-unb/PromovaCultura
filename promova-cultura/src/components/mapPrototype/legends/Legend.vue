<template>
<div>
    <ul class="legend-list" v-if="dataLegend.length && dataLegend[dataLegend.length-1].max!=0 && dataLegend.length != 0">
        <li v-for="(data,index) in dataLegend" :key="data.color" v-if="data.max != 0 || index==0">
            <img class="legend-color" :src="data.color" v-if="dataLegend[0].image"/>
            <div class="legend-color" :style="'background:'+ data.color" v-else></div>
            <span v-if="data.min==data.max">{{data.max}}</span>
            <span v-else >{{data.min}} até {{data.max}}</span>
        </li>
    </ul>
    <ul class="legend-list" v-else>
        <li>
            <span>Não há {{ typeOfData }} neste segmento.</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        dataLegend: Array,
        typeOfData: String
    }
};
</script>

<style scoped>

    .legend-list {
        padding: 0;
        margin: 0;
    }
    
    .legend-list li {
        display: flex;
        margin-bottom: 10px;
    }

    .legend-list li:last-child {
        margin-bottom: 0;
    }

    .legend-list li span {
        vertical-align: bottom;
    }

    img.legend-color {
        width: 35px;
        height: 35px;
        margin-right: 10px;
    }

    div.legend-color {
        width: 20px;
        height: 20px;
        border-radius: 90%;
        margin-right: 10px;
    }

</style>
