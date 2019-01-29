<template>
  <div class="align-card">
    <ul class="nav nav-tabs legend-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link" id="proponente-tab" role="tab">Valor Captado</a>
      </li>
    </ul>
    <div class="tab-content legend-content" id="myTabContent">
      <load-placeholder
        id="placeholder1"
        phStyle="legend"
        contentId="projeto"
        :isVisible="isLoading"
      />

      <div
        class="tab-pane fade show active"
        id="projeto"
        aria-labelledby="projeto-tab"
        role="tabpanel"
      >
        <div>
          <ul class="legend-list">
            <li
              v-for="(data) in legends.heatMap"
              :key="data.color"
              v-if="data.max != 0 || data.min!=0"
            >
              <img class="legend-color" :src="data.color" v-if="legends.heatMap[0].image">
              <div class="legend-color" :style="'background:'+ data.color" v-else></div>
              <span v-if="data.min==data.max">{{data.max}}</span>
              <span
                class="spacebar"
                v-if="(data.min < 1000000000 && data.min >= 1000000)"
              >R$ {{parseFloat((data.min/1000000)).toFixed(1)}} mi até</span>
              <span
                class="spacebar"
                v-else-if="(data.min >= 1000000000)"
              >R$ {{parseFloat((data.min/1000000000).toFixed(1)).toLocaleString("pt-BR")}} bi até</span>
              <span v-else class="spacebar">R$ {{data.min.toLocaleString("pt-BR")}} até</span>
              <span
                v-if="(data.max < 1000000000 && data.max >= 1000000)"
              >{{parseFloat((data.max/1000000).toFixed(1)).toLocaleString('pt-BR')}} mi</span>
              <span
                v-else-if="(data.max >= 1000000000)"
              >{{parseFloat((data.max/1000000000).toFixed(1)).toLocaleString("pt-BR")}} bi</span>
              <span v-else>{{data.max.toLocaleString("pt-BR")}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="card">
      <legend class="card-header">TOTAL</legend>
      <load-placeholder
        id="placeholder2"
        phStyle="legend"
        contentId="card2"
        :isVisible="isLoading"
      />
      <div id="card2" class="card-body">
        <div>
          <div class="list-group list-group-flush">
            <div class="bottom-line">
              <p class="total-label">Quantidade de Proponentes</p>
              <p class="total-value">{{totalProponents}}</p>
            </div>
            <div class="bottom-line">
              <p class="total-label">Valor Aprovado</p>
              <p class="total-value">{{totalapprovedAmount}}</p>
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
      totalProponents: 0,
      totalapprovedAmount: 0,
      totalRaisedAmount: 0,
      isLoading: true
    };
  },
  mounted() {
    $(".csv-button").LoadingOverlay("show", {
      text: "Exportar Dados",
      textColor: "white",
      image: "",
      background: "#dadada",
      fontawesomeColor: "#565656"
    });
  },
  methods: {
    updateTotals() {
      this.totalProponents = this.data.totals.proponents;
      this.totalapprovedAmount = this.data.totals.approvedAmount.toLocaleString(
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
      $("#myTabContent").LoadingOverlay("hide");
      $(".card-body").LoadingOverlay("hide");
      $(".csv-button").LoadingOverlay("hide");
      if (this.data.totals.proponents != 0) this.isLoading = false;
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
  height: 225px;
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
