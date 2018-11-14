<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="card-number">
          <img src="../../../../static/svg-icons/proponente_verde.svg"
               class="card-icon"></img>
          - Quantidade de Proponentes
        </div>
        <div class="card-number">
          <img src="../../../../static/svg-icons/check_verde.svg"
               class="card-icon"></img>
          - Valor Aprovado
        </div>
        <div class="card-number">
          <img src="../../../../static/svg-icons/cifrao_verde.svg"
               class="card-icon"></img>
          - Valor Captado
        </div>
      </div>
    </div>
    <div class="card">
      <legend class="card-header">Total</legend>
      <div class="card-body">
        <div>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <a>Quantidade De Proponentes</a>
              {{totalProponents}}
            </li>
            <li class="list-group-item">
              <a>Valor Aprovado</a>
              {{totalApprovedValue}}
            </li>
            <li class="list-group-item">
              <a>Valor Captado</a>
              {{totalRaisedAmount}}
            </li>
          </ul>
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
    // computed: {
    //   totalApprovedValue: function () {
    //     return (this.data.totals["approvedValue"]) || 0
    //   },
    //   totalRaisedAmount: function () {
    //     return (this.data.totals["capturedValue"]) || 0
    //   }
    //
    // },
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
        totalApprovedValue: 0,
        totalRaisedAmount: 0,
      }
    },
    methods:{
      updateTotals(){
        this.totalProponents = this.data.totals["proponents"]
        console.log(this.totalApprovedValue )
        this.totalApprovedValue = (this.data.totals["approvedValue"]).toLocaleString('pt-BR', {
      minimumFractionDigits: 2})
        console.log(this.data )
        this.totalRaisedAmount = (this.data.totals["capturedValue"]).toLocaleString('pt-BR', {
      minimumFractionDigits: 2})
      }
    },
  }
</script>

<style scoped>

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
    /* border: 1px solid red;  */
  }

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 24px;
    float: right;
  }

  .switch input {
    display: none;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input.default:checked + .slider {
    background-color: #333;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }

  .input-position label:first-child {
    margin-right: 10px;
  }
</style>
