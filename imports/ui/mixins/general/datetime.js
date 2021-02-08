import {DateTime} from 'luxon'
const datetime = {
  filters : {
    getAge(d){
      const now = DateTime.local()
      const date = DateTime.fromISO(new Date(d).toISOString())
      return  Math.round(now.diff(date,"years").toObject().years)
    },
    toISODate(d){
      if (!d) {
        return ""
      }
      const date = DateTime.fromISO(new Date(d).toISOString())
      return date
        .toFormat('yyyy-MM-dd')
    },
    toDate(d){
      if (!d) return ""
      const date = DateTime.fromISO(new Date(d).toISOString())
      return date
        .toFormat('dd MMMM yyyy')
    },
    toLocaleDate(d){
      if (!d) return ""
      let date = DateTime.fromISO(new Date(d).toISOString())
      console.log("ld0", date);
      date.plus({minutes: -300})
      console.log("ld1", date);
      return date
        .toFormat('dd MMMM yyyy')
    },
    toDateTime(d){
      if (!d) return
      const date = DateTime.fromISO(new Date(d).toISOString())
      return date
        .toFormat("dd MMM yyyy hh:mm:ss a")
    },
    fromNow(d, hideSuffix=false){
      const date = DateTime.fromISO(new Date(d).toISOString())
      return date.toRelative({style:hideSuffix ? 'narrow': 'short'})
    }
  },
  methods: {
    toDate(d){
      return new Date(d)
    },
    toLocaleDate(d){
      if (!d) return ""
      let date = DateTime.fromISO(new Date(d).toISOString())
      date =  date.plus({minutes: -date.offset})
      return new Date(date.toISO())
    },
    getDateTime(){
      const date = DateTime.local()
      return date
        .toFormat("dd MMM yyyy hh:mm:ss a")
    },
    getDateFormat(d, format="dd MMM yyyy"){
      const date = DateTime.fromISO(new Date(d).toISOString())
      return date
        .toFormat(format)
    }
  },
}

export default datetime;
