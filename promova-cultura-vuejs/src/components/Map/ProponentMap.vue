<template>
  <div>
    <div class="d-none d-lg-block"> <!-- Shows in desktop Hides in mobile platform -->
      <map-page
        :proponentData="data"
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
        totals:{
          approvedAmount: 0,
          raisedAmount: 0,
          proponents: 0
        }
      }
    };
  },
  methods: {
    async fetchAllResources() {
      const sumValues = obj => Object.values(obj).reduce((a, b) => a + b)

      this.data.proponents = await fetchFlask("proponent_count");
      this.data.approvedAmount = await fetchFlask("approved_amount");
      this.data.raisedAmount = await fetchFlask("raised_amount");

      this.data.totals["approvedAmount"] = sumValues(this.data.approvedAmount)
      this.data.totals["raisedAmount"] = sumValues(this.data.raisedAmount)
      this.data.totals["proponents"] = sumValues(this.data.proponents)
    }
  }
};
</script>
