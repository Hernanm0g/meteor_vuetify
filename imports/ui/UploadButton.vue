<template lang="html">
  <div class="btn btn-primary jbtn-file">
    <v-btn icon dark>
      <v-icon>add_a_photo</v-icon>
    </v-btn>
    <input
    type="file" @change="fileSelected"
    ref="fileInput" accept="image/*" :multiple="multiple">
  </div>
</template>

<script>
export default {
  name:"UploadButton",
  props: {
    activate: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    fileSelected:function(e) {
      if (e.target.files.length) {
        this.$emit("selected-callback",e.target.files);
      } else {
        this.$emit("selected-callback",null);
      }
    }
  }
}
</script>

<style scoped>
  .jbtn-file {
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .jbtn-file input[type=file] {
    position: absolute;
    top: 0;
    right: 0;
    min-width: 100%;
    min-height: 100%;
    text-align: right;
    filter: alpha(opacity=0);
    opacity: 0;
    outline: none;
    cursor: inherit;
    display: block;
  }
</style>
