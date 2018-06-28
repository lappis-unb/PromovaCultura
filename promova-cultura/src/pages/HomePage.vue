<template>
<div class="list-group">
  <!-- <link rel="stylesheet" type="text/css" href="../../static/slick/slick.css">
  <link rel="stylesheet" type="text/css" href="../../static/slick/slick-theme.css"> -->

  <div class="list-group-item">Lista de protótipos desenvolvidos:</div>
  <router-link class="list-group-item" to="/map_state">Mapa do Brasil com informações básicas por estado</router-link>
  <router-link class="list-group-item" to="/map_region">Mapa do Brasil com informações básicas por região</router-link>
  <router-link class="list-group-item" to="/funil">Protótipo do Funil</router-link>
  <router-link class="list-group-item" to="/nl">Protótipo do filtro de linguagem natural</router-link>
  <router-link class="list-group-item" to="/controls">Protótipo do controle dos filtros</router-link>

  <!-- <div class="row">
    <section class="center slider">
      <div class="card">
        <a href="http://localhost:8080/#/controls">
                        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </a>
      </div>
      <div class="card">
        <a href="./promova-cultura/vuejs.html">
                    <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    </a>
      </div>
      <div class="card">
        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
      <div class="card">
        <img class="card-img-top" src="http://placehold.it/350x300?text=8" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">Card title</h5>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        </div>
      </div>
    </section>
  </div> -->
  <!-- /row -->
</div>
</template>

<script>
import $ from "jquery";
import "../../static/slick/slick.js";
export default {
  name: "HomePage",
  mounted: function() {
    $(".center").slick({
      centerMode: true,
      centerPadding: "60px",
      slidesToShow: 5,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive: [{
          breakpoint: 768,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            centerMode: true,
            centerPadding: "40px",
            slidesToShow: 1
          }
        }
      ]
    });
  }
};
</script>

<style>
.slider {
  width: 100%;
  margin: 100px auto;
}

.slick-slide {
  margin: 0px 20px;
}

.slick-slide img {
  width: 100%;
}

.slick-prev:before,
.slick-next:before {
  color: black;
}

.slick-slide {
  transition: all ease-in-out 0.3s;
  opacity: 0.2;
}

.slick-active {
  opacity: 0.5;
}

.slick-current {
  opacity: 1;
}
</style>
