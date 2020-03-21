/*
 * Modelo
 */
var Modelo = function() {
  this.preguntas = [];
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this)
};

Modelo.prototype = {
  //se obtiene el id más grande asignado a una pregunta
  obtenerUltimoId: function() {

    if(this.preguntas.length === 0){
        return -1;
    } else{
      return this.preguntas.length - 1;
    }
  },

  //se agrega una pregunta dado un nombre y sus respuestas
  agregarPregunta: function(nombre, respuestas) {
    var id = this.obtenerUltimoId();
    id++;
    var nuevaPregunta = {'textoPregunta': nombre, 'id': id, 'cantidadPorRespuesta': respuestas};
    this.preguntas.push(nuevaPregunta);
    this.guardar();
    this.preguntaAgregada.notificar();
  },
  borrarPregunta: function(idABorrar){
    var index = this.preguntas.findIndex(i => i.id === idABorrar);
    this.preguntas.splice(index,1);
    this.preguntaEliminada.notificar();
  },
  agregarRespuesta: function(){
    
  },
  eliminarPregunta: function (){

  },
  sumarVoto: function(){

  },
  editarPregunta: function(){

  },
  borrarTodasLasPreguntas: function(){


  },
  //se guardan las preguntas
  guardar: function(){
  },
};
