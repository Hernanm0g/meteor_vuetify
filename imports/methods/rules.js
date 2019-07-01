const Rules = {
  data(){
    return {
      notEmpty: [
        v => !!v || 'Campo requerido'
      ],
      currency: [
        v => !!v || 'Campo requerido',
        v => !!v && !!Number(v.split("$").join("").split(",").join("").split(".").join("")) || "Campo debe ser un número"
      ]
    }
  }
}

export default Rules;
