<template>
    <section>
        <link rel="stylesheet" type="text/css" href="../../static/selectize/selectize.css" />
        <div class="card">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <label>Segmento cultural</label>
                    <select v-model="selected" v-on:input="makeAction(selected)" class="custom-select">
                        <option v-for="segmento in segmentos" :value="segmento" v-bind:key="segmento" v-on:change='makeAction(segmento)'>
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
    </section>
</template>

<script>
//<select id="select-state" multiple  class="demo-default">
import $ from "jquery"
import "selectize"

export default {
    name: 'ControlsFilterBrazilMap',
    data (){
        return {
            proponenteTextButton: '+ proponentes',
            incentivadoresTextButton: '+ incentivadores',
            selected: 'Todos os segmentos',
            v: false,
            listOfProponentes: [],
            listOfIncentivadores: [],
            proponentesIsActivated: true,
            incentivadoresIsActivated: true,
        }
    },
    watch: {
        months: function () {
            this.makeAction();
        }
    },
    methods: {
        changeValueProponente: function () { 
            console.log("Clicou aqui no proponente")
            if(this.proponentesIsActivated){
                fetch('http://api.salic.cultura.gov.br/v1/projetos/?limit=10')
                .then((res) => { return res.json() })
                .then((data) => { 
                    this.listOfProponentes = data
                    console.log(this.listOfProponentes)
                })
                this.proponentesIsActivated = false
                console.log("Ativou Proponente")
            }
            else {
                this.listOfProponentes = []
                console.log(this.listOfProponentes)
                this.proponentesIsActivated = true
                console.log("Desativou Proponente")
            }
        },
        changeValueIncentivadores: function () {
            console.log("Clicou aqui no incentivadores")
            if(this.incentivadoresIsActivated){
                fetch('http://api.salic.cultura.gov.br/v1/projetos/?limit=10')
                .then((res) => { return res.json() })
                .then((data) => { 
                    this.listOfIncentivadores = data
                    console.log(this.listOfIncentivadores)
                })
                this.incentivadoresIsActivated = false
                console.log("Ativou Incentivadores")
            }
            else {
                this.listOfIncentivadores = []
                console.log(this.listOfIncentivadores)
                this.incentivadoresIsActivated = true
                console.log("Desativou Incentivadores")
            }
        },
        makeAction: function (seg) {
            console.log(seg)
            console.log(this.selected)
        }
    },
    props: {
        segmentos: Array,
    },
    mounted: function() {
        $('#select-state').selectize({
            plugins: ['remove_button','drag_drop'],
            persist: false,
            create: true,
            render: {
                item: function(data, escape) {
                    return '<div>' + escape(data.text) + '</div>';
                }
            },
            onDelete: function(values) {
                return 0;
            }
        });
    }
}

console.log(this.segmentos)
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



/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  float:right;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input.default:checked + .slider {
  background-color: #6EFF26;
  -webkit-box-shadow: 1px 1px 5px 1px #6EFF26;
  box-shadow: 1px 1px 5px 1px #6EFF26;
}
input.primary:checked + .slider {
  background-color: #2196F3;
}
input.success:checked + .slider {
  background-color: #8bc34a;
}
input.info:checked + .slider {
  background-color: #3de0f5;
}
input.warning:checked + .slider {
  background-color: #FFC107;
}
input.danger:checked + .slider {
  background-color: #f44336;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
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
#desktop-filters{
    display: none;
}

  /* Custom, iPhone Retina */ 
  @media only screen and (min-width : 320px) {
      
  }

  /* Extra Small Devices, Phones */ 
  @media only screen and (min-width : 480px) {

  }

  /* Small Devices, Tablets */
  @media only screen and (min-width : 768px) {
    #desktop-filters{
        display: initial;
    }
  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width : 992px) {
  
  }

  /* Large Devices, Wide Screens */
  @media only screen and (min-width : 1200px) {
  
  }

</style>
