<template>
    <div style="margin-top:20px;" class="row">
        <div class="col-sm-6">
            <button type="button" id="modal-button-filter" class="btn btn-sm btn-default" data-toggle="modal" data-target="#exampleModal">
                <i class="fas fa-filter"></i> Filtrar 
            </button>
            <brazil-map :dataValue="dataValue" />
        </div>
        <div class="col-md-4" id="desktop-filters">
            <!-- <controls-filter-map :segmentos="segmentos"/> -->
            <section>
        <link rel="stylesheet" type="text/css" href="../../static/selectize/selectize.css" />
        <div class="card">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <label>Segmento cultural</label>
                    <select v-model="selected" @change="makeAction()" class="custom-select">
                        <option v-for="segmento in segmentos" :value="segmento" v-bind:key="segmento">
                            {{segmento}}
                        </option>
                    </select>
                </li>
                <li class="list-group-item">
                    <span>Proponentes</span>
                    <label class="switch ">
                        <input type="checkbox" v-on:click="changeValueProponente()" class="default">
                        <span class="slider round"></span>
                    </label>
                </li>
                <li class="list-group-item">
                    <span>Incentivadores</span>
                    <label class="switch ">
                        <input type="checkbox" v-on:click="changeValueIncentivadores()" class="default">
                        <span class="slider round"></span>
                    </label>
                </li>
            </ul>
        </div> 
    </section>
        </div>
        <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Filtro</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- <controls-filter-map :segmentos="segmentos" v-on:update="onChildUpdate"/> -->
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <label>Segmento cultural</label>
                                    <select v-model="selected" @change="makeAction()" class="custom-select">
                                        <option v-for="segmento in segmentos" :value="segmento" v-bind:key="segmento">
                                            {{segmento}}
                                        </option>
                                    </select>
                                    {{selected}}
                                </li>
                                <li class="list-group-item">
                                    <span>Proponentes</span>
                                    <label class="switch ">
                                        <input type="checkbox" v-on:click="changeValueProponente()" class="default">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                                <li class="list-group-item">
                                    <span>Incentivadores</span>
                                    <label class="switch ">
                                        <input type="checkbox" v-on:click="changeValueIncentivadores()" class="default">
                                        <span class="slider round"></span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-dismiss="modal">Filtrar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery"
import "selectize"
import BrazilMap from "@/components/BrazilMapComponent";
//import ControlsFilterBrazilMap from "@/components/ControlsFilterBrazilMap";
//import ControlsFilterBrazilMap from '@/components/ControlsFilterV2'

export default {
  name: "ControlFilterBrazilMap",
  components: {
    //"controls-filter-map": ControlsFilterBrazilMap,
    "brazil-map": BrazilMap
  },
  data() {
    return {
    proponenteTextButton: "+ proponentes",
    incentivadoresTextButton: "+ incentivadores",
    selected: "Teatro",
    dataValue: {},
    selected: 'Todos os segmentos',
    v: false,
    listOfProponentes: [],
    listOfIncentivadores: [],
    proponentesIsActivated: true,
    incentivadoresIsActivated: true,
    segmentos: [
        "Todos os segmentos",
        "Teatro",
        "Dança",
        "Circo",
        "Ópera",
        "Mímica",
        "Ópera Rock",
        "Ações de capacitação e treinamento de pessoal",
        "Teatro de formas animadas",
        "Teatro de mamulengos",
        "Teatro de bonecos e congêneres",
        "Desfile de escola de samba",
        "Desfile de bloco carnavalesco",
        "Desfile de cortejo da cultura popular",
        "Construção de salas de teatro munic(< 100 mil hab)",
        "Construção de centros comunit.Munic(< 100 mil hab)",
        "Manutenção de salas de teatro Munic(< 100 mil hab)",
        "Manutenção de centros comunit.Munic(< 100 mil hab)",
        "Teatro musical",
        "Jogos eletrônicos",
        "Videofonográfica",
        "Produção Cinematográfica de curta metragem",
        "Rádio/Tvs Educativa",
        "Produção Cinematográfica de média metragem",
        "Formação /Pesquisa/Informação",
        "Exibição Cinematográfica",
        "Infra-estrutura Técnica Audiovisual",
        "Produção Videofonográfica de curta metragem",
        "Produção Videofonográfica de média metragem",
        "Formação Audiovisual",
        "Pesquisa Audiovisual",
        "Doação de acervos audiovisuais",
        "Construção de salas de cinema (< 100 mil hab)",
        "Manutenção de salas de cinema (< 100 mil hab)",
        "Constr. centro comunitário c/sala cinema(<100 mil)",
        "Manut. centro comunitário c/sala cinema(<100 mil)",
        "Difusão de acervo audiovisual",
        "Preservação de acervos audiovisuais",
        "Restauração de acervos audiovisuais",
        "Produção de web série",
        "Rádios e TVs Educativas não comerciais",
        "Projetos Audiovisuais Transmidiáticos",
        "Aquisi. equipamentos p/manut.-acervos audiovisuais",
        "Produção de conteúdo audiovisual de curta metragem",
        "Produção de conteúdo audiovisual de média metragem",
        "Difusão de acervo e conteúdo audiovisual",
        "Música Popular Cantada",
        "Música Erudita",
        "Música Instrumental",
        "Áreas Integradas",
        "Orquestra",
        "Doações de Acervos Musicais",
        "Canto Coral",
        "Plásticas",
        "Gráficas",
        "Filatelia",
        "Gravura",
        "Cartazes",
        "Fotografia",
        "Exposição Itinerante",
        "Design",
        "Artes Plásticas",
        "Artes Gráficas",
        "Exposição de Artes Visuais",
        "Moda",
        "Doações de Acervos de Artes Visuais",
        "Formação técnica e artística de profissionais",
        "Projeto educativo de artes visuais",
        "Projeto de fomento à cadeia produtiva arte visual",
        "Arquitetônico",
        "Arqueológico",
        "Museu",
        "Acervo",
        "Acervos Museológicos",
        "Cultura Afro Brasileira",
        "Cultura Indígena",
        "Artesanato/Folclore",
        "Preservação de Patrimônio Imaterial",
        "Manutenção de equipamentos culturais em geral",
        "Ações de capacitação",
        "Doações / aquisições de acervos culturais em geral",
        "Preservação de Patrimônio Material",
        "Restauração de Patrimônio Material",
        "Preservação de Patrimônio Museológico",
        "Restauração de Patrimônio Museológico",
        "Preservação de Acervos",
        "Restauração de Acervos",
        "Preservação de Acervos Museológicos",
        "Restauração de Acervos Museológicos",
        "Gastronomia",
        "Aquisição de equipamentos p/ manutenção de acervos",
        "Manutenção de salas de Teatro (<100 mil hab)",
        "Manu centro comunitário c/sl teatro (<100 mil hab)",
        "Construção de equipamentos culturais em geral",
        "Identificação, registro, educação do patrimônio",
        "Ações document./pesquisa/digitaliz./sistem.-acervo",
        "Preserv./revitaliz./edificações destinada-acervos",
        "Ações segurança p/preservação patrimônio/acervos",
        "Planos anuais de preservação do patrimônio/acervos",
        "Treinamento pessoal/aquis.equip. p/manut. Acervos",
        "Elaboração de projetos de arquitetura e urbanismo",
        "Edição de Livros",
        "Obras de Referência",
        "História",
        "Filosofia",
        "Acervo Bibliográfico",
        "Arquivo",
        "Biblioteca",
        "Evento Literário",
        "Periódicos",
        "Ações de formação e capacitação",
        "Eventos e ações de incentivo à leitura",
        "Livros ou obras de referência - valor Artístico",
        "Livros ou obras de referência - valor Literário",
        "Livros ou obras de referência - valor Humanístico",
        "Periódicos e outras publicações",
        "Treina pessoal p manuten de acervos bibliográficos",
        "Aquisiç equip p/manuten de acervos bibliográficos",
        "Doação de acervos acessíveis ao público em geral",
        "Impressos/eletrônicos-artístico, literário, human.",
        "Aquis.acervos biblio.-artístico, literário, human.",
        "Aquisi. arquivísticos-artístico, literário, human.",
        "Manut. acervos biblio.artístico, literário, human.",
        "Manut. acervos arquiv.artístico, literário, human.",
        "Prese. acervos biblio.artístico, literário, human.",
        "Prese. acervos arquiv.artístico, literário, human.",
        "Resta. acervos biblio.artístico, literário, human.",
        "Resta. acervos arquiv.artístico, literário, human.",
        "Treinamento-pessoal, demais ações de capacitação",
        "Aquis.equip. p/manut. acervos de bibliot. Públicas",
        "Aquisição equipamentos p/manut. acervos de museus",
        "Aquisição equip. p/manut. acervos arquivo públicos",
        "Aquisição equip. p/manut. acervos de cinematecas",
        "Ações educativo-culturais",
        "Artes Integradas",
        "Restauração/Bolsas",
        "Multimídia",
        "Carnaval",
        "Carnaval fora de época",
        "Cultura Popular",
        "Equipamentos culturais multifuncionais",
        "Produção Cinematográfica",
        "Produção de obras seriadas",
        "Produção Televisiva",
        "Produção Radiofônica",
        "Distribuição Cinematográfica",
        "Preservação/Restauração da Memória Cinematográfica",
        "Difusão",
        "Formação/Pesquisa e informação",
        "Intercâmbio cultural",
        "Doação ou aquisição de acervos para museus",
        "Doação de acervos p/instit. preservação da memória",
        "Aquisição acervos p/instit. preservação da memória",
        "Preservação. Restauração, conservaçao, registro",
        "Identificação, registro e promoção",
        "Documentação e digitalização de acervos",
        "Sistemas de informações",
        "Ações de segurança para preservação de acervos",
        "Planos anuais de atividades e planos museológicos",
        "Exposições realizadas em museus",
        "Exposições organizadas com acervos de museus",
        "Exposições organizadas com museografia",
        "Pesquisa",
        "Ações educativs, seminários, congresso, palestras",
        "Criação projetos, construção, restauração, reforma",
        "Implan. projetos, construção, restauração, reforma",
        "Espaços museais",
        "Treinamento de pessoal",
        "Aquisição de equipamentos p/preservação de acervos",
        "Aquisição de equipamentos p/manutenção de acervos"
      ],
      v: false
    };
  },
  mounted: function() {
    // var self = this;
    // $("#brazil-map").JSMaps({
    //     map: "brazil",
    //     stateClickAction: "none",
    //     onStateClick: function(data) {
    //     },
    // })
    $('#select-state').selectize({
        plugins: ['remove_button','drag_drop'],
        persist: false,
        create: true,
        render: {
            item: function(data, escape) {
                return '<div>' + escape(data.text) + '</div>';
            }
        },
        onDelete: function(values) {
            return 0;
        }
    });
    var self = this
    //console.log(this.selected)
    fetch('http://192.168.10.202:5000/graphql?query={projetos_por_uf{local,quantidade}}')
    .then((res) => { return res.json() })
    .then((data) => {
        var listOfUfs = {}
        for(let region of data.data.projetos_por_uf){
            listOfUfs[region.local] = region.quantidade;
        }
        self.dataValue = listOfUfs
        //console.log(self.dataValue)
    })     
  },
  watch: {
    months: function () {
        this.makeAction();
    }
},
  methods: {
           changeValueProponente: function () { 
            console.log("Clicou aqui no proponente")
            if(this.proponentesIsActivated){
                fetch('http://192.168.10.202:5000/graphql?query={proponentes_por_uf{local,quantidade}}')
                .then((res) => { return res.json() })
                .then((data) => {
                    this.listOfProponentes = data.data.proponentes_por_uf
                    console.log(this.listOfProponentes)
                })
                console.log("Ativou Proponente")
                this.proponentesIsActivated = false
            }
            else {
                this.listOfProponentes = []
                console.log(this.listOfProponentes)
                this.proponentesIsActivated = true
                console.log("Desativou Proponente")
            }
        },
        changeValueIncentivadores: function () {
            console.log("Clicou aqui no incentivadores")
            if(this.incentivadoresIsActivated){
                fetch('http://api.salic.cultura.gov.br/v1/projetos/?limit=10')
                .then((res) => { return res.json() })
                .then((data) => { 
                    this.listOfIncentivadores = data
                    console.log(this.listOfIncentivadores)
                })
                this.incentivadoresIsActivated = false
                console.log("Ativou Incentivadores")
            }
            else {
                this.listOfIncentivadores = []
                console.log(this.listOfIncentivadores)
                this.incentivadoresIsActivated = true
                console.log("Desativou Incentivadores")
            }
        },
        makeAction: function () {
            console.log("Este é o segmento")
            console.log(this.selected)
            var self = this
            //console.log(this.selected)
            fetch('http://192.168.10.202:5000/graphql?query={projetos_por_uf(segmento:"'+this.selected+'"){local,quantidade}}')
            .then((res) => { return res.json() })
            .then((data) => {
                var listOfUfs = {}
                for(let region of data.data.projetos_por_uf){
                    listOfUfs[region.local] = region.quantidade;
                }
                self.dataValue = listOfUfs
                //console.log(self.dataValue)
            })
        }
  }
};

</script>
















<style>
#modal-button-filter {
  display: block;
  float: right;
  position: relative;
  top: 40px;
  right: 3px;
  z-index: 100;
}

#modal-button-filter i {
  font-size: 11px;
}
/* Custom, iPhone Retina */
@media only screen and (min-width: 320px) {
}

/* Extra Small Devices, Phones */
@media only screen and (min-width: 480px) {
}

/* Small Devices, Tablets */
@media only screen and (min-width: 768px) {
  #modal-button-filter {
    display: none;
  }
}

/* Medium Devices, Desktops */
@media only screen and (min-width: 992px) {
}

/* Large Devices, Wide Screens */
@media only screen and (min-width: 1200px) {
}
ul {
    display: inline;
}
li {
    list-style: none;
}
.item-list-control {
    margin: 30px;
}
.list-buttons {
    margin: 5px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  float:right;
}

/* Hide default HTML checkbox */
.switch input {display:none;}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input.default:checked + .slider {
  background-color: #6EFF26;
  -webkit-box-shadow: 1px 1px 5px 1px #6EFF26;
  box-shadow: 1px 1px 5px 1px #6EFF26;
}
input.primary:checked + .slider {
  background-color: #2196F3;
}
input.success:checked + .slider {
  background-color: #8bc34a;
}
input.info:checked + .slider {
  background-color: #3de0f5;
}
input.warning:checked + .slider {
  background-color: #FFC107;
}
input.danger:checked + .slider {
  background-color: #f44336;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

#desktop-filters{
    display: none;
}

  /* Custom, iPhone Retina */ 
  @media only screen and (min-width : 320px) {
      
  }

  /* Extra Small Devices, Phones */ 
  @media only screen and (min-width : 480px) {

  }

  /* Small Devices, Tablets */
  @media only screen and (min-width : 768px) {
    #desktop-filters{
        display: initial;
    }
  }

  /* Medium Devices, Desktops */
  @media only screen and (min-width : 992px) {
  
  }

  /* Large Devices, Wide Screens */
  @media only screen and (min-width : 1200px) {
  
  }

</style>
