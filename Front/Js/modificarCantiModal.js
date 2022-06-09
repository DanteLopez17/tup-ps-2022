$("#btnModifModal").click(function () {
  let id = $("#txtIdProdu").val();
  let cant = $("#txtCantModal").val();
  if(cant <= 0)
  {
    swal("Error!", "Cantidad ingresada incorrecta!", "info");
    return false;
  }
  // Voy a tener que llamar de nvo al listado de productos
  $.ajax({
    url: 'https://localhost:5001/Producto/' + id,
    type: "GET",
    success: function (result) {
      if (result.ok) {
        let ProductoBD = result.respuesta;
        // cantidad
        if (cant > ProductoBD.cantidad) {
          swal("Error!", "La cantidad ingresada es superior a la disponible!", "info");
          return false;
        }
        else {
          for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == id) {
              productos[i].cant = cant;
            }
          }

          for (let i = 0; i < detallesBD.length; i++) {
            if (detallesBD[i].idProducto == id) {
              detallesBD[i].cantidad = cant;
            }
          }

          listado.innerHTML = '';

          for (let produc of productos) {
            let subtotal = produc.cant * produc.pre;
            listado.innerHTML += `
          <tr>
            <td class='cpoCentro'>${produc.desc}</td>
            <td class='cpoIzquierda'>$${produc.pre}</td>
            <td class='cpoIzquierda'>${produc.cant}</td>
            <td class='cpoIzquierda'>$${subtotal}</td>
            <td class='cpoCentro'><a data-toggle="modal" data-target="#exampleModal" data-whatever="${produc.nombre}" data-otracosa="${produc.cant}" data-id="${produc.id}"><i class='fa-solid fa-eye'></i></a></td>
          </tr>
          `;
          }
        }
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
})