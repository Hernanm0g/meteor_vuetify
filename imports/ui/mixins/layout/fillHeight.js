export default {
  computed: {
    fillHeight(){
      if(!this.$route) return false
      return !!this.$route.meta.fillHeight
    }
  }
}