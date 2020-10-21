import moment from 'moment'
import 'moment/locale/es'  // without this line it didn't work
moment.locale('es')
const datetime = {
  filters : {
    getAge(d){
      return  moment().diff(d, 'years',false);
    },
    toISODate(d){
      if (!d) {
        return ""
      }
      return moment(d).format("YYYY-MM-DD")
    },
    toDate(d){
      if (!d) return ""
      if (moment(d).isSame(moment(new Date(false)))) {
        return ""
      }
      return moment(d).format("DD MMM YYYY")
    },
    toDateTime(dt){
      if (!dt) return
      return moment(dt).format("DD MMM YYYY hh:mm A")
    },
    fromNow(d, hideSuffix=false){
      return moment(d).fromNow(hideSuffix);
    },
    nextMonday(){
      return moment().add(1, 'weeks').startOf("week").format("DD MMM YYYY")
    }
  },
  methods: {
    toDate(d){
      return moment(d).toDate()
    },
    getDateTime(){
      return moment().format("DD MMM YYYY hh:mm A")
    },
    getTimeFromNow(date, n="7",t="days"){
      return moment(date).add(n, t,false).fromNow();
    },
    getDateFormat(date, format="DD MMM YYYY"){
      return moment(date).format(format)
    },
    getStartOfDate(date, type="day"){
      return moment(date).startOf(type).toDate()
    },
    getHoursBetweenTimes(t1, t2){
      const startTime = moment(t1, "HH:mm");
      const endTime = moment(t2, "HH:mm");
      const duration = moment.duration(endTime.diff(startTime));
      return Math.round(Number((duration.asHours())));
    },
    checkIfIsBetween(d,t1,t2){
      const startTime = moment(t1, "HH:mm");
      const endTime = moment(t2, "HH:mm");
      return moment(d, "HH:mm").isBetween(startTime, endTime)
    }
  },
}

export default datetime;
