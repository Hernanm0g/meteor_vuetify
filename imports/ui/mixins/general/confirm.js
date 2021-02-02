import {EventBus} from './event-bus'
export default {
  methods: {
    confirm: async function({title, text}){
      // deploy confirm action
      this.$store.commit("confirm", {title, text});
      let promise = new Promise((resolve) => {
        EventBus.$on('confirmed', (status)=>{
          resolve(status)
        });
      });
      let result = await promise;
      this.$store.commit("deactivateConfirm");
      return result; // "done!"
    },
  }
}
