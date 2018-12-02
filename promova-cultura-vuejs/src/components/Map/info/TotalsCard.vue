<template>
  <div class="align-card">
    <ul class="nav nav-tabs legend-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link" id="proponente-tab" role="tab">Valor Captado</a>
      </li>
    </ul>
    <div class="tab-content legend-content" id="myTabContent">
      <div class="tab-pane fade show active" id="projeto"
           aria-labelledby="projeto-tab" role="tabpanel">
        <div>
          <ul class="legend-list">
            <li v-for="(data) in legends.heatMap" :key="data.color"
                v-if="data.max != 0 || data.min!=0">
              <img class="legend-color" :src="data.color"
                   v-if="legends.heatMap[0].image"/>
              <div class="legend-color" :style="'background:'+ data.color"
                   v-else></div>
              <span v-if="data.min==data.max">{{data.max}}</span>
              <span v-else>{{data.min}} até {{data.max}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

      <div class="card">
        <legend class="card-header">TOTAL</legend>
        <div class="card-body">
          <div>
            <div class="list-group list-group-flush">
                <div class="bottom-line">
                  <p class="total-label">Quantidade de Proponentes</p>
                  <p class="total-value">{{totalProponents}}</p>
                </div>
                <div class="bottom-line">
                  <p class="total-label">Valor Aprovado</p>
                  <p class="total-value">R$ {{totalapprovedAmount}}</p>
                </div>
                <div>
                  <p class="total-label">Valor Captado</p>
                  <p class="total-value">R$ {{totalRaisedAmount}}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
  import Legend from "@/components/Map/legends/Legend";
  import $ from "jquery";
  import LoadingOverlay from "gasparesganga-jquery-loading-overlay";

  export default {
    components: {
      "base-legend": Legend
    },
    props: {
      data: Object,
      proponentMap: Boolean,
      legends: {},
      filtersActivate: Object
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
        totalProponents: 0,
        totalapprovedAmount: 0,
        totalRaisedAmount: 0,
      }
    },
    mounted() {
      $("#myTabContent").LoadingOverlay("show", {
          background: "rgba(255, 255, 255, 1)",
          image: "",
          fontawesome: "fa fa-circle-notch fa-spin",
          fontawesomeColor: "#565656"
      });

      $(".card-body").LoadingOverlay("show", {
          background: "rgba(255, 255, 255, 1)",
          image: "",
          fontawesome: "fa fa-circle-notch fa-spin",
          fontawesomeColor: "#565656"
      });
    },
    methods:{
      updateTotals(){
        this.totalProponents = this.data.totals["proponents"]
        this.totalapprovedAmount = (this.data.totals["approvedAmount"]).toLocaleString('pt-BR', {
          minimumFractionDigits: 2})
        this.totalRaisedAmount = (this.data.totals["raisedAmount"]).toLocaleString('pt-BR', {
          minimumFractionDigits: 2})
        $("#myTabContent").LoadingOverlay("hide")
        $(".card-body").LoadingOverlay("hide")
      }
    },
  }
</script>

<style scoped>
  .align-card {
    display: block;
    justify-content: center;
  }

  .align-card #myTabContent {
    margin: auto;
    width: 85%;
  }

  .align-card .nav-item {
    margin-left: 7.5%;
  }
  .total-label{
    text-align: center;
    margin: 0;
    font-size: 12px;
    color: #666;
  }
  .total-value{
    text-align: center;
    font-weight: bold;
    font-size: 14px;
    margin: 0;
    color: #4d4d4d;
  }
  .card-header{
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    color: #666;
  }
  .legend-tabs .nav-link {
    padding: 8px;
  }

  .legend-tabs {
    border-bottom: 0;
    padding-top: 5px;
  }

  .legend-tabs li {
    font-size: 16px;
  }

  .legend-tabs li a {
    color: #333;
  }

  .legend-content {
    padding: 20px;
    border: 1px solid #ddd;
  }

  .legend-list {
    padding: 0;
    margin: 0;
  }

  .legend-list li {
    display: flex;
    margin-bottom: 10px;
  }

  .legend-list li:last-child {
    margin-bottom: 0;
  }

  .legend-list li span {
    vertical-align: bottom;
  }

  .nav-item {
    border: 1px #ccc solid
  }

  img.legend-color {
    width: 35px;
    height: 35px;
    margin-right: 10px;
  }

  div.legend-color {
    width: 20px;
    height: 20px;
    border-radius: 90%;
    margin-right: 10px;
  }

  .list-group li {
    padding: auto 0;
  }

  .switch input {
    display: none;
  }

  .input-position label:first-child {
    margin-right: 10px;
  }

  .card {
    width: 85%;
    height: 225px;
    margin: 20px auto 0 auto;
  }

  .bottom-line {
    border-bottom: 1px solid #ddd;
    margin-bottom: 10px;
  }
</style>
