import { Meteor } from 'meteor/meteor';
import Vue from 'vue';
import { EventBus } from '/imports/methods/event-bus.js';
import moment from 'moment'
const global = {
  computed : {
    authenticated(){
      return this.$store.state.authenticated;
    }
  },
  filters : {
    toISODate(d){
      return moment(d).format("YYYY-MM-DD")
    },
    toDate(d){
      return moment(d).format("DD MMM YYYY")
    },
    toDateTime(dt){
      return moment(dt).format("DD MMM YYYY hh:mm A")
    }
  },
  methods: {
    confirm: async function(title, text){
      self=this;
      // deploy confirm action
      this.$store.commit("confirm", {title, text});
      let promise = new Promise((resolve, reject) => {
        EventBus.$on('confirmed', (status)=>{
          resolve(status)
        });
      });
      let result = await promise;
      this.$store.commit("deactivateConfirm");
      return result; // "done!"
    }
  }
}

export default global;
