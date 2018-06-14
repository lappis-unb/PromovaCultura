<template>
<div>
    <ul class="legend-list" v-if="dataLegend.length && dataLegend[0].image">
        <li v-for="data in dataLegend" :key="data.color">
            <img class="legend-color" :src="data.color"/>
            <span>{{data.min}} até {{data.max}}</span>
        </li>
    </ul>
    <ul class="legend-list" v-else>
        <li v-for="data in dataLegend" :key="data.color">
            <div class="legend-color" :style="'background:'+ data.color"></div>
            <span>{{data.min}} até {{data.max}}</span>
        </li>
    </ul>
</div>
</template>

<script>
export default {
    props: {
        dataLegend: Array
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
