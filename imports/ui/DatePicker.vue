<template lang="html">
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    full-width
    min-width="290px">
    <template v-slot:activator="{on}">
      <v-text-field
        v-on="on"
        :value="formattedDate"
        :required="required"
        :rules="rules"
        :label="solo ? '' : label"
        :prepend-icon="solo ? '' : 'event'"
        :single-line="singleLine"
        :full-width="fullWidth"
        :clearable="clearable"
        :hide-details="hideDetails"
        :solo="solo"
        :flat="flat"
        @click:clear="clear"
        readonly>
      </v-text-field>
    </template>
    <v-date-picker
      ref="picker"
      v-model="pickerDate"
      :max="max | toISODate"
      :min="min | toISODate"
      color="primary darken-1"
      first-day-of-week="1"
      @change="close"
      locale="es"
      :readonly="readonly">
    </v-date-picker>
  </v-menu>
</template>

<script>
import Rules from '/imports/methods/rules'
import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')
export default {
  name:"DatePicker",
  data(){
    return {
      menu:false
    }
  },
  watch: {
    menu (val) {
      if (this.birthdate) {
        val && setTimeout(() => (this.$refs.picker.activePicker = 'YEAR'))
      }
    }
  },
  computed: {
    pickerDate: {
      get(){
        if (!this.value) {
          return null
        }
        return moment(this.value).format('YYYY-MM-DD');
      },
      set(d){
        this.updateValue(d);
      }
    },
    formattedDate() {
      return this.value ? moment(this.value).format('DD MMM YYYY') : null
    }
  },
  mixins: [Rules],
  props: {
    value: {
      type: String,
      default: null
    },
    current: {
      type: Boolean,
      default: false
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
      default: "Date"
    },
    required: {
      type: Boolean,
      default: false
    },
    fullWidth: {
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
      type: String,
      default: null
    },
    min: {
      type: String,
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
    clearable: {
      type: Boolean,
      default: false
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
      this.$emit('input', moment(d).toISOString());
    },
    clear(){
      this.$emit('input', null);
    }
  }
}
</script>

<style lang="css" scoped>
</style>
