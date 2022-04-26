$("#btnModificarProducto").click(function () {
  function valAltaProducto(){
    let nom = $("#txtNombre").val();
    let des = $("#txtDescripcion").val();
    let clasif = $("#cboClasificacion").val();
    let prec = $("#txtPrecio").val();
    let cant = $("#txtCantidad").val();
  
    if(nom == "")
    {
      swal("Error", "ingrese un nombre", "warning");
      return false;
    }
    if(des == "")
    {
      swal("Error", "ingrese una descripcion", "warning");
      return false;
    }
    if(clasif == null || clasif <= 0)
    {
      swal("Error", "seleccione una clasificación", "warning");
      return false;
    }
    if(prec == null || prec <= 0)
    {
      swal("Error", "ingrese un precio", "warning");
      return false;
    }
    if(cant == null || cant <= 0)
    {
      swal("Error", "ingrese una cantidad", "warning");
      return false;
    }
    

  
  }
  if(valAltaProducto())
  {
    let idPro = $("#txtId").val();
    let nom = $("#txtNombre").val();
    let des = $("#txtDescripcion").val();
    let clasif = $("#cboClasificacion").val();
    let prec = $("#txtPrecio").val();
    let cant = $("#txtCantidad").val();
    let idEst = $('input[name=gridRadios]:checked', '#miForm').val();

  let product = {
    idProducto : idPro,
    nombre: nom,
    descripcion: des,
    precio :prec,
    cantidad : cant,
    idClasificacion: clasif,
    idEstado: idEst
  }

  $.ajax({
    url: 'https://localhost:5001/Producto/actualizarProducto',
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify(product),
    success: function (result) {
      if (result.ok) {
        swal("Felicitaciones!", "Producto actualizado Correctamente!", "success");
        setTimeout(function(){
          window.location.replace("../Html/listadoProductos.html");
      }, 4000);
        
      }
      else
        swal({
          title: "Errors",
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