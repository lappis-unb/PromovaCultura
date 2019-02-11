<template>
    <div >
        <h1 class="proponent-title">Captação de recurso por UF desde 1992</h1>
        <div class="sticky-top" style="overflow: hidden; background-color: white">
            <div class="legend-item">
                <load-placeholder
                id="placeholder5"
                contentId="legend-container"
                phStyle="mobileLegend"
                :isVisible="isLoading"
                />
                <div id="legend-container" :key=index v-for="(legend, index) in this.legends"
                     class="box-legend legend-color"
                     v-if="legend.max !== 0">
                    <div>
                        <span :style="'background:'+ legend.color">
                        </span>
                        <p style="margin-bottom: 0;"><a>< R$</a>{{legend.max | abbreviate}}</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="main-content">
            <div>
                <div class="row">
                    <div id="stateBtn" class="order-buttom offset-1 col-5 sticky" v-on:click="orderByName()">Estado</div>
                    <div id="valuesBtn" class="order-buttom col-6 sticky" v-on:click="orderByValues()"><span>Captação</span></div>
                </div>
            </div>
            <load-placeholder
                id="placeholder4"
                contentId="list-container"
                phStyle="mobileList"
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
                    <div class="col-6 state" v-if="getScreenSize() >= 400" >{{uf.name}}</div>
                    <div class="col-6 state" v-else>{{uf.sigla}}</div>

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
                        <div class="col-6">
                            <div class="uf-info">
                                {{uf.proponents}}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">Valor aprovado</div>
                        <div class="col-6">
                            <div class="uf-info">
                                {{parseFloat(uf.approvedAmount).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                                })}}
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-6">Valor captado</div>
                        <div class="col-6">
                            <div class="uf-info">
                                <span>
                                    {{parseFloat(uf.raisedAmount).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                    })}}
                                </span>
                            </div>
                        </div>
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
        <!--</ul>-->
    </div>
</template>

<script>
import uf from "@/util/ufs.js";
import $ from "jquery";
import LoadingOverlay from "gasparesganga-jquery-loading-overlay";
import LoadPlaceholder from "@/components/LoadPlaceholder";
import abbreviate from "number-abbreviate";
import mobileActions from "@/util/mobileMapActions.js";
import Helpers from "@/util/helpers.js";

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
      isLoading: true,
      screenSize: 0
    };
  },
  methods: {
    getLegends() {
      // console.log(this.data)
      // v/ar max = Helpers.getMaxByUF(this.data.raisedAmount)
      // console.log(max)
      var legends = Helpers.generateLegend(this.data.totals["raisedAmount"]);
      this.legends = legends;
      console.log(this.legends);
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
    getScreenSize() {
      return window.innerWidth
    },
    updateUfData(data) {
      var tmpUFs = [];
      console.log("Updating data");
      if (this.data.totals.proponents != 0) {
        this.isLoading = false;
        document.getElementById("stateBtn").classList.add('selectedButton');
      }
      for (uf in this.data.proponents) {
        const tmpUf = {
          name: uf == "  " ? "---" : this.ufs[uf],
          sigla: uf == "  " ? "---" : uf,
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
      document.getElementById("valuesBtn").classList.remove('selectedButton');
      document.getElementById("stateBtn").classList.add('selectedButton');
    },
    orderByValues() {
      this.ufsData = this.ufsData.sort(Helpers.compareRaisedAmount);
      document.getElementById("stateBtn").classList.remove('selectedButton');
      document.getElementById("valuesBtn").classList.add('selectedButton');
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
  margin-bottom: 60px;
}

#loading-placeholder {
  width: 100%;
  position: absolute;
  top: 30px;
  left: 0;
  height: 200px;
}

.box-legend {
  height: 65px;
  width: 20%;
  display: inline-block;
  margin-top: auto;
}

.box-legend p a {
  font-size: 12px;
  font-weight: normal;
}
.sticky {
  font-size: 20px;
  color: #808080;
}

.selectedButton {
  font-size: 20px;
  color: #3aa53a;
  text-decoration: underline;
}

.uf-info {
  text-align: right;
  padding-right: 20px;
}

.uf-info span {
  font-weight: bold;
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
  background-color: #e6e6e6;
  padding: 16px;
  margin: 4px 16px 0px;
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
  font-size: 21px;
  margin-bottom: 5px;
  font-weight: bold;
}

.footer-fixed {
  background-color: #ccc;
  border-radius: 0 0 10px 10px;
  padding: 10px 0;
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
  text-align: left;
  padding-left: 35px;
  margin: 0;
  max-width: 50%;
  flex: 50%;
}

.order-buttom span {
  padding-left: 40%;
}

.legend-item {
  margin-top: 20px;
}

.legend-item p {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
}

@media only screen and (max-width: 768px) {
  .order-buttom span {
    padding-left: 35%;
  }
}

@media only screen and (max-width: 576px) {
  .order-buttom span {
    padding-left: 0%;
  }

  .proponent-title {
    font-size: 17px;
  }
  .legend-item p {
    font-size: 11px;
  }

  .box-legend p a {
    font-size: 10px;
  }
}

.legend-item h3 {
  font-size: 18px;
  color: #888;
  font-size: 15px;
}

.legend-color span {
  text-align: center;
  background: #555555;
  display: block;
  width: 35px;
  height: 20px;
  border-radius: 15%;
  -webkit-border-radius: 15%;
  -moz-border-radius: 15%;
  margin: 0 auto 0 auto;
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
