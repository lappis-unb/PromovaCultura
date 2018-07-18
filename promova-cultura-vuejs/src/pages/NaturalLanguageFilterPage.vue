<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8">
                {{dataMap}}
            </div>
            <div class="col-sm-4">
              <natural-filter-language @getDataMap="getDataMap"/>
            </div>
        </div>
    </div>
</template>

<script>
import NaturalLanguageFilter from "@/components/NaturalLanguageFilter/NaturalLanguageFilter";
import BrazilMap from "@/components/Map/MapComponent";
import $ from "jquery";

export default {
  name: "NaturalLanguageFilter",
  components: {
    "natural-filter-language": NaturalLanguageFilter,
    "brazil-map": BrazilMap
  },
  data() {
    return {
      dataMap: {}
    };
  },
  methods: {
    getDataMap(data) {
      console.log(data);
      this.dataMap = data;
    }
  }
};
</script>
