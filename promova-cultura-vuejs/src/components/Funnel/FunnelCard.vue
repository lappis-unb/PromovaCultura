<template>
    <div>
        <!-- class="col-12 col-md-9 col-md-push-3 col-lg-6 col-lg-push-3" -->
        <div class="card">
            <div class="card-header">
                Pessoas Envolvidas
            </div>
            <div class="card-body">
                <div class="row" v-bind:key="props.title" v-for="props in dataprops">
                  <div class="col-3 col-sm-3 col-md-3">
                      <img class="people-image" :src="props.image">
                  </div>
                  <div class="col-3 col-sm-4 col-md-4 bar-holder">
                      <span class="progress-indicator" :id="props.color_number_bar">
                        {{ props.total_percentage }}
                      </span>
                      <div class="progress">
                        <div class="progress-bar progress-bar-info"
                          role="progressbar"
                          :class="props.css"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100" :style="props.bar_style">
                        </div>
                      </div>
                  </div>
                  <div class="col-6 col-sm-5 col-md-5">
                      <div :class="props.font_color">
                        <span class="info-number">{{ props.total_number }}</span>
                        <span class="info-type">{{ props.title }}</span>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    people: Object
  },
  mounted() {
    console.log(this.dataprops[0].people);
  }
  ,
  computed: {
    dataprops() {
      return [
        {
          title: "PROPONENTES",
          image: "@/../static/svg-icons/Proponentes_ICONE.svg",
          people: this.people.proponentes,
          css: 'prop-bar',
          font_color: 'proponent',
          color_number_bar: 'proponent-indicator',
          bar_style: "width: " + this.people.proponentes + "%;",
          total_number: 82191,
          get total_percentage() { return parseInt((Math.random()) * 82191) } 
        },
        {
          title: "INCENTIVADORES",
          image: "@/../static/svg-icons/Investidores_ICONE.svg",
          people: this.people.incentivadores,
          css: 'inv-bar',
          font_color: 'investor',
          color_number_bar: 'investor-indicator',
          bar_style: "width: " + this.people.incentivadores + "%;",
          total_number: 46532,
          get total_percentage() { return parseInt((Math.random()) * 46532) }
        }
      ]
    }
  }
};
</script>

<style scoped>
.progress {
  padding: 0px;
  border-radius: 15px;
  height: 1.5vh;
}

.proponent {
  color: #5bc0de;
  text-align: center;
  margin-top: 1.5vh;
}

.investor {
  color: #f0ad4e;
  text-align: center;
  margin-top: 1.5vh;
}

.progress-indicator {
  margin: auto;
  display: table;
  font-weight: bold;
  font-size: 18px;
}

.bar-holder {
  margin-top: 2vh;
}

.info-number {
  font-weight: bold;
  display: block;
}

.info-type {
  color: #6d6e71;
  font-weight: bold;
}

.people-image {
  width: 50px;
  height: 50px;
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

@media (max-width: 575px) {
  .info-number {
    font-size: 20px;
  }
  .info-type {
    font-size: 10px;
  }
}

@media (min-width: 576px) {
  .info-number {
    font-size: 28px;
  }

  .info-type {
    font-size: 13px;
  }
}

@media (min-width: 992px) {
  .info-type {
    font-size: 13px;
  }
}
</style>
