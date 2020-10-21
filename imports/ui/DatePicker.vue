<template lang="html">
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{on}">
      <v-text-field
        :class="smallText ? 'body-2':''"
        :value="formattedDate"
        :required="required"
        :rules="rules"
        :label="label"
        :prepend-icon="solo ? '' : 'mdi-calendar'"
        :single-line="singleLine"
        :clearable="clearable"
        :hide-details="hideDetails"
        :solo="solo"
        :flat="flat"
        :dense="dense"
        readonly
        :disabled="disabled"
        v-on="on"
        @click:clear="clear"
      />
    </template>
    <v-date-picker
      ref="picker"
      v-model="pickerDate"
      :max="max | toISODate"
      :min="min | toISODate"
      color="primary darken-1"
      first-day-of-week="1"
      locale="es"
      :disabled="readonly"
      :type="type"
      @change="close"
    />
  </v-menu>
</template>

<script>
import Rules from '../methods/rules'
import datetimeMixin from '../methods/datetime'
export default {
  name:"DatePicker",
  mixins: [datetimeMixin, Rules],
  props: {
    value: {
      default: undefined,
      type: Date
    },
    type: {
      type: String,
      default: "date"
    },
    birthdate: {
      type: Boolean,
      default: false
    },
    rules: {
      type: Array,
      default: function(){return []}
    },
    label: {
      type: String,
      default: "Fecha"
    },
    required: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    },
    flat: {
      type: Boolean,
      default: false
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    max: {
      type: Date,
      default: null
    },
    min: {
      type: Date,
      default: null
    },
    singleLine: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    smallText: {
      type: Boolean,
      default: false
    },
    dense: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: "dateFormat"
    }
  },
  data(){
    return {
      menu:false
    }
  },
  computed: {
    pickerDate: {
      get(){
        if (!this.value) {
          return null
        }
        return this.$options.filters.toISODate(this.value);
      },
      set(d){
        this.updateValue(d);
      }
    },
    formattedDate() {
      if (this.format == "creditCardFormat") {
        return this.value ? this.getCreditCardFormat(this.value) : null
      }
      return this.value ? this.getDateFormat(this.value) : null
    }
  },
  watch: {
    menu (val) {
      if (this.birthdate) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    },
    formattedDate(f){
      this.$emit('set-formatted-date', f || undefined)
    }
  },
  methods: {
    close(){
      this.menu = false;
    },
    updateValue(d){
      if (!d) {
        this.$emit("input", null);
        return
      }
      this.$emit('input', this.toDate(d));
    },
    clear(){
      this.$emit('input', null);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
