<template>
  <div class="ph-item" style="border:none">
    <div class="ph-col-12">
      <div v-if="phStyle == 'legend'" class="ph-row">
        <div class="ph-col-6 big"></div>
        <div class="ph-col-4 empty big"></div>
        <div class="ph-col-2 big"></div>
        <div class="ph-col-4"></div>
        <div class="ph-col-8 empty"></div>
        <div class="ph-col-6"></div>
        <div class="ph-col-6 empty"></div>
        <div class="ph-col-12"></div>
        <div class="ph-col-12"></div>
      </div>
      <div v-if="phStyle == 'number'" class="ph-row">
        <div class="ph-col-12"></div>
        <div class="ph-col-12"></div>
        <div class="ph-col-12"></div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "LoadPlaceholder",
  props: {
    phStyle: String,
    contentId: String,
    isVisible: Boolean
  },
  watch: {
    isVisible: {
      handler(flag) {
        if (flag) this.showLoader();
        else this.hideLoader();
      }
    }
  },
  mounted() {
    this.showLoader();
  },
  methods: {
    hideLoader() {
      $(".ph-item").hide();
      $("#" + this.contentId).show();
    },
    showLoader() {
      $(".ph-item").show();
      $("#" + this.contentId).hide();
    }
  }
};
</script>