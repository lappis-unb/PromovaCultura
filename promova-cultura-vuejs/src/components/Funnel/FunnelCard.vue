<template>
  <div class="card-stack">
    <legend class="title-stack">Pessoas Envolvidas</legend>
    <div class="row" v-bind:key="props.title" v-for="props in dataprops">
      <div class="col-3 col-sm-3 col-md-3">
          <img class="people-image" :src="props.image">
      </div>
      <div class="col-5 col-sm-4 col-md-4 bar-holder">
          <span class="progress-indicator" :id="props.color_number_bar">
            {{ props.total_percentage }}
          </span>
          <div class="progress">
            <div class="progress-bar progress-bar-info"
              role="progressbar"
              :class="props.css"
              aria-valuenow="50"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="props.bar_style"
            >
            </div>
          </div>
      </div>
      <div class="col-4 col-sm-5 col-md-5">
          <div :class="props.font_color">
            <span class="info-number">{{ props.total_number }}</span>
            <span class="info-type">{{ props.title }}</span>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    people: Object
  },
  mounted() {
    console.log(this.dataprops[0].people);
  },
  computed: {
    dataprops() {
      return [
        {
          title: "PROPONENTES",
          image: "@/../src/static/svg-icons/Proponentes_ICONE.svg",
          people: this.people.proponentes,
          css: "prop-bar",
          font_color: "proponent",
          color_number_bar: "proponent-indicator",
          bar_style: "width: " + this.people.proponentes + "%;",
          total_number: 8219100,
          get total_percentage() {
            return parseInt(Math.random() * 82191);
          }
        },
        {
          title: "INCENTIVADORES",
          image: "@/../src/static/svg-icons/Investidores_ICONE.svg",
          people: this.people.incentivadores,
          css: "inv-bar",
          font_color: "investor",
          color_number_bar: "investor-indicator",
          bar_style: "width: " + this.people.incentivadores + "%;",
          total_number: 4653200,
          get total_percentage() {
            return parseInt(Math.random() * 46532);
          }
        }
      ];
    }
  }
};
</script>

<style scoped>
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

/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
  .title-stack {
    font-size: 20px;
  }
  .info-number {
    font-size: 20px;
    margin-top: 13px;
  }
  .info-type {
    font-size: 10px;
  }
}
/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
  .title-stack {
    font-size: 20px;
  }
  .info-number {
    font-size: 26px;
    margin-top: 20px;
  }
  .info-type {
    font-size: 13px;
  }
  .progress {
    height: 13px;
  }
  .progress-indicator {
    font-size: 20px;
  }
  .people-image {
    width: 50px;
    height: 50px;
    padding: 0px;
    margin-top: 2vh;
  }
}
/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  
}
/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .info-type {
    font-size: 13px;
  }
  .title-stack {
    font-size: 24px;
  }  
  .card-stack {
    margin-top: 120px;
    
  }
}
/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
</style>
