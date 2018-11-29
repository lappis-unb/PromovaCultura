<template>
  <div class="container">
    <link href="../../static/jsmaps/jsmaps.css" rel="stylesheet" type="text/css" />
    <div class="row">
      <div class="col-sm-8">
        <brazil-map-component/>

        <div class="select-states">
          <h3>Selecione um estado</h3>

          <select name="brazil-states" class="form-control" v-model="selected" @change="selectDropdown(selected)">
              <option v-for="option in options" :value="option.value" :key="option.value">
                {{ option.text }}
              </option>
          </select>

          <brazil-modal-card :titleCard="titleCard" :contentCard="content"/>
        </div>
      </div>

      <div class="col-sm-4">
        <brazil-card :titleCard="titleCard" :contentCard="content"/>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import BrazilCard from "@/components/ActionMap/BrazilCard";
import BrazilModalCard from "@/components/ActionMap/BrazilModalCard";
import BrazilMapComponent from "@/components/ActionMap/BrazilMapComponent";

export default {
  name: "BrazilMap",
  data() {
    return {
      content:
        "Selecione um estado no mapa para saber a quantidade de projetos no mesmo.",
      titleCard: "Brasil",
      selected: "",
      listOfUfs: [],
      type_map: "brazil",
      options: [
        { text: "Selecione um estado:", value: "" },
        { text: "Acre", value: "AC" },
        { text: "Alagoas", value: "AL" },
        { text: "Amapá", value: "AP" },
        { text: "Amazonas", value: "AM" },
        { text: "Bahia", value: "BA" },
        { text: "Ceará", value: "CE" },
        { text: "Distrito Federal", value: "DF" },
        { text: "Espírito Santo", value: "ES" },
        { text: "Goiás", value: "GO" },
        { text: "Maranhão", value: "MA" },
        { text: "Mato Grosso", value: "MT" },
        { text: "Mato Grosso do Sul", value: "MS" },
        { text: "Minas Gerais", value: "MG" },
        { text: "Pará", value: "PA" },
        { text: "Paraíba", value: "PB" },
        { text: "Paraná", value: "PR" },
        { text: "Pernambuco", value: "PE" },
        { text: "Piauí", value: "PI" },
        { text: "Rio de Janeiro", value: "RJ" },
        { text: "Rio Grande do Norte", value: "RN" },
        { text: "Rio Grande do Sul", value: "RS" },
        { text: "Rondônia", value: "RO" },
        { text: "Roraima", value: "RR" },
        { text: "Santa Catarina", value: "SC" },
        { text: "São Paulo", value: "SP" },
        { text: "Sergipe", value: "SE" },
        { text: "Tocantins", value: "TO" }
      ]
    };
  },
  components: {
    "brazil-card": BrazilCard,
    "brazil-modal-card": BrazilModalCard,
    "brazil-map-component": BrazilMapComponent
  },
  methods: {
    selectDropdown(uf=this.selected, title=this.selected, isMapInteraction) {
      if (!isMapInteraction) {
        $("#informationModal").modal("show");
      }

      var result = listOfUfs[uf] == undefined ? 0 : listOfUfs[uf];
      this.titleCard = title;
      this.content = "Quantidade de projetos de " + result;
    }
  },
  mounted: function() {
    var self = this;
    // var url = window.location.hash;
    // var type_map = "brazil_region";
    // url = url.substring(2);

    $("#brazil-map-action").JSMaps({
      map: self.type_map,
      stateClickAction: "none",
      onStateClick: function(data) {
        self.selectDropdown(data.abbreviation, data.name, true);
      }
    });
  }
};

var listOfUfs = [];
// $.get("http://sali.dev.lappis.rocks/v1/projetos/?limit=100", function(data) {
//   var ufs = [];
//   var projetos = data._embedded.projetos;
//   for (var i = 0; i < projetos.length; i++) {
//     ufs.push(projetos[i].UF);
//   }
//   listOfUfs = _.countBy(ufs);
// });
</script>

<style scoped>
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .select-states {
    display: none;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .select-states {
    display: none;
  }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
  .select-states {
    display: none;
  }
}
</style>
