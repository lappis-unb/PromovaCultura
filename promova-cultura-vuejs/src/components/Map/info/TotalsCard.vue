<template>
  <div class="align-card">
    <div class="card">
      <legend class="card-header">LEGENDA</legend>
      <load-placeholder
        id="placeholder1"
        phStyle="legend"
        contentId="card-legend"
        :isVisible="isLoading"/>

      <div id="card-legend" class="card-body">
        <ul class="legend-list">
          <li v-for="(data) in this.legendValues" :key="data.color"
              v-if="data.max != 0 || data.min!=0">
            <img class="legend-color" :src="data.color"
                 v-if="legends.heatMap[0].image"/>
            <div class="legend-color" :style="'background:'+ data.color"
                 v-else></div>
            <span v-if="data.min==data.max">{{data.max}}</span>
            <span v-else>até R$ {{data.max | abbreviate}}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="card">
      <legend class="card-header">TOTAIS</legend>
      <load-placeholder
        id="placeholder2"
        phStyle="number"
        contentId="card-totals"
        :isVisible="isLoading"
      />
      <div id="card-totals" class="card-body">
        <div>
          <div class="list-group list-group-flush">
            <div class="bottom-line">
              <p class="total-label">Proponentes</p>
              <p class="total-value">{{totalProponents}}</p>
            </div>
            <div class="bottom-line">
              <p class="total-label">Valor Aprovado</p>
              <p class="total-value">{{totalApprovedAmount}}</p>
            </div>
            <div>
              <p class="total-label">Valor Captado</p>
              <p class="total-value">{{totalRaisedAmount}}</p>
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
  import abbreviate from "number-abbreviate";
  import LoadPlaceholder from "@/components/LoadPlaceholder";


  export default {
    components: {
      "base-legend": Legend,
      "load-placeholder": LoadPlaceholder
    },
    props: {
      data: Object,
      proponentMap: Boolean,
      legends: {},
      filtersActivate: Object
    },
    filters:{
      abbreviate: function(value){
        // if (!value) return ''
        value = value.toString()
        value = value.replace(/\./g, ",")
        value = value.replace(/m/g, " mi")
        value = value.replace(/b/g, " bi")

        return value
      }
    },
    watch: {
      data: {
        handler(data) {
          this.updateTotals();
          this.abbreviateLegendValues();
        },
        deep: true
      },
    },
    data() {
      return {
        totalProponents: 0,
        totalApprovedAmount: 0,
        totalRaisedAmount: 0,
        legendValues: [],
        isLoading: true
      }
    },
    mounted() {
      document.getElementById("export-csv").classList.add('disabled');
    },
    methods: {
      abbreviateLegendValues(){
        for(const legend of this.legends.heatMap) {
          this.legendValues.push({
            min: abbreviate(legend.min ,1),
            max: abbreviate(legend.max ,1),
            color: legend.color,
            image: legend.image,
          })
        }
      },
      updateTotals() {
        this.totalProponents = this.data.totals.proponents;
        this.totalApprovedAmount = this.data.totals.approvedAmount.toLocaleString(
          "pt-BR",
          {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol"
          }
        );
        this.totalRaisedAmount = this.data.totals.raisedAmount.toLocaleString(
          "pt-BR",
          {
            minimumFractionDigits: 2,
            style: "currency",
            currency: "BRL",
            currencyDisplay: "symbol"
          }
        );

        if (this.data.totals.proponents != 0) {
          this.isLoading = false;
          document.getElementById("export-csv").classList.remove('btn-secondary');
          document.getElementById("export-csv").classList.remove('disabled');
          document.getElementById("export-csv").classList.add('btn-success');
        }
      }
    }
  };
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
.total-label {
  text-align: center;
  margin: 0;
  font-size: 12px;
  color: #666;
}
.total-value {
  text-align: center;
  font-weight: bold;
  font-size: 14px;
  margin: 0;
  color: #4d4d4d;
}
.card-header {
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
  margin: 0 auto;
  width: 60%;
}

.legend-list li {
  display: flex;
  margin-bottom: 10px;
  width: auto;
}

.legend-list li:last-child {
  margin-bottom: 0;
}

.legend-list li span {
  vertical-align: bottom;
}

.nav-item {
  border: 1px;
  border-bottom: 0;
  background-color: white;
  border-color: #ddd;
  border-style: solid;
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
  /* height: 225px; */
  margin: 20px auto 0 auto;
}

.bottom-line {
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
}

.spacebar {
  margin-right: 4px;
}
</style>
