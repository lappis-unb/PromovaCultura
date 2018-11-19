<template>
    <div class="content">
        <form id="nl-form" class="nl-form">
            Eu quero ver
            <select name="location-filter" class="nl-form" v-model="selectedLocation">
              <option v-for="informationOfLocation in location" :value="informationOfLocation.value" :key="informationOfLocation.text">
                {{ informationOfLocation.text }}
              </option>
            </select>
            <select name="projectOrPreproject-filter" class="nl-form" v-model="selectedProjectOrPreproject">
              <option v-for="pp in projectOrPreproject" :value="pp.value" :key="pp.text">
                {{ pp.text }}
              </option>
            </select>
            de
            <select name="area-filter" class="nl-form" v-model="selectedArea">
              <option v-for="a in area" :value="a.value" :key="a.text">
                {{ a.text }}
              </option>
            </select>
            que
            <select name="status-filter" class="nl-form" v-model="selectedStatus">
              <option v-for="s in status" :value="s.value" :key="s.text">
                {{ s.text }}
              </option>
            </select>
            em
            <input type="text" value="" placeholder="qualquer momento" data-subline="Insira um ano" />
            <div class="nl-submit-wrap">
              <button id="fetch-button" class="nl-submit" type="button">Mostre</button>
            </div>
            <div class="nl-overlay"></div>
        </form>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      selectedLocation: "UF",
      selectedProjectOrPreproject: "projetos",
      selectedArea: "",
      selectedStatus: "cadastrado",
      location: [
        { value: "UF", text: "onde aconteceram" },
        { value: "UF", text: "de onde vieram" },
        { value: "UF", text: "onde estão os proponentes com" },
        { value: "UF", text: "de onde veio o incentivo para" },
        { value: "UF", text: "onde estão os fornecedores envolvidos com" }
      ],
      projectOrPreproject: [
        { value: "projetos", text: "projetos aceitos" },
        { value: "propostas", text: "propostas de projeto" }
      ],
      area: [
        { value: "", text: "todas as áreas" },
        { value: "Música", text: "Música" },
        { value: "Audiovisual", text: "Audiovisual" },
        { value: "Artes Cênicas", text: "Artes Cênicas" },
        { value: "Artes Integradas", text: "Artes Integradas" }
      ],
      status: [
        { value: "cadastrado", text: "foram cadastrados(as)" },
        { value: "aceit", text: "foram aceitas" },
        { value: "rejeitad", text: "rejeitadas" },
        { value: "executados", text: "serão executados" },
        { value: "conclui", text: "concluíram a execução" },
        { value: "análise de admissão", text: "estão em análise de admissão" },
        { value: "aprovado", text: "tiveram resultados totalmente aprovados" },
        { value: "reprovado", text: "tiveram resultados totalmente reprovados" }
      ],
      dataNatural: {}
    };
  },
  mounted: function() {
    const submitButton = document.querySelector("#fetch-button");

    submitButton.addEventListener("click", () => {
      // alert(
      //   "Eu quero ver " +
      //     this.selectedLocation +
      //     " " +
      //     this.selectedProjectOrPreproject +
      //     " de " +
      //     this.selectedArea +
      //     " que " +
      //     this.selectedStatus +
      //     " em "
      // );

      let query = `query {
            ${this.selectedProjectOrPreproject}(area: "${
        this.selectedArea
      }", situacao:"${this.selectedStatus}") {
              UF
              nome
              area
              situacao
              data_inicio
              data_termino
            }
          }
        `;

      var self = this;
      // $.post("https://salic.dev.lappis.rocks/graphql", {
      //   query: query
      // }).then(response => {
      //   let data = undefined;
      //   if (this.selectedProjectOrPreproject === "projetos") {
      //     data = response.data.projetos;
      //   } else {
      //     data = response.data.propostas;
      //   }
      //   console.log(data);
      //   let totalUfs = data.reduce((acc, curr) => {
      //     if (acc[curr.UF] === undefined) {
      //       acc[curr.UF] = 1;
      //     } else {
      //       acc[curr.UF] += 1;
      //     }
      //     return acc;
      //   }, {});

      //   console.log(totalUfs);
      //   self.dataNatural = totalUfs;
      //   this.$emit("getDataMap", self.dataNatural);
      // });
    });
  }
};
</script>

<style>
.location-filter {
  width: 12px;
}

/* general style for the form */
.nl-form {
  width: auto;
  margin: 0.3em auto 0 auto;
  font-size: 1.3em;
  line-height: 1.5;
}

.nl-form ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

/* normalize the input elements, make them look like everything else */
.nl-form input,
.nl-form select,
.nl-form button {
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  font-weight: inherit;
  line-height: inherit;
  display: inline-block;
  padding: 0;
  margin: 0;
  -webkit-appearance: none;
  -moz-appearance: none;
}

.nl-form input:focus {
  outline: none;
}

/* custom field (drop-down, text element) styling  */
.nl-field {
  display: inline-block;
  position: relative;
}

.nl-field.nl-field-open {
  z-index: 10000;
}

/* the toggle is the visible part in the form */
.nl-field-toggle,
.nl-form input,
.nl-form select {
  line-height: inherit;
  display: inline-block;
  color: #59798e;
  cursor: pointer;
  border-bottom: 0.1px dashed #59798e;
}

/* drop-down list / text element */
.nl-field ul {
  position: absolute;
  visibility: hidden;
  background: #76c3bd;
  left: -0.5em;
  top: 50%;
  font-size: 80%;
  opacity: 0;
  -webkit-transform: translateY(-40%) scale(0.9);
  -moz-transform: translateY(-40%) scale(0.9);
  transform: translateY(-40%) scale(0.9);
  -webkit-transition: visibility 0s 0.3s, opacity 0.3s, -webkit-transform 0.3s;
  -moz-transition: visibility 0s 0.3s, opacity 0.3s, -moz-transform 0.3s;
  transition: visibility 0s 0.3s, opacity 0.3s, transform 0.3s;
}

.nl-field.nl-field-open ul {
  visibility: visible;
  opacity: 1;
  -webkit-transform: translateY(-50%) scale(1);
  -moz-transform: translateY(-50%) scale(1);
  transform: translateY(-50%) scale(1);
  -webkit-transition: visibility 0s 0s, opacity 0.3s, -webkit-transform 0.3s;
  -moz-transition: visibility 0s 0s, opacity 0.3s, -moz-transform 0.3s;
  transition: visibility 0s 0s, opacity 0.3s, transform 0.3s;
}

.nl-field ul li {
  color: #fff;
  position: relative;
}

.nl-dd ul li {
  padding: 0 1.5em 0 0.5em;
  cursor: pointer;
  white-space: nowrap;
}

.nl-dd ul li.nl-dd-checked {
  color: #478982;
}

.no-touch .nl-dd ul li:hover {
  background: rgba(0, 0, 0, 0.05);
}

.no-touch .nl-dd ul li:hover:active {
  color: #478982;
}

/* icons for some elements */
.nl-dd ul li.nl-dd-checked:before,
.nl-submit:before,
.nl-field-go:before {
  font-family: "nlicons";
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  -webkit-font-smoothing: antialiased;
}

.nl-dd ul li.nl-dd-checked:before {
  content: "\e000";
  position: absolute;
  right: 1em;
  font-size: 50%;
  line-height: 3;
}

.nl-ti-text ul {
  min-width: 8em;
}

.nl-ti-text ul li.nl-ti-input input {
  width: 100%;
  padding: 0.2em 2em 0.2em 0.5em;
  border-bottom: none;
  color: #fff;
}

.nl-form .nl-field-go {
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.1);
  width: 1.8em;
  text-align: center;
  color: transparent;
}

.nl-field-go:before {
  content: "\e001";
  font-size: 75%;
  color: #fff;
  width: 100%;
  line-height: 2.5;
  display: block;
}

/* custom placeholder color */
/* 
input::-webkit-input-placeholder {
	color: rgba(255,255,255,0.8);
}
input:active::-webkit-input-placeholder ,
input:focus::-webkit-input-placeholder {
	color: rgba(255,255,255,0.2);
}
input::-moz-placeholder {
	color: rgba(255,255,255,0.8);
} */

input::placeholder {
  color: #777;
}

input:active::-moz-placeholder,
input:focus::-moz-placeholder {
  color: rgba(255, 255, 255, 0.2);
}

input:-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.8);
}

input:active::-ms-input-placeholder,
input:focus::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.2);
}

/* example field below text input */
.nl-ti-text ul li.nl-ti-example {
  font-size: 40%;
  font-style: italic;
  font-weight: 400;
  padding: 0.4em 1em;
  color: rgba(0, 0, 0, 0.2);
  border-top: 1px dashed rgba(255, 255, 255, 0.7);
}

.nl-ti-text ul li.nl-ti-example em {
  color: #fff;
}

/* submit button */
.nl-submit-wrap {
  margin-top: 0.4em;
}

.nl-form .nl-submit {
  line-height: 3;
  text-transform: uppercase;
  cursor: pointer;
  position: relative;
  background: #76c3bd;
  color: #fff;
  padding: 0 1em 0 0;
  font-size: 40%;
  font-weight: bold;
  letter-spacing: 3px;
}

.nl-submit:before {
  content: "\e001";
  color: #fff;
  float: left;
  padding: 0 0.7em;
  margin: 0 0.8em 0 0;
  background: #69b1a9;
}

.no-touch .nl-form .nl-submit:hover,
.no-touch .nl-form .nl-submit:active {
  background: #69b1a9;
}

.no-touch .nl-form .nl-submit:hover:before {
  background: #58a199;
}

/* overlay becomes visible when a field is opened */
.nl-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 9999;
  visibility: hidden;
  -webkit-transition: visibility 0s 0.3s, opacity 0.3s;
  -moz-transition: visibility 0s 0.3s, opacity 0.3s;
  transition: visibility 0s 0.3s, opacity 0.3s;
}

.nl-field.nl-field-open ~ .nl-overlay {
  opacity: 1;
  visibility: visible;
  -webkit-transition-delay: 0s;
  -moz-transition-delay: 0s;
  transition-delay: 0s;
}
</style>
