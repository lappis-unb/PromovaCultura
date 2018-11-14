<template>
  <div>
    <div class="d-none d-lg-block"> <!-- Shows in desktop Hides in mobile platform -->
      <map-page
        :proponentMap=true
        :useMaxWithRanking=false
        :legendMobile="'tab'"
        :legendDesktop="'tab'"
        locationInfoShowOn="hover"
      />
    </div>
    <div class="d-lg-none"> <!-- Shows in mobile Hides in desktop platform -->
      <proponent-mobile-info
        :data="data"
      />
    </div>
  </div>

</template>
<script>
import MapPage from "@/pages/MapPage";
import ProponentMobileInfo from "@/components/Map/info/ProponentMobileInfo"
import { batchFetch, simpleFetch } from "@/util/apiComunication.js";
export default {
  components: {
    "map-page": MapPage,
    "proponent-mobile-info": ProponentMobileInfo
  },
  mounted() {
    this.fetchAllResources();
    document.title = "Mapa de Captação - Proponente";
  },
  data() {
    return {
      data: {
        proponents: {},
        raisedAmount: {},
        approvedAmount: {},
      }
    };
  },
  methods: {
    async fetchAllResources() {
      const proponents = await simpleFetch("proponentes_por_uf");
      this.data.proponents = proponents.data.proponentes_por_uf;
      var approvedValues = {}
      var raisedAmounts = {}
      for (var uf of Object.keys(proponents.data.proponentes_por_uf)) {
        if (uf === "  ")
          continue
        var query = `projetos(UF:"${uf}") {
                              valor_captado
                              valor_aprovado
                            }`;
        const projects = await simpleFetch(query);
        var valor_captado = projects.data.projetos.map(a => a.valor_captado);
        var valor_aprovado = projects.data.projetos.map(a => a.valor_aprovado);

        approvedValues[uf] = valor_aprovado.reduce((a, b) => a + b, 0)
        raisedAmounts[uf] = valor_captado.reduce((a, b) => a + b, 0)
      }

      this.data.approvedAmount = approvedValues
      console.log(approvedValues)
      this.data.raisedAmount = raisedAmounts
    }
  }
};
</script>
