/*
 * Vista administrador
 */
var VistaAdministrador = function(modelo, controlador, elementos) {
  this.modelo = modelo;
  this.controlador = controlador;
  this.elementos = elementos;
  var contexto = this;

  // suscripción de observadores
  this.modelo.preguntaAgregada.suscribir(function() {
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEliminada.suscribir(function() {
     contexto.reconstruirLista(); 
    });
  this.modelo.todoBorrado.suscribir(function(){
    contexto.reconstruirLista();
  });
  this.modelo.preguntaEditada.suscribir(function(){
      contexto.reconstruirLista();
  });
};


VistaAdministrador.prototype = {
  //lista
  inicializar: function() {
    this.reconstruirLista();
    this.configuracionDeBotones();
    //llamar a los metodos para reconstruir la lista, configurar botones y validar formularios
    validacionDeFormulario();
  },

  construirElementoPregunta: function(pregunta){
    //[{'textoPregunta': 'Mi primer Pregunta', 'id': 0, 'cantidadPorRespuesta': [{'textoRespuesta': 'mi unica respuesta', 'cantidad': 2}]}]
    var contexto = this;
    var nuevoItem;
    nuevoItem = $('<li class="list-group-item"></li>');
    nuevoItem.attr('id',pregunta.id);
    nuevoItem.attr('texto',pregunta.textoPregunta);
    //completar
    //asignar a nuevoitem un elemento li con clase "list-group-item", id "pregunta.id" y texto "pregunta.textoPregunta"
    var interiorItem = $('.d-flex');
    var titulo = interiorItem.find('h5');
    titulo.text(pregunta.textoPregunta);
    interiorItem.find('small').text(pregunta.cantidadPorRespuesta.map(function(resp){
      return " " + resp.textoRespuesta;
    }));
    nuevoItem.html($('.d-flex').html());
    return nuevoItem;

  },

  reconstruirLista: function() {
    var lista = this.elementos.lista;
    lista.html('');
    var preguntas = this.modelo.preguntas;
    for (var i=0;i<preguntas.length;++i){
      lista.append(this.construirElementoPregunta(preguntas[i]));
    }
  },

  configuracionDeBotones: function(){
    var e = this.elementos;
    var contexto = this;

    //asociacion de eventos a boton
    e.botonAgregarPregunta.click(function() {
      var value = e.pregunta.val();
      var respuestas = [];

      $('[name="option[]"]').each(function() {
        //completar
        if($(this).val() != ""){
        respuestas.push({ textoRespuesta: $(this).val(), cantidadRespuestas: 0 });
          }
      })
      contexto.limpiarFormulario();
      contexto.controlador.agregarPregunta(value, respuestas);
    });
    //asociar el resto de los botones a eventos
    e.botonBorrarPregunta.click(function(){

      var id = parseInt($('.list-group-item.active').attr('id'));
        contexto.controlador.borrarPregunta(id);
    });
    e.borrarTodo.click(function(){
        contexto.controlador.borrarTodo();
    });
    e.botonEditarPregunta.click(function(){
          var id = parseInt($('.list-group-item.active').attr('id'));
          contexto.controlador.editarPregunta(id);
    });
  },

  limpiarFormulario: function(){
    $('.form-group.answer.has-feedback.has-success').remove();
  },
};
