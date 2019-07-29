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
        :label="label"
        prepend-icon="event"
        readonly>
      </v-text-field>
    </template>

    <v-date-picker
      ref="picker"
      v-model="pickerDate"
      :max="max"
      :min="min"
      color="primary"
      first-day-of-week="1"
      @change="close">
    </v-date-picker>
  </v-menu>
</template>

<script>
import Rules from '/imports/methods/rules'
import moment from 'moment'
export default {
  name:"DatePicker",
  data(){
    return {
      menu:false
    }
  },
  computed: {
    pickerDate: {
      get(){
        return this.date;
      },
      set(d){
        this.updateValue(d);
      }
    },
    formattedDate() {
      return this.date ? moment(this.date).format('DD MMM YYYY') : ''
    }
  },
  mixins: [Rules],
  props: {
    date: {
      type: String,
      default: "2019-01-01"
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
    max: {
      type: String,
      default: new Date().toISOString().substr(0, 10)
    },
    min: {
      type: String,
      default: "1900-01-01"
    }
  },
  methods: {
    close(){
      this.menu = false;
    },
    updateValue(d){
      this.$emit('input', moment(d).toDate());
    }
  }
}
</script>

<style lang="css" scoped>
</style>
