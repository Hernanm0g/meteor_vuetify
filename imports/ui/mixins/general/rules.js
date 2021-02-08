const Rules = {
  data(){
    return {
      notEmpty: v => !!v || 'Campo requerido',
      notEmptyArray: v => !!v && Array.isArray(v) && v.length || "Monto incorrecto",
      mustBeNumber: v => (!v || !!Number(v)) || "Campo debe ser un número",
      currency: v => !!v && !!Number(v.split("$").join("").split(",").join("").split(".").join("")) || "Campo debe ser un número",
      mustBeBoolean: v => (v===true || v===false) || "Campo requerido"
    }
  }
}

export default Rules;