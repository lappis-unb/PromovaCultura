<template>
  <div>
    <div class="d-none d-lg-block"> <!-- Shows in desktop Hides in mobile platform -->
      <map-page
        :proponentMap=true
        :useMaxWithRanking=false
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
import { batchFetch, simpleFetch, fetchFlask } from "@/util/apiComunication.js";

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
        totals:{}
      }
    };
  },
  methods: {
    async fetchAllResources() {

      const raisedAmount = await fetchFlask("raised_amount");
      const all_data = await fetchFlask("proponent_complete");

      var proponentCount = {}
      var approvedAmount = {}

      for (var uf of Object.keys(all_data)) {
        proponentCount[uf] = all_data[uf]["Proponentes"];
        approvedAmount[uf] = all_data[uf]["Aprovado"]
      }

      const sumValues = obj => Object.values(obj).reduce((a, b) => a + b)
      this.data.proponents = proponentCount
      this.data.approvedAmount = approvedAmount
      this.data.raisedAmount = raisedAmount
      this.data.totals["approvedAmount"] = sumValues(approvedAmount)
      this.data.totals["raisedAmount"] = sumValues(raisedAmount)
      this.data.totals["proponents"] = sumValues(proponentCount)

    }
  }
};
</script>
