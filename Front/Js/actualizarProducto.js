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
    
    return true;
  
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
    const now = new Date();
    const dia = `0${now.getDate()}`.slice(-2);
    const mes = `0${now.getMonth() + 1}`.slice(-2);
    const hoy = `${now.getFullYear()}-${mes}-${dia}`;
    let fec = hoy;
    let obs = $("#txtObservaciones").val();
    

  let product = {
    idProducto : idPro,
    descripcion: des,
    precio :prec,
    cantidad : cant,
    idClasificacion: clasif,
    idEstado: idEst,
    fecha : fec,
    observaciones: obs
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

$("#btnCancelarCargarProducto").click(function () {
  swal({
    title: "Desea cancelar la modificación?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      window.location.replace("../Html/listadoProductos.html");
    } else {
    }
  });
})
