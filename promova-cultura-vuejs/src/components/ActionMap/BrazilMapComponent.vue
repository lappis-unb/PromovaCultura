<template>
    <div class="box-mapa">
        <div class="jsmaps-wrapper" id="brazil-map-action"/>
    </div>
</template>

<script>

export default {
    name: "BrazilMap",
};
</script>

<style>
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
    .box-mapa {
        display: none;
    }
}

/* Extra Small Devices, Phones */
@media only screen and (max-width: 480px) {
    .box-mapa {
        display: none;
    }
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
    .box-mapa {
        display: none;
    }
}
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
    .box-mapa {
        display: none;
    }
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
  .box-mapa {
    display: none
  }
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  .box-mapa {
    display: block;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
  .box-mapa {
    display: inline-block;
  }
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
  .box-mapa {
    display: inline-block;
  }
}
</style>
