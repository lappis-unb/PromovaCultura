<template>
<div id='location-modal' class="LocationInfo" :data-showon="showOn">
    <div class="card">
        <div class="card-header">
            {{current}}

            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
              v-if="showOn === 'click'">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="card-body">
            <div :class="'location-info-first-line has-border'">
              <p> <span> {{totalProjects}} </span>
                    projetos
                </p>
            </div>

            <div :class="'location-info-second-line' + (displayBorder ? ' has-border' : '')"
              v-if="displayBorder"
            >
                <div :class="propIncCssClass" v-if="displayProponents">
                    <img src="@/../static/svg-icons/Proponentes_ICONE.svg" class="icon-popup"/>
                    <p>
                      <span>{{totalProponents}}</span> proponentes
                    </p>
                </div>

                <div :class="propIncCssClass" v-if="displayIncentivators">
                    <img src="@/../static/svg-icons/Investidores_ICONE.svg" class="icon-popup"/>
                    <p>
                      <span>{{totalIncentivators}}</span> incentivadores
                    </p>
                </div>
            </div>
            <p class= "location-info-last">
                {{segment}}
            </p>
        </div>
    </div>
</div>
</template>

<script>
import $ from "jquery";

import EventBus from '@/util/EventBus';

export default {
  props: {
    projects: Object,
    proponents: Object,
    incentivators: Object,
    showOn: {
      type: String,
      default: "click" // click | hover
    },
    segment: String,
  },

  data() {
    return {
      current: "",
      totalProjects: 0,
      totalProponents: 0,
      totalIncentivators: 0,
      prevData: {},
    }
  },

  computed: {
    displayBorder() {
      return this.displayProponents || this.displayIncentivators;
    },
    propIncCssClass() {
      if (this.displayProponents && this.displayIncentivators) {
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
      if(data!=null){
        this.prevData = data;
      }

      this.updateCurrent(this.prevData.name);
      this.updateTotalProjects(this.prevData.abbreviation);
      this.updateTotalProponents(this.prevData.abbreviation);
      this.updateTotalIncentivators(this.prevData.abbreviation);
    });
  },

  methods: {
    updateCurrent(newCurrent) {
      this.current = newCurrent;
    },
    updateTotalProjects(abbreviation) {
      this.totalProjects = this.projects[abbreviation] || 0;
    },
    updateTotalProponents(abbreviation) {
      this.totalProponents = this.proponents[abbreviation] || 0;
    },
    updateTotalIncentivators(abbreviation) {
      this.totalIncentivators = this.incentivators[abbreviation] || 0;
    },
  }
};
</script>

<style scoped>
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

</style>

