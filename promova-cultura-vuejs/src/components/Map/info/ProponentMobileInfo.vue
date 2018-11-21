<template>
  <div>
    <h1 class="proponent-title">Captação de recurso por UF desde 1992</h1>
    <div class="sticky-top" style="background-color: white">
      <div class="row">
        <div class="offset-1 col-5 sticky">Estado</div>
        <div class="col-6 sticky">Captação</div>
      </div>
    </div>

    <div v-for="(uf, index) in Object.keys(this.data.proponents)">
      <div class="row collapsibleState collapsed" data-toggle="collapse" :data-target="'#collapseStateContent' + index">
        <div class="col-7 state" v-if="uf !== '  '">{{ufs[uf]}}</div>
        <div class="col-7 state" v-else>Sem Estado</div>
        <div class="col-3 amount">{{data.raisedAmount[uf]}}</div>
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
          <div class="col-6">{{data.approvedAmount[uf]}}</div>
        </div>
        <div class="row">
          <div class="col-6">Valor captado</div>
          <div class="col-6">{{data.raisedAmount[uf]}}</div>
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

  export default {
    props: {
      data: Object,
    },
    watch: {
      data: {
        handler(data) {
          this.updateTotals();
        },
        deep: true
      },
    },
    data() {
      return {
        ufs: uf,
        totalProponents: 0,
        totalapprovedAmount: 0,
        totalRaisedAmount: 0,
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
      }
    },
  }
</script>

<style scoped>
  H1 {
    text-align: center;

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
    border-left: solid 8px #EF6B29;
  }

  .state, .amount {
    padding: 12px 8px;
  }

  .state {
    font-weight: bold;
  }

  .amount {
    text-align: right;
  }

  .arrow {
    position: absolute;
    background-color: #EF6B29;
    height: 100%;
    top: 0;
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
  }

  .proponent-title {
    font-size: 28px;
    margin-bottom: 30px;
    font-weight: bold;

  }

  .footer-fixed {
    background-color: #ddd;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    padding-bottom: 10px;
  }

  .sticky-total {
    color: #333;
    font-size: 20px;
  }

  .sticky-total span {
    font-weight: bold;
  }
</style>
