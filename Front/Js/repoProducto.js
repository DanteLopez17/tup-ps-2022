$("#btnConsultar").click(function(){
  $("#listProductosRepo").empty();
  const now = new Date();
  const dia = `0${now.getDate()}`.slice(-2);
  const mes = `0${now.getMonth() + 1}`.slice(-2);
  const hoy = `${now.getFullYear()}-${mes}-${dia}`;

  let fechaDesde = $("#dtpFecDesde").val();
  let fechaHasta = $("#dtpFecHasta").val();
  if(fechaDesde == "" )
  {
    fechaDesde = "1900-01-01";
  }
  if(fechaHasta == "")
  {
    fechaHasta = hoy;
  }
  if(fechaDesde > fechaHasta){
    swal("Fechas ingresadas incorrectas!")
    return false;
  }
  if(fechaDesde > hoy ){
    swal("Fecha desde incorrecta!");
    return false;
  }
  
  if(fechaHasta > hoy){
    swal("Fecha hasta incorrecta!");
    return false;
  }

  $.ajax({
    url: 'https://localhost:5001/Reporte/articulosMasVendidos?param1='+ fechaDesde + '&param2=' + fechaHasta,
    type: "GET",
    success: function (result) {
      if (result.ok) {
        let productos = result.respuesta;

        for (var i = 0; i < productos.length; i++) {
          let html = "<tr>";
          html += "<td>" + productos[i].producto.descripcion + "</td>"
          html += "<td>" + productos[i].producto.clasificacion + "</td>"
          html += "<td class='cpoIzquierda'>$" + productos[i].total + "</td>"
          html += "<td class='cpoIzquierda'>" + productos[i].cantidad + "</td>"

          html += "</tr>";
  
          $("#listProductosRepo").append(html);
        }
        document.getElementById("download").removeAttribute("hidden");
      }
  
      else
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: result.error
        })
    },
    error: function (result) {
  
    }
  });
})

