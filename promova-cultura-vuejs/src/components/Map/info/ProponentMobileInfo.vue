<template>
  <div>
    <h1 class="proponent-title">Captação de recurso por UF desde 1992</h1>

    <div id="main-content">
      <div id="loading-placeholder">
      </div>
      <div class="sticky-top" style="overflow: hidden; background-color: white">
        <div class="row">
          <div class="offset-1 col-5 sticky">Estado</div>
          <div class="col-6 sticky">Captação</div>
        </div>
      </div>
      <div v-for="(uf, index) in Object.keys(this.data.proponents)">
        <div class="row collapsibleState collapsed uf-item" data-toggle="collapse" :data-target="'#collapseStateContent' + index">
          <div class="col-6 state" v-if="uf !== '  '">{{ufs[uf]}}</div>
          <div class="col-6 state" v-else>Sem Estado</div>
          <div class="col-4 amount">
            <span>R$ {{data.raisedAmount[uf] | abbreviate}}</span>
          </div>
          <div class="white-space-bar"></div>
          <div class="col-2 arrow">
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
            <div class="col-6">{{parseFloat(data.approvedAmount[uf]).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}}</div>
          </div>
          <div class="row">
            <div class="col-6">Valor captado</div>
            <div class="col-6">{{parseFloat(data.raisedAmount[uf]).toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL"
            })}}</div>
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
  import $ from "jquery";
  import LoadingOverlay from "gasparesganga-jquery-loading-overlay";
  import abbreviate from "number-abbreviate";

  export default {
    props: {
      data: Object,
    },
    filters: {
    abbreviate: function(value) {
      if (!value) return ''
      //value = value.toString();
      value = abbreviate(value, 1)
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
        },
        deep: true
      },
    },
    mounted() {
      $("#loading-placeholder").LoadingOverlay("show", {
        background: "rgba(255, 255, 255, 1)",
        image: "",
        fontawesome: "fa fa-circle-notch fa-spin",
        fontawesomeColor: "#565656",
        imageClass: "loading-animation"
      });
    },
    data() {
      return {
        ufs: uf,
        totalProponents: 0,
        totalapprovedAmount: 0,
        totalRaisedAmount: 0
      }
    },
    methods: {
      updateTotals() {
        this.totalProponents = this.data.totals["proponents"]
        this.totalapprovedAmount = (this.data.totals["approvedAmount"]).toLocaleString('pt-BR', {
          minimumFractionDigits: 2
        })
        this.totalRaisedAmount = (this.data.totals["raisedAmount"]).toLocaleString('pt-BR', {
          minimumFractionDigits: 2
        })
        $("#loading-placeholder").LoadingOverlay("hide");
        $(".uf-item").toggleClass("visible");
        $(".sticky-top").toggleClass("visible");
      }
    },
  }
</script>

<style scoped>
  H1 {
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

  .sticky-top, .uf-item {
    visibility: hidden;
  }

  .visible {
    visibility: visible;
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
    background-color: #CCC;
    position: relative;
    border-radius: 8px;
    margin: 8px;
    border-left: solid 8px #3aa53a;
  }

  .state, .amount {
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
    vertical-align: middle
  }

  .arrow span {
    margin: auto;
    position: relative;
  }

  .collapsibleStateContent {
    background-color: #CCC;
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
