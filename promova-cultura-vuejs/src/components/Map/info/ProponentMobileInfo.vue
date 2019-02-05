<template>
  <div>
    <h1 class="proponent-title">Captação de recurso por UF desde 1992</h1>

    <div id="main-content">
      <div id="loading-placeholder"></div>
      <div class="sticky-top" style="overflow: hidden; background-color: white">
        <div class="row">
          <div class="offset-1 col-5 sticky">Estado</div>
          <div class="col-6 sticky">Captação</div>
        </div>
      </div>
      <div v-for="(uf, index) in Object.keys(this.data.proponents)">
        <div
          v-if="uf !== '  '"
          :id="uf"
          class="row collapsibleState collapsed uf-item"
          data-toggle="collapse"
          :data-target="'#collapseStateContent' + index"
        >
          <div class="col-6 state">{{ufs[uf]}}</div>
          <!-- <div class="col-6 state" v-else>Sem Estado</div> -->
          <div class="col-4 amount">
            <span
              v-if="data.raisedAmount[uf] < 1000000000 && data.raisedAmount[uf] >= 1000000"
            >R$ {{parseFloat((data.raisedAmount[uf]/1000000)).toFixed(1)}} mi</span>
            <span
              v-else-if="(data.raisedAmount[uf] >= 1000000000)"
            >R$ {{parseFloat((data.raisedAmount[uf]/1000000000).toFixed(1)).toLocaleString("pt-BR")}} bi</span>
            <span v-else>R$ {{parseFloat(data.raisedAmount[uf]).toLocaleString("pt-BR")}}</span>
          </div>
          <div class="white-space-bar"></div>
          <div :id="uf+'-arrow'" class="col-2 arrow">
            <span class="icon-filter">
              <i class="fa" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div :id="'collapseStateContent' + index" class="collapsibleStateContent collapse">
          <div class="row">
            <div class="col-6">Proponentes</div>
            <div class="col-6">{{data.proponents[uf]}}</div>
          </div>
          <div class="row">
            <div class="col-6">Valor aprovado</div>
            <div class="col-6">
              {{parseFloat(data.approvedAmount[uf]).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
              })}}
            </div>
          </div>
          <div class="row">
            <div class="col-6">Valor captado</div>
            <div class="col-6">
              {{parseFloat(data.raisedAmount[uf]).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
              })}}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-fixed">
      <div class="row sticky-total">
        <div class="offset-1 col-5">Total</div>
        <span class="col-6">R$ {{totalRaisedAmount}}</span>
      </div>
    </div>
    <!--</ul>-->
  </div>
</template>

<script>
import uf from "@/util/ufs.js";
import mobileActions from "@/util/mobileMapActions.js";
import $ from "jquery";
import Helpers from "@/util/helpers.js"
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";

export default {
  props: {
    data: Object
  },
  watch: {
    data: {
      handler(data) {
        this.updateTotals();
      },
      deep: true
    }
  },
  data() {
    return {
      ufs: uf,
      totalProponents: 0,
      totalapprovedAmount: 0,
      totalRaisedAmount: 0
    };
  },
  methods: {
    updateTotals() {
      this.totalProponents = this.data.totals["proponents"];
      this.totalapprovedAmount = this.data.totals[
        "approvedAmount"
      ].toLocaleString("pt-BR", {
        minimumFractionDigits: 2
      });
      this.totalRaisedAmount = this.data.totals["raisedAmount"].toLocaleString(
        "pt-BR",
        {
          minimumFractionDigits: 2
        }
      );

      mobileActions.makeHeatList(
        this.ufs,
        this.data.raisedAmount,
        Helpers.getMapLegend(this.data.totals["raisedAmount"])
      );
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}

#main-content {
  position: relative;
  width: 100%;
  margin-bottom: 38px;
}

#loading-placeholder {
  width: 100%;
  position: absolute;
  top: 30px;
  left: 0;
  height: 200px;
}
.sticky {
  font-size: 20px;
  color: #808080;
}

.fa {
  font-size: 30px;
  width: 50%;
  margin: auto;
}

.collapsibleState {
  background-color: #ccc;
  position: relative;
  border-radius: 8px;
  margin: 8px;
  border-left: solid 8px #ffffff;
}

.state,
.amount {
  padding: 12px 8px;
  background-color: #e6e6e6;
}

.state {
  font-weight: bold;
}

.amount {
  text-align: right;
}

.arrow {
  position: absolute;
  background-color: #3aa53a;
  height: 100%;
  top: 0;
  padding: 0 0 0 5px;
  right: 0;
  width: 50%;
  margin: auto;
  border-radius: 0 8px 8px 0;
  color: #eee;
  text-align: center;
  line-height: 60px;
  vertical-align: middle;
}

.arrow span {
  margin: auto;
  position: relative;
}

.collapsibleStateContent {
  background-color: #ccc;
  padding: 16px;
  margin: 4px 16px 16px;
  border-radius: 8px;
}

[data-toggle="collapse"] .fa:before {
  content: "\f078";
}

[data-toggle="collapse"].collapsed .fa:before {
  content: "\f054";
  padding: 0;
}

.proponent-title {
  font-size: 28px;
  margin-bottom: 30px;
  font-weight: bold;
}

.footer-fixed {
  background-color: #ccc;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 2;
}

.sticky-total {
  color: #333;
  font-size: 20px;
}

.sticky-total span {
  font-weight: bold;
}

.white-space-bar {
  width: 5px;
  background-color: white;
  z-index: 1;
}
</style>
