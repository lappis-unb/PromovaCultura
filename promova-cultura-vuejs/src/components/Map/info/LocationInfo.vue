<template>
<div>

    <a href="#" data-toggle="popover">Toggle popover</a>

    <div class="card" style="display:none;" id="meu-componente-bacana"> 
        <div class="card-header">
            Rio Grande do Norte
        </div>
        <div class="card-body">
            <div class="location-info-first-line">
                <p> <span> 986544 </span>
                    projetos
                </p>
            </div>
            <div class="location-info-second-line">
                <div class="info-prop-inc">
                    <img src="@/../static/svg-icons/Proponentes_ICONE.svg" class="icon-popup"/>
                    <p> <span> 18764 </span>
                        Proponentes
                    </p>
                </div>
                <div class="info-prop-inc">
                    <img src="@/../static/svg-icons/Investidores_ICONE.svg" class="icon-popup"/>
                    <p> <span>34567</span>
                        Incentivadores
                    </p>
                </div>
            </div>
            <p class= "location-info-last">
                Preservação/Restauração de memória cinematográfica
            </p>
        </div>
    </div>
</div>
</template>

<script>
import $ from "jquery";

export default {
    mounted() {
    $('[data-toggle="popover"]').popover({
      content: $('#meu-componente-bacana').html(),
      html: true
    });
  }
}
</script>

<style>

    .popover.fade.show{
        max-width: 350px;
    }

    .popover .popover-body {
        padding: 0px;
    }

    .card {
        width: 350px;
    }
    
    .card-header {
        font-size: 25px;
        text-align: center;
        color: #333;
    }

    .icon-popup {
        float: left;
        height: 50px;
        width: 50px;
    }
    
    .location-info-first-line,
    .location-info-second-line {
        border-bottom: 2px solid #EEE;
        padding-bottom: 10px;
        
    }

    .location-info-second-line {
        overflow: hidden;
        padding-top: 15px;
    }

    .location-info-first-line p, 
    .location-info-last {
        font-size: 15px;
    }

    .location-info-first-line p {
        font-variant: small-caps;
    }
    .location-info-first-line p, 
    .location-info-second-line p,
    .location-info-last{
        text-align: center;
        margin-bottom: 0px;
    }
    .location-info-first-line span,
    .location-info-second-line span {
       display: block;
       font-weight: 600;
    }
    .location-info-first-line span {
        font-size: 50px;
        line-height: 50px;
    }
    .location-info-second-line {
        font-size: 12px;
    }
    .location-info-second-line,
    .location-info-last {
        font-style: italic;
    }
    .location-info-second-line span {
        font-size: 20px;
        font-style: normal;
    }
    .info-prop-inc {
        float: left;
        width: 50%;
    }
    .location-info-last{
        clear: both;
        padding: 20px 40px 0 40px;
    }

</style>

