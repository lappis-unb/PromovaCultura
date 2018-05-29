<template>
    <section>
        <ul class="list-of-controls">
            <li class="item-list-control">
                <button type="button" class="btn btn-info btn-group-lg" id='filter-proponentes' v-on:click='changeValueProponente()'>
                    {{proponenteTextButton}}
                </button>
            </li>
            <li class="item-list-control">
                <button type="button" class="btn btn-warning btn-group-lg" id='filter-incentivadores'  v-on:click='changeValueIncentivadores()'>
                    {{incentivadoresTextButton}}
                </button>
            </li>
            <li class="item-list-control">
                <button type="button" class="btn btn-success btn-group-lg list-buttons" v-for="segmento in segmentos" v-bind:key="segmento" v-on:click='multipleButtons(v)'>
                    {{segmento}}
                </button>
            </li>
        </ul>
    </section>
</template>

<script>
export default {
    name: 'ControlsFilterBrazilMap',
    data (){
        return {
            proponenteTextButton: 'Mostrar proponentes',
            incentivadoresTextButton: 'Mostrar incentivadores',
            segmentos: [
                'Todos os segmentos dos projetos'
            ],
            v: false,
        }
    },
    methods: {
        changeValueProponente: function () { 
            if (this.proponenteTextButton === 'Omitir proponentes')
                this.proponenteTextButton = 'Mostrar proponentes'
            else {
                this.proponenteTextButton = 'Omitir proponentes'
            }
        },
        changeValueIncentivadores: function () { 
            if (this.incentivadoresTextButton === 'Omitir proponentes')
                this.incentivadoresTextButton = 'Mostrar proponentes'
            else {
                this.incentivadoresTextButton = 'Omitir proponentes'
            }
        },
        multipleButtons: function (v) {
            if (v){
                this.segmentos = [
                    'Música',
                    'Teatro',
                    'Audiovisual'
                ]
            } else {
                this.segmentos = [
                    'Todos os segmentos dos projetos'
                ]
                
            }
            this.v=!this.v;
        },
    }
}
</script>

<style>
ul {
    display: inline;
}
li {
    list-style: none;
}
.item-list-control {
    margin: 30px;
}
.list-buttons {
    margin: 5px;
}
</style>
