let myChart;
function grafico(){
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
        let descripciones = [];
        let montos = [];
        for (var i = 0; i < productos.length; i++) {
          let html = "<tr>";
          html += "<td>" + productos[i].producto.descripcion + "</td>"
          html += "<td class='cpoIzquierda'>$" + productos[i].total + "</td>"
          html += "<td class='cpoIzquierda'>" + productos[i].cantidad + "</td>"
  
          html += "</tr>";
  
          descripciones.push(productos[i].producto.descripcion);
          montos.push(productos[i].total);
        }
        const ctx = document.getElementById('myChart');
        if(myChart){
          myChart.destroy();
        }
         myChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: descripciones,
            datasets: [{
              label: 'Total recaudado en Pesos Argentinos',
              data: montos,
              backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(140, 90, 100, 1)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(140, 90, 100, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
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

}

