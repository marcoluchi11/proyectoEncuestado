/*
 * Modelo
 */
var Modelo = function() {
  if(localStorage.length === 0){
  this.preguntas = [];
}else{

    this.preguntas = JSON.parse(localStorage.getItem('preguntas'));
}
  this.ultimoId = 0;

  //inicializacion de eventos
  this.preguntaAgregada = new Evento(this);
  this.preguntaEliminada = new Evento(this);
  this.todoBorrado = new Evento(this);
  this.preguntaEditada = new Evento(this);
  this.respuestaAgregada = new Evento(this);
  this.votoAgregado = new Evento(this);
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
    this.guardar();
    this.preguntaEliminada.notificar();
  },
  agregarVotos: function(idPregunta,textRespuesta){

    var question = this.preguntas.findIndex(i => i.id === idPregunta);

   var rta = modelo.preguntas[question].cantidadPorRespuesta.find(i => i.textoRespuesta === textRespuesta);
    rta.cantidadRespuestas++;
    this.guardar();
    this.votoSumado.notificar();
  },
  agregarRespuesta: function(idPregunta, textRespuesta){

      var question = this.preguntas.findIndex(i => i.id === idPregunta);
      this.preguntas[question].cantidadPorRespuesta.push({'textoRespuesta': textRespuesta, 'cantidadRespuestas': 0});
      this.guardar();
      this.respuestaAgregada.notificar();

  },
  editarPregunta: function(id){
    var index = this.preguntas.findIndex(i => i.id === id);
    this.preguntas[index].textoPregunta = prompt('Edite la respuesta');
    this.guardar();
    this.preguntaEditada.notificar();
  },
  borrarTodo: function(){
          this.preguntas = [];
          localStorage.clear();
          this.todoBorrado.notificar();
  },
  //se guardan las preguntas
  guardar: function(){
    localStorage.setItem('preguntas', JSON.stringify(this.preguntas));
  },
};
