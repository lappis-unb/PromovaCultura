<template>
  <div class="container">
    <link href="../../static/jsmaps/jsmaps.css" rel="stylesheet" type="text/css" />
    <div class="row">
      <div class="col-sm-6">
        <brazil-map/>
      </div>
      <div class="col-sm-4">
        <div class="select-states">
          <h3>Selecione um estado</h3>
          <select name="brazil-states" class="form-control" v-model="selected" @change="selectDropdown(selected)">
              <option v-for="option in options" :value="option.value" :key="option.value">
                {{ option.text }}
              </option>
          </select>
        </div>
        <brazil-card style="margin-top: 10%" :titleCard="titleCard" :contentCard="content"/>
        <brazil-modal-card :titleCard="titleCard" :contentCard="content"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import BrazilCard from '@/components/BrazilCard'
import BrazilModalCard from '@/components/BrazilModalCard'
import BrazilMapComponent from '@/components/BrazilMapComponent'

export default {
  name: "BrazilMapRegion",
  data() {
    return {
      content: "Selecione um estado no mapa para saber a quantidade de projetos no mesmo.",
      titleCard: "Brasil",
      selected: "",
      listOfUfs: [],
      options: [
        { text: "Selecione um estado:", value: ''},
        { text: "Acre", value: 'AC'},
        { text: "Alagoas", value: 'AL'},
        { text: "Amapá", value: 'AP'},
        { text: "Amazonas", value: 'AM'},
        { text: "Bahia", value: 'BA'},
        { text: "Ceará", value: 'CE'},
        { text: "Distrito Federal", value: 'DF'},
        { text: "Espírito Santo", value: 'ES'},
        { text: "Goiás", value: 'GO'},
        { text: "Maranhão", value: 'MA'},
        { text: "Mato Grosso", value: 'MT'},
        { text: "Mato Grosso do Sul", value: 'MS'},
        { text: "Minas Gerais", value: 'MG'},
        { text: "Pará", value: 'PA'},
        { text: "Paraíba", value: 'PB'},
        { text: "Paraná", value: 'PR'},
        { text: "Pernambuco", value: 'PE'},
        { text: "Piauí", value: 'PI'},
        { text: "Rio de Janeiro", value: 'RJ'},
        { text: "Rio Grande do Norte", value: 'RN'},
        { text: "Rio Grande do Sul", value: 'RS'},
        { text: "Rondônia", value: 'RO'},
        { text: "Roraima", value: 'RR'},
        { text: "Santa Catarina", value: 'SC'},
        { text: "São Paulo", value: 'SP'},
        { text: "Sergipe", value: 'SE'},
        { text: "Tocantins", value: 'TO'}
      ]
    };
  },
  components: {
    'brazil-card': BrazilCard,
    'brazil-modal-card': BrazilModalCard,
    'brazil-map': BrazilMapComponent
  },
  methods: {
    selectDropdown(uf=this.selected, title=this.selected, isMapInteraction) {
      //$('#brazil-map').trigger('stateClick', uf)
      if(!isMapInteraction){
        $('#exampleModal').modal('show')
      }
      
      var result = listOfUfs[uf] == undefined ? 0 : listOfUfs[uf];
      console.log(uf)
      this.content = "Quantidade de projetos de " + result;
      this.titleCard = title
    }
  },
  mounted: function () {
    var self = this;
    $("#brazil-map").JSMaps({
      map: "brazil",
      stateClickAction: "none",
      onStateClick: function(data) {
        self.selectDropdown(data.abbreviation, data.name, true);
      },
      groups: [
          {
              enable: true,
              name: "Centro-Oeste",
              members: ["Goiás", "Distrito Federal", "Mato Grosso", "Mato Grosso do Sul"],
              color: "#f6d74a",
              hoverColor: "#74771A",
              text: "Beireleibe"
          },
          {
              enable: true,
              name: "Norte",
              members: ["Acre", "Amazonas", "Roraima", "Rondônia", "Amapá", "Pará", "Tocantins"],
              color: "#c4de4e",
              hoverColor: "#74771A",
              text: "Beireleibe"
          },
          {
              enable: true,
              name: "Sudeste",
              members: ["São Paulo", "Rio de Janeiro", "Espírito Santo", "Minas Gerais"],
              color: "#8bdc64",
              hoverColor: "#74771A",
              text: "Beireleibe"
          },
          {
              enable: true,
              name: "Sul",
              members: ["Rio Grande do Sul", "Santa Catarina", "Paraná" ],
              color: "#80d492",
              hoverColor: "#74771A",
              text: "Beireleibe"
          },
          {
              enable: true,
              name: "Nordeste",
              members: ["Maranhão", "Piauí", "Pernambuco", "Ceará", "Rio Grande do Norte", "Paraíba", "Alagoas", "Sergipe", "Bahia" ],
              color: "#e3ec54",
              hoverColor: "#74771A",
              text: "Beireleibe"
          }
      ]
    })
  }
};
var listOfUfs = [];

</script>

<style scoped>
    /* Custom, iPhone Retina */ 
    @media only screen and (min-width : 320px) {
        .box-mapa {
            display: none;
        }
    }

    /* Extra Small Devices, Phones */ 
    @media only screen and (min-width : 480px) {

    }


    /* Small Devices, Tablets */
    @media only screen and (min-width : 768px) {
        .box-mapa {
            display: block;
        }
        .select-states {
          display: none;
        }
    }

    /* Medium Devices, Desktops */
    @media only screen and (min-width : 992px) {
      .select-states {
          display: none;
      }
    }

    /* Large Devices, Wide Screens */
    @media only screen and (min-width : 1200px) {
      .select-states {
          display: none;
      }
    }

</style>
