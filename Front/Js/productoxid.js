const valores = window.location.search;

//Mostramos los valores en consola:
//console.log(valores);

//Resultado:
//?id=valorId

//Creamos la instancia
const urlParams = new URLSearchParams(valores);

//Accedemos a los valores
let data = urlParams.get('id');

$.ajax({
  url: 'https://localhost:5001/Producto/' + data,
  type: "GET",
  success: function (result) {
    if (result.ok) {
      let Producto = result.respuesta;
      $("#txtId").val(Producto.idProducto);
      $("#txtNombre").val(Producto.nombre);
      $("#txtDescripcion").val(Producto.descripcion);
      $("#cboClasificacion").val(Producto.idClasificacion);
      $("#txtPrecio").val(Producto.precio);
      $("#txtCantidad").val(Producto.cantidad);

      if(Producto.idEstado == 1)
      {
        document.querySelector('#rbtEstadoActivo').checked = true;
      }
      else
      document.querySelector('#rbtEstadoInactivo').checked = true;


    }

    else
      swal({
        title: "Error",
        text: result.error,
        icon: "error",
      })
  },
  error: function (result) {

  }
});