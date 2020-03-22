/*
 * Controlador
 */
var Controlador = function(modelo) {
  this.modelo = modelo;
};

Controlador.prototype = {
  agregarPregunta: function(pregunta, respuestas) {
      if(pregunta === ''){
        alert('Escriba algo para hacer la pregunta');
        return;
      }
      this.modelo.agregarPregunta(pregunta, respuestas);
  },
  borrarPregunta: function(id){
        this.modelo.borrarPregunta(id);
  },
  borrarTodo: function(){

    this.modelo.borrarTodo();
  },

  editarPregunta: function(id){

      
      this.modelo.editarPregunta(id);
  },
  agregarVotos: function(nombrePregunta,RespuestaSeleccionada){

    this.modelo.agregarVotos(nombrePregunta,RespuestaSeleccionada);
  },
 
};
