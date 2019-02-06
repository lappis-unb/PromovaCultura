<template>
  <div>
    <h1 class="proponent-title">Captação de recurso por UF desde 1992</h1>
    <div class="sticky-top" style="overflow: hidden; background-color: white">
      <div class="legend-item">
        <h3 class="sticky">LEGENDA</h3>
        <div>
          <ul class="internal-displacement">
            <div :key="index" v-for="(legend, index) in this.legends">
              <li>
                <div>
                  <span :style="'background:'+ legend.color"></span>
                </div>
              </li>
              <li>R$ {{legend.max}}</li>
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div id="main-content">
      <div class="row">
        <div class="order-buttom offset-1 col-5 sticky" v-on:click="orderByName()">Estado</div>
        <div class="order-buttom col-6 sticky" v-on:click="orderByValues()">Captação</div>
      </div>
    </div>
    <load-placeholder
      id="placeholder4"
      phStyle="mobileList"
      contentId="list-container"
      :isVisible="isLoading"
    />
    <div id="list-container">
      <div :key="uf.sigla" v-for="(uf, index) in ufsData">
        <div
          v-if="uf !== '  '"
          :id="uf.sigla"
          class="row collapsibleState collapsed uf-item"
          data-toggle="collapse"
          :data-target="'#collapseStateContent' + index"
        >
          <div class="col-6 state">{{uf.name}}</div>
          <!-- <div class="col-6 state" v-else>Sem Estado</div> -->
          <div class="col-4 amount">
            <span>R$ {{uf.raisedAmount | abbreviate}}</span>
          </div>
          <div class="white-space-bar"></div>
          <div :id="uf.sigla+'-arrow'" class="col-2 arrow">
            <span class="icon-filter">
              <i class="fa" aria-hidden="true"></i>
            </span>
          </div>
        </div>

        <div :id="'collapseStateContent' + index" class="collapsibleStateContent collapse">
          <div class="row">
            <div class="col-6">Proponentes</div>
            <div class="col-6">{{uf.proponents}}</div>
          </div>
          <div class="row">
            <div class="col-6">Valor aprovado</div>
            <div class="col-6">
              {{parseFloat(uf.approvedAmount).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
              })}}
            </div>
          </div>
          <div class="row">
            <div class="col-6">Valor captado</div>
            <div class="col-6">
              {{parseFloat(uf.raisedAmount).toLocaleString("pt-BR", {
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
        <div class="total-text offset-1 col-2">Total</div>
        <span class="total-number col-9">R$ {{totalRaisedAmount}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import uf from "@/util/ufs.js";
import $ from "jquery";
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";
import abbreviate from "number-abbreviate";
import mobileActions from "@/util/mobileMapActions.js";
import Helpers from "@/util/helpers.js";
import LoadPlaceholder from "@/components/LoadPlaceholder";

export default {
  components: {
    "load-placeholder": LoadPlaceholder
  },
  props: {
    data: Object
  },
  filters: {
    abbreviate: function(value) {
      if (!value) return "";
      //value = value.toString();
      value = abbreviate(value, 1);
      value = value.replace(/\./g, ",");
      value = value.replace(/m/g, " mi");
      value = value.replace(/b/g, " bi");
      value = value.replace(/k/g, " mil");
      return value;
    }
  },
  watch: {
    data: {
      handler(data) {
        this.updateTotals();
        this.updateUfData(data);
        mobileActions.makeHeatList(
          this.ufsData,
          Helpers.generateLegend(this.data.totals["raisedAmount"])
        );
        this.getLegends();
      },
      deep: true
    }
  },
  data() {
    return {
      ufs: uf,
      ufsData: [],
      totalProponents: 0,
      totalapprovedAmount: 0,
      totalRaisedAmount: 0,
      legends: [],
      isLoading: true
    };
  },
  methods: {
    getLegends() {
      var legends = Helpers.generateLegend(this.data.totals["raisedAmount"]);
      this.legends = legends;
    },
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
    },
    updateUfData(data) {
      var tmpUFs = [];
      console.log("Updating data");

      if (this.data.totals.proponents != 0) {
        this.isLoading = false;
      }
      for (uf in this.data.proponents) {
        const tmpUf = {
          name: uf == "  " ? "---" : this.ufs[uf],
          sigla: uf == "  " ? "semEstado" : uf,
          proponents: this.data.proponents[uf],
          raisedAmount: this.data.raisedAmount[uf],
          approvedAmount: this.data.approvedAmount[uf]
        };
        tmpUFs.push(tmpUf);
      }
      this.ufsData = tmpUFs;
    },
    orderByName() {
      this.ufsData = this.ufsData.sort(Helpers.compareByName);
    },
    orderByValues() {
      this.ufsData = this.ufsData.sort(Helpers.compareRaisedAmount);
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
  font-size: 18px;
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
.order-buttom {
  cursor: pointer;
  text-align: center;
  margin: 0;
  max-width: 50%;
  flex: 50%;
}

.legend-item p {
  font-size: 14px;
  color: #888;
  font-style: italic;
}

.legend-item h3 {
  margin-bottom: 10px;
  font-size: 18px;
  padding-bottom: 5px;
}

.legend-item h3 span {
  color: #888;
  font-size: 15px;
}

.internal-displacement li:last-child {
  margin-bottom: 0;
}
.internal-displacement li {
  margin-bottom: 20px;
  display: inline;
}

.internal-displacement li * {
  vertical-align: middle;
}

.internal-displacement li span {
  background: #555555;
  display: inline-block;
  width: 35px;
  height: 20px;
  border-radius: 15%;
  -webkit-border-radius: 15%;
  -moz-border-radius: 15%;
  margin: -5px auto auto auto;
}

.internal-displacement li div {
  margin-right: 10px;
  display: inline-block;
  text-align: center;
  width: 40px;
}

.total-number {
  text-align: right;
  padding: 0 30px 0 0;
}

.total-text {
  text-align: left;
  padding: 0;
}
</style>
