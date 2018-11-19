<template>
<div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item input-position">
            <label for="uf">
                <input type="radio" id="uf" value="UF" v-on:click="changeLevel('uf')" v-model="picked">
                UF
            </label>
            <label for="region">
                <input type="radio" id="region" value="Regiao" v-on:click="changeLevel('regiao')" v-model="picked">
                Região
            </label>
        </li>
        <li class="list-group-item">
            <label>Segmento cultural</label>
            <select v-model="selected" @change="updateSegment()" class="custom-select">
                <option v-for="segmento in segmentsList" :value="segmento" v-bind:key="segmento">
                    {{segmento}}
                </option>
            </select>
        </li>
        <li class="list-group-item">
            <span>Proponentes</span>
            <label class="switch ">
                <input type="checkbox" v-on:click="changeValueProponente()" class="default">
                <span class="slider round"></span>
            </label>
        </li>
        <li class="list-group-item">
            <span>Incentivadores</span>
            <label class="switch ">
                <input type="checkbox" v-on:click="changeValueIncentivadores()" class="default">
                <span class="slider round"></span>
            </label>
        </li>
    </ul>
</div>
</template>

<script>
    import segments from "@/util/segments";

    export default {
        data() {
            return{
                selected: "Todos os segmentos",
                segmentsList: segments,
                proponentesIsActivated: false,
                incentivadoresIsActivated: false,
                level: "UF",
                isLevelRegion: false,
                picked: "UF",
            }
        },
        methods: {
            updateSegment: function(){
                this.$emit('updatedSegment', this.selected)
            },
            changeValueProponente: function(){
                this.proponentesIsActivated = !this.proponentesIsActivated;
                this.$emit('showProponentes', this.proponentesIsActivated)
            },
            changeValueIncentivadores: function(){
                this.incentivadoresIsActivated = !this.incentivadoresIsActivated;
                this.$emit('showIncentivadores', this.incentivadoresIsActivated)
            },
            changeLevel: function(typeMap){
                if(typeMap==="uf"){
                    this.level = "UF";
                    this.isLevelRegion = false;                                    
                }else{
                    this.level = "Região";
                    this.isLevelRegion = true;                
                }
                this.$emit('changeLevel', this.level);
            }
        }
    };
</script>
<style scoped>
    .list-group li {
       padding: auto 0;
       /* border: 1px solid red;  */
    }    
    /* The switch - the box around the slider */
    .switch {
        position: relative;
        display: inline-block;
        width: 50px;
        height: 24px;
        float: right;
    }
    .switch input {
        display: none;
    }

    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #ccc;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    .slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }

    input.default:checked + .slider {
        background-color: #333;
    }

    input:checked + .slider:before {
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
    }

    /* Rounded sliders */
    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    .input-position label:first-child {
        margin-right: 10px;
    }
</style>
