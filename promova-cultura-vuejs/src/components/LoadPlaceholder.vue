<template>
  <div class="ph-item">
    <div class="ph-col-12">
      <div v-if="phStyle == 'legend'" class="ph-row" style="margin: 0;">
        <div class="ph-col-2 empty">
          <div class="ph-avatar"></div>
        </div>
        <div class="ph-col-10 big"></div>
        <div class="ph-col-2 empty">
          <div class="ph-avatar"></div>
        </div>
        <div class="ph-col-10 big"></div>
        <div class="ph-col-2 empty">
          <div class="ph-avatar"></div>
        </div>
        <div class="ph-col-10 big"></div>
        <div class="ph-col-2 empty">
          <div class="ph-avatar"></div>
        </div>
        <div class="ph-col-10 big"></div>
        <div class="ph-col-2 empty">
          <div class="ph-avatar"></div>
        </div>
        <div class="ph-col-10 big"></div>

      </div>

      <div v-if="phStyle == 'number'" class="ph-row">
        <div class="offset-4 ph-col-4"></div>
        <div class="ph-col-12 big"></div>
        <div class="offset-4 ph-col-4"></div>
        <div class="ph-col-12 big"></div>
        <div class="offset-4 ph-col-4"></div>
        <div class="ph-col-12 big"></div>
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

<style>
.ph-item {
  border:none;
  margin: 0;
  padding: 10px 0 0 0;
}

.ph-col-2 .ph-avatar {
  height: 21px;
  min-width: 0;
  width: 21px;
}


</style>
