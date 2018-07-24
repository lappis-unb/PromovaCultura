<template>
    <div>
        <!-- class="col-12 col-md-9 col-md-push-3 col-lg-6 col-lg-push-3" -->
        <div class="card">
            <div class="card-header">
                Pessoas Envolvidas
            </div>
            <div class="card-body">
                <div class="row">
                  <div class="col-3 col-sm-3 col-md-2">
                      <img class="people-image" src="@/../static/svg-icons/Proponentes_ICONE.svg">
                  </div>
                  <div class="col-4 col-sm-4 col-md-6 bar-holder">
                      <span class="progress-indicator" id="proponent-indicator">{{ people.proponentes }}</span>
                      <div class="progress">
                        <div class="progress-bar progress-bar-info" role="progressbar" id="prop-bar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" :style="propPercentage"></div>
                      </div>
                  </div>
                  <div class="col-5 col-sm-4 col-md-4">
                      <div class="proponent">
                        <span class="info-number">{{ people.proponentes }}</span>
                        <span class="info-type">PROPONENTES</span>
                      </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-3 col-md-2">
                      <img class="people-image" src="@/../static/svg-icons/Investidores_ICONE.svg">
                  </div>
                  <div class="bar-holder col-4 col-md-6">
                      <span class="progress-indicator" id="investor-indicator">{{ people.incentivadores }}</span>
                      <div class="progress">
                        <div class="progress-bar progress-bar-warning" role="progressbar" id="inv-bar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" :style="incPercentage"></div>
                      </div>
                  </div>
                  <div class="col-5 col-md-4">
                      <div class="investor">
                        <span class="info-number">{{ people.incentivadores }}</span>
                        <span class="info-type">INCENTIVADORES</span>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    people: Object
  },
  computed: {
    propPercentage: function() {
      return "width: " + this.people.proponentes + "%;";
    },

    incPercentage: function() {
      return "width: " + this.people.incentivadores + "%;";
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

#inv-bar {
  background-color: #f0ad4e;
}

#prop-bar {
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
