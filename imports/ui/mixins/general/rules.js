import { i18n } from "../../../startup/plugins";

const Rules = {
  data(){
    return {
      notEmpty: v => !!v || i18n.t('rules.not_empty'),
      notEmptyArray: v => !!v && Array.isArray(v) && v.length || i18n.t('rules.incorrect_ammount'),
      mustBeNumber: v => (!v || !!Number(v)) || i18n.t('rules.must_be_a_number'),
      currency: v => !!v && !!Number(v.split("$").join("").split(",").join("").split(".").join("")) || i18n.t('rules.must_be_a_number'),
      mustBeBoolean: v => (v===true || v===false) || i18n.t('rules.required')
    }
  }
}

export default Rules;