<template>
  <div>
    <h1>Captação de recurso por UF desde 1992</h1>
    <div class="sticky-top" style="position: fixed">
      <div class="row">
        <div class="offset-1 col-6">Estado</div>
        <div class="col-5">Captação</div>
      </div>
    </div>

    <div v-for="(uf, index) in ufs">
      <div class="row collapsibleState collapsed" data-toggle="collapse" :data-target="'#collapseStateContent' + index">
        <div class="col-5 state">{{ uf }}</div>
        <div class="col-5 amount">{{raisedAmount[uf]}}</div>
        <div class="col-2 arrow">
          <span class="icon-filter">
            <i class="fa" aria-hidden="true"></i>
          </span>
        </div>
      </div>

        <div :id="'collapseStateContent' + index" class="collapsibleStateContent collapse">
          <div class="row">
            <div class="col-6">Proponentes</div>
            <div class="col-6">33</div>
          </div>
          <div class="row">
            <div class="col-6">Valor aprovado</div>
            <div class="col-6">{{approvedValues[uf]}}</div>
          </div>
          <div class="row">
            <div class="col-6">Valor captado</div>
            <div class="col-6">{{raisedAmount[uf]}}</div>
          </div>
        </div>
      </div>
      <!--</ul>-->
    </div>
</template>

<script>
  export default {
    data() {
      return {
        ufs: ["São Paulo", "Distrito Federal","São Paulo", "Distrito Federal", "Pernambuco", "Pernambuco","São Paulo", "Distrito Federal", "Pernambuco","São Paulo", "Distrito Federal", "Pernambuco","São Paulo", "Distrito Federal", "Pernambuco",],
        approvedValues: {
          "São Paulo": 2345,
          "Distrito Federal": 1234,
          "Pernambuco": 5685786
        },
        raisedAmount: {
          "São Paulo": 325556879,
          "Distrito Federal": 3453453453,
          "Pernambuco": 7879076
        }

      }
    }
  }
</script>

<style scoped>
  H1{
    text-align: center;
  }

  .collapsibleState{
    background-color: #CCC;
    position: relative;
    border-radius: 8px;
    margin: 8px;
    border-left: solid 8px #EF6B29;
  }
  .state, .amount{
    padding: 12px 8px;
  }
  .amount{
    text-align: right;
  }
 .arrow{
   position: absolute;
   background-color: #EF6B29;
   height: 100%;
   top: 0;
   right: 0;
   border-radius: 0 8px 8px 0;

 }
 .arrow span{
   margin: auto;
   position: relative;
 }

  .collapsibleStateContent{
    background-color: #CCC;
    padding: 16px;
    margin: 4px 16px 16px;
    border-radius: 8px;

  }

  [data-toggle="collapse"] .fa:before {
    content: "\f078";
  }

  [data-toggle="collapse"].collapsed .fa:before {
    content: "\f054";
  }
</style>
