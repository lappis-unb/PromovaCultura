<template>
    <section>
        <button id='filter-proponentes' v-on:click='changeValueProponente()'>
            {{proponenteTextButton}}
        </button>
        <button id='filter-incentivadores'  v-on:click='changeValueIncentivadores()'>
            {{incentivadoresTextButton}}
        </button>
        <button v-for="segmento in segmentos" v-bind:key="segmento"  v-on:click='multipleButtons(v)'>{{segmento}}</button>
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

</style>
