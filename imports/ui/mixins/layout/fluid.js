export default {
  computed: {
    fluid(){
      if(!this.$route) return false
      return !!this.$route.meta.fluid
    }
  }
}