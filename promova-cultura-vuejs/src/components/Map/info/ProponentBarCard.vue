<template>
  <div id='location-modal' class="LocationInfo" :data-showon="showOn">
    <div class="card">
      <div class="UFname">
        {{current}}
      </div>
      <div class="card-body">
        <div class="card-number">
          <img src="../../../../static/svg-icons/proponente_verde.svg"
               class="card-icon"></img>
          {{this.totalProponents}}
        </div>
        <div class="card-number">
          <img src="../../../../static/svg-icons/check_verde.svg"
               class="card-icon"></img>
          R$ {{(this.totalapprovedAmount).toLocaleString('pt-BR', {
          minimumFractionDigits: 2})}}
        </div>
        <div class="card-number">
          <img src="../../../../static/svg-icons/cifrao_verde.svg"
               class="card-icon"></img>
          R$ {{(this.totalraisedAmount).toLocaleString('pt-BR', {
          minimumFractionDigits: 2})}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import $ from "jquery";

  import EventBus from '@/util/EventBus';


  export default {
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
      EventBus.$on('mapOnMouseOver', (data) => {
        // console.log( JSON.stringify(data, null, 4) );
        if (data != null) {
          this.prevData = data;
        }

        this.updateCurrent(this.prevData.name);
        this.updateTotalProponents(this.prevData.abbreviation);
        this.updateTotalapprovedAmount(this.prevData.abbreviation);
        this.updateTotalraisedAmount(this.prevData.abbreviation);

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

  .UFname {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #676767;
    margin-top: 10px;
  }

  .card-body {
    padding-top: 0px;
  }

  .card-number {
    /*text-align: center;*/
    font-size: 20px;
    font-weight: bold;
    color: #676767;
    margin-top: 10px;
  }

  .card-icon {
    margin-right: 10px;
  }

  .LocationInfo {
    position: absolute;
    top: -1000px;
    left: -1000px;
    z-index: 1050;
    display: none;
  }

  .popover.fade.show {
    max-width: 285px;
  }

  .popover .popover-body {
    padding: 0px;
  }

  .card {
    width: 285px;
  }

  .card-header {
    font-size: 18px;
    text-align: center;
    color: #333;
  }

  .icon-popup {
    float: left;
    height: 30px;
    width: 30px;
  }

  .has-border {
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    padding-top: 5px;
  }

  .location-info-second-line {
    overflow: hidden;
    padding-top: 15px;
  }

  .location-info-first-line p {
    font-size: 15px;
  }

  .location-info-last {
    font-size: 12px;
  }

  .location-info-first-line p {
    font-variant: small-caps;
  }

  .location-info-first-line p,
  .location-info-second-line p,
  .location-info-last {
    text-align: center;
    margin-bottom: 0px;
  }

  .location-info-first-line span,
  .location-info-second-line span {
    display: block;
    font-weight: 600;
  }

  .location-info-first-line span {
    font-size: 36px;
    line-height: 26px;
  }

  .location-info-second-line {
    font-size: 12px;
  }

  .location-info-second-line,
  .location-info-last {
    font-style: italic;
  }

  .location-info-second-line span {
    font-size: 18px;
    font-style: normal;
    line-height: 16px;
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

  .location-info-last {
    clear: both;
    padding: 20px 40px 0 40px;
  }

  .progress {
    padding: 0px;
    border-radius: 15px;
    height: 1.5vh;
    margin-bottom: 5px;
  }

  .proponent {
    color: #5bc0de;
    text-align: center;
  }

  .investor {
    color: #f0ad4e;
    text-align: center;
  }

  .progress-indicator {
    margin: auto;
    display: table;
    font-weight: bold;
    font-size: 16px;
  }

  .bar-holder {
    margin-top: 2vh;
  }

  .people-image {
    width: 40px;
    height: 40px;
    padding: 0px;
    margin-top: 2vh;
  }

  .inv-bar {
    background-color: #f0ad4e;
  }

  .prop-bar {
    background-color: #5bc0de;
  }

  #proponent-indicator {
    color: #5bc0de;
  }

  #investor-indicator {
    color: #f0ad4e;
  }

  .title-stack {
    color: #666;
  }

  .card-stack {
    margin-bottom: 35px;
  }

  .info-number {
    font-weight: bold;
    display: block;
    line-height: 15px;
  }

  .info-type {
    color: #6d6e71;
    font-weight: bold;
  }
</style>

