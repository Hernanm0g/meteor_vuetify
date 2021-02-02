<template lang="html">
  <div class="btn btn-primary jbtn-file">
    <v-btn
      color="accent"
      :fab="fab"
      :icon="icon"
      :small="small"
      :depressed="depressed"
      :loading="loading"
      :disabled="disabled"
    >
      <v-icon>{{ iconText }}</v-icon>
      <template #loader>
        <v-progress-circular
          :indeterminate="!progress"
          :value="progress"
        />
      </template>
    </v-btn>
    <input
      ref="fileInput"
      type="file"
      :disabled="loading || disabled"
      :accept="accept"
      :multiple="multiple"
      @change="fileSelected"
    >
  </div>
</template>

<script lang="js">
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
    },
    loading: {
      type: Boolean,
      default:false
    },
    disabled: {
      type: Boolean,
      default:false
    },
    icon: {
      type: Boolean,
      default:false
    },
    iconText: {
      type: String,
      default: "mdi-camera-plus"
    },
    small: {
      type: Boolean,
      default:false
    },
    fab: {
      type: Boolean,
      default: true
    },
    depressed: {
      type: Boolean,
      default: true
    },
    progress: {
      type: Number,
      default:0
    },
    accept: {
      type: String,
      default:"image/*"
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
