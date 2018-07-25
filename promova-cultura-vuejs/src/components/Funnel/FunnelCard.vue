<template>
    <div>
        <!-- class="col-12 col-md-9 col-md-push-3 col-lg-6 col-lg-push-3" -->
        <div class="card">
            <div class="card-header">
                Pessoas Envolvidas
            </div>
            <div class="card-body">


                <div class="row" v-bind:key="props.title" v-for="props in dataprops">
                  <div class="col-3 col-sm-3 col-md-2">
                      <img class="people-image" :src="props.image">
                  </div>
                  <div class="col-3 col-sm-4 col-md-5 bar-holder">
                      <span class="progress-indicator" id="proponent-indicator">
                        {{ props.people.proponentes }}
                      </span>
                      <div class="progress">
                        <div class="progress-bar progress-bar-info"
                          role="progressbar"
                          :class="props.css"
                          aria-valuenow="50"
                          aria-valuemin="0"
                          aria-valuemax="100" :style="propPercentage">
                        </div>
                      </div>
                  </div>
                  <div class="col-6 col-sm-5 col-md-5">
                      <div :class="props.font_color">
                        <span class="info-number">{{ props.people }}</span>
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
    propPercentage: function() {
      return "width: " + this.people.proponentes + "%;";
    },

    incPercentage: function() {
      return "width: " + this.people.incentivadores + "%;";
    },

    dataprops() {
      return [
        {
          title: "PROPONENTES",
          image: "@/../static/svg-icons/Proponentes_ICONE.svg",
          people: this.people.proponentes,
          css: 'prop-bar',
          font_color: 'proponent'
        },
        {
          title: "INCENTIVADORES",
          image: "@/../static/svg-icons/Investidores_ICONE.svg",
          people: this.people.incentivadores,
          css: 'inv-bar',
          font_color: 'investor'
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
