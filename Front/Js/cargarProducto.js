function limpiarCampos(){
  $("#txtDescripcion").val("");
  $("#cboClasificacion").val(1);
  $("#txtPrecio").val("");
  $("#txtCantidad").val("");
  $("#rbtEstadoActivo").prop("checked", true);
}
$("#btnCancelarCargarProducto").click(function () {
  limpiarCampos();
})

$("#btnCargarProducto").click(function () {
  function valAltaProducto(){
    let desc = $("#txtDescripcion").val();
    let clasif = $("#cboClasificacion").val();
    let prec = $("#txtPrecio").val();
    let cant = $("#txtCantidad").val();
    let activo = $("#rbtEstadoActivo").prop("checked");
    let inactivo = $("#rbtEstadoInactivo").val();
  
    if(desc == "")
    {
      swal("Error", "ingrese una descripcion", "warning");
      return false;
    }
    if(clasif == null || clasif <= 0)
    {
      swal("Error", "seleccione una clasificación", "warning");
      return false;
    }
    if(prec == "" || prec <= 0 || prec == null)
    {
      swal("Error", "ingrese un precio valido", "warning");
      return false;
    }
    if(cant == "" || cant <= 0)
    {
      swal("Error", "ingrese una cantidad valida ", "warning");
      return false;
    }
    return true
  }

  if(valAltaProducto())
  { 
    let desc = $("#txtDescripcion").val();
    let clasif = $("#cboClasificacion").val();
    let prec = $("#txtPrecio").val();
    let cant = $("#txtCantidad").val();
    let idEst = $('input[name=gridRadios]:checked', '#miForm').val();
    
    const now = new Date();
    const dia = `0${now.getDate()}`.slice(-2);
    const mes = `0${now.getMonth() + 1}`.slice(-2);
    const hoy = `${now.getFullYear()}-${mes}-${dia}`;
    let fechaAlta = hoy;

    let produc = {
      descripcion: desc,
      precio: prec,
      cantidad: cant,
      idClasificacion: clasif,
      idEstado: idEst,
      fecha : fechaAlta,
      observaciones: "Añadido"
    }

  $.ajax({
    url: 'https://localhost:5001/Producto/cargarProducto',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(produc),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Producto cargado Correctamente!", "success");
        limpiarCampos();
      }
      else
        swal({
          title: "Error",
          text: result.error,
          icon: "error",
        })
    },
    error: function (result) {
      swal({
        title: "Error",
        text: result.error,
        icon: "error",
      })
    }
  });
  }
  
})