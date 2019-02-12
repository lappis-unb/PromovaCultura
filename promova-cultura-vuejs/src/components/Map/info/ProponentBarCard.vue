<template>
<div id='location-modal' class="LocationInfo" :data-showon="showOn">
  <div class="card">
    <div class="card-header" id="card-map-header">
      <p id="state-name">{{current}}</p>
    </div>
    <load-placeholder id="placeholder3" phStyle="mapCard" contentId="mapCard" :isVisible="isLoading" />
    <div id="mapCard">
      <div class="card-body">
        <p class="card-topic">Proponentes</p>
        <div class="card-number">
          {{this.totalProponents}}
        </div>
        <p class="card-topic">Valor Aprovado</p>
        <div class="card-number">
          R$ {{(this.totalapprovedAmount).toLocaleString('pt-BR', {
              minimumFractionDigits: 2})}}
        </div>
        <p class="card-topic"><b>Valor Captado</b></p>
        <div class="card-number">
          <span>R$ {{(this.totalraisedAmount).toLocaleString('pt-BR', {
                minimumFractionDigits: 2})}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import $ from "jquery";
import EventBus from '@/util/eventBus';
import LoadPlaceholder from '@/components/LoadPlaceholder';

export default {
  components: {
    "load-placeholder": LoadPlaceholder
  },
  props: {
    data: Object,
    projects: Object,
    proponents: Object,
    incentivators: Object,
    proponentMap: Boolean,
    approvedAmount: Object,
    raisedAmount: Object,
    showOn: {
      type: String,
      default: "click" // click | hover
    },
    segment: String,

  },

  data() {
    return {
      current: "",
      totalProponents: 0,
      totalapprovedAmount: 0,
      totalraisedAmount: 0,
      prevData: {},
      isLoading: true
    }
  },
  computed: {
    dataprops() {
      return {
        style_prop: "width: " + this.totalProponents + "%;",
        style_approved: "width: " + this.totalapprovedAmount + "%;",
        style_raised: "width: " + this.totalraisedAmount + "%;",
      };
    },
    displayBorder() {
      if (this.proponentMap)
        return true
      else
        return this.displayProponents || this.displayIncentivators;
    },
    propIncCssClass() {
      if ((this.displayProponents && this.displayIncentivators) || this.proponentMap) {
        return "multiple-prop-inc";
      } else {
        return "single-prop-inc";
      }
    },
    displayProponents() {
      return Object.keys(this.proponents).length > 0;
    },
    displayIncentivators() {
      return Object.keys(this.incentivators).length > 0;
    }
  },

  mounted() {
    $("#card-map-header").css('background-color', '#9fa5ab');
    $("#state-name").css('color', 'white');

    EventBus.$on('mapOnMouseOver', (data) => {
      if (data != null) {
        this.prevData = data;
      }

      this.updateCurrent(this.prevData.name);
      this.updateTotalProponents(this.prevData.abbreviation);
      this.updateTotalapprovedAmount(this.prevData.abbreviation);
      this.updateTotalraisedAmount(this.prevData.abbreviation);

      const value = this.data.approvedAmount[this.prevData.abbreviation]
      if (value && value != 0) {
        this.isLoading = false;
        $("#card-map-header").css('background-color', '#75CC75');
        $("#state-name").css('color', '#1a3d1a');
        $("#state-name").css('font-size', '18px');
      }
    });
  },

  methods: {
    updateCurrent(newCurrent) {
      this.current = newCurrent;
    },
    updateTotalProponents(abbreviation) {
      this.totalProponents = this.data.proponentesMap[abbreviation] || 0;
    },
    updateTotalapprovedAmount(abbreviation) {
      this.totalapprovedAmount = this.data.approvedAmount[abbreviation] || 0;
    },
    updateTotalraisedAmount(abbreviation) {
      this.totalraisedAmount = this.data.raisedAmount[abbreviation] || 0;
    },
  }
};
</script>

<style scoped>
.card-header {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-top: 5px;
  height: 35px;
}

.card {
  /*width: 225px !important;*/
  height: 220px;
  text-align: center;
}

.card-body {
  padding-top: 10px;
}

.card-topic {
  color: #3aa53a;
  font-weight: 500;
  margin: 0;
}

.card-number {
  margin: 0 0 6px 0;
  font-size: 16px;
  color: #4d4d4d;
}

.card-number span {
  font-size: 18px;
  font-weight: bold;
  color: #333;
}

.card-number p {
  font-size: 12px;
}

.LocationInfo {
  position: absolute;
  top: -1000px;
  left: -1000px;
  z-index: 1050;
  display: none;
}

.single-prop-inc {
  float: none;
  width: 50%;
  margin: 0 auto;
}

.multiple-prop-inc {
  float: left;
  width: 50%;
}
</style>
