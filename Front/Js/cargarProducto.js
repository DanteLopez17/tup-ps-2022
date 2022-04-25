function limpiarCampos(){
  $("#txtNombre").val("");
  $("#txtDescripcion").val("");
  $("#cboClasificacion").val(1);
  $("#txtPrecio").val("");
  $("#txtCantidad").val("");
  $("#rbtEstadoActivo").prop("checked", true);
}

$("#btnCargarProducto").click(function () {
  function valAltaProducto(){
    let nombre = $("#txtNombre").val();
    let desc = $("#txtDescripcion").val();
    let clasif = $("#cboClasificacion").val();
    let prec = $("#txtPrecio").val();
    let cant = $("#txtCantidad").val();
    let activo = $("#rbtEstadoActivo").prop("checked");
    let inactivo = $("#rbtEstadoInactivo").val();
  
    if(nombre == "")
    {
      swal("Error", "ingrese un nombre", "warning");
      return false;
    }
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
  
    swal("Felicitaciones!", "Producto cargado Correctamente!", "success");
    return true
  }


  if(valAltaProducto())
  { 
    let nom = $("#txtNombre").val();
    let desc = $("#txtDescripcion").val();
    let clasif = $("#cboClasificacion").val();
    let prec = $("#txtPrecio").val();
    let cant = $("#txtCantidad").val();
    let idEst = $('input[name=gridRadios]:checked', '#miForm').val();

    let produc = {
      nombre: nom,
      descripcion: desc,
      precio: prec,
      cantidad: cant,
      idClasificacion: clasif,
      idEstado: idEst
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