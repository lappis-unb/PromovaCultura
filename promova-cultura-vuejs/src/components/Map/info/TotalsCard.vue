<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="card-number">
          <img src="../../../static/svg-icons/proponente_verde.svg"
               class="card-icon"></img>
          - Quantidade de Proponentes
        </div>
        <div class="card-number">
          <img src="../../../static/svg-icons/check_verde.svg"
               class="card-icon"></img>
          - Valor Aprovado
        </div>
        <div class="card-number">
          <img src="../../../static/svg-icons/cifrao_verde.svg"
               class="card-icon"></img>
          - Valor Captado
        </div>
      </div>
    </div>
    <div class="card">
      <legend class="card-header">Total</legend>
      <div class="card-body">
        <div>
          <div class="list-group list-group-flush">
            <div>
              <p class="total-label">Quantidade de Proponentes</p>
              <p class="total-value">{{totalProponents}}</p>
            </div>
            <div>
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

    <ul class="nav nav-tabs legend-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link" id="proponente-tab" role="tab">Proponentes</a>
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
  </div>
</template>

<script>
  import Legend from "@/components/Map/legends/Legend";

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
    methods:{
      updateTotals(){
        this.totalProponents = this.data.totals["proponents"]
        this.totalapprovedAmount = (this.data.totals["approvedAmount"]).toLocaleString('pt-BR', {
      minimumFractionDigits: 2})
        this.totalRaisedAmount = (this.data.totals["raisedAmount"]).toLocaleString('pt-BR', {
      minimumFractionDigits: 2})
      }
    },
  }
</script>

<style scoped>
  .total-label{
    text-align: center;
  }
  .total-value{
    text-align: center;
    font-weight: bold;
    font-size: 26px;
  }
  .card-header{
    text-align: center;
    font-size: 28px;
    font-weight: bold;
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
</style>
