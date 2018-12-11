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
import { batchFetch, simpleFetch } from "@/util/apiComunication.js";
import {fetchFlask} from "../../util/apiComunication";
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
      const proponents = await fetchFlask("proponent_count");
      this.data.proponents = proponents;
      var approvedAmounts = await fetchFlask("approved_amount")
      var raisedAmounts = await fetchFlask("raised_amount")

      const sumValues = obj => Object.values(obj).reduce((a, b) => a + b)

      this.data.approvedAmount = approvedAmounts
      this.data.raisedAmount = raisedAmounts
      this.data.totals["approvedAmount"] = sumValues(approvedAmounts)
      this.data.totals["raisedAmount"] = sumValues(raisedAmounts)
      this.data.totals["proponents"] = sumValues(proponents)
    }
  }
};
</script>
