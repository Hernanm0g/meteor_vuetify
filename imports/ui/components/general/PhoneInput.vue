<template lang="html">
  <v-row dense>
    <v-col
      cols="5"
      md="4"
      lg="3"
    >
      <v-autocomplete
        v-model="code"
        :rules="rules"
        :readonly="readonlyDialCode || readonly"
        :outlined="outlined"
        class="caption"
        prepend-inner-icon="mdi-cellphone-android"
        menu-props="auto"
        hide-details
        :items="countries"
        :item-text="!readonlyDialCode ? 'label' : 'dial_code'"
        item-value="dial_code"
        autocomplete="off"
      />
    </v-col>
    <v-col>
      <v-text-field
        v-model="phone"
        :prefix="code"
        :rules="rules"
        :readonly="readonly"
        :hide-details="hideDetails"
        :label="label"
        :outlined="outlined"
        :hint="hint"
        type="tel"
        @keyup.enter="$emit('enter')"
      />
    </v-col>
  </v-row>
</template>

<script lang="js">
import CountryCodesMixin from '../../mixins/general/countrycodes'
import {map} from 'lodash'
export default {
  name:"PhoneInput",
  mixins: [
    CountryCodesMixin
  ],
  props: {
    rules: {
      type: Array,
      default: ()=>([])
    },
    value: {
      type: String,
      default:""
    },
    label: {
      type: String,
      default:"Teléfono"
    },
    dialCode: { // ignore warning
      type: String,
      default:"+1"
    },
    hideDetails: {
      type: Boolean,
      default: false
    },
    outlined: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    readonlyDialCode: {
      type: Boolean,
      default: false
    },
    hint: {
      type: String,
      default:"p.e: +57 3143335255"
    }
  },
  computed: {
    code: {
      get(){
        return this.dialCode
      },
      set(c){
        if(!c){
          return
        }
        this.$emit("set-code", c)
      }
    },
    phone: {
      get(){
        return this.value
      },
      set(p){
        this.$emit("set-code", this.code)
        this.$emit("input",p)
      }
    },
    countries(){
      return map(this.countryCodes, (v) => {
        v.label = v.dial_code+" "+v.name
        return v
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
