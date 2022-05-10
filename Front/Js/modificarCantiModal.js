$("#btnModifModal").click(function () {

  let id = $("#txtIdProdu").val();
  let cant = $("#txtCantModal").val();

  for(let i = 0; i < productos.length; i++)
  {
    if(productos[i].id == id)
    {
      productos[i].cant = cant;
    }
  }

  for (let i = 0; i < detallesBD.length; i++) 
  {
    if(detallesBD[i].IdProducto == id)
    {
      detallesBD[i].Cantidad = cant;
    }
  }

  console.log("Mostrar")
  console.log(productos)
  console.log("BaseDatos")
  console.log(detallesBD)

  listado.innerHTML = '';

        for (let produc of productos) {
          listado.innerHTML += `
          <tr>
            <td>${produc.nombre}</td>
            <td>${produc.desc}</td>
            <td>$${produc.pre}</td>
            <td>${produc.cant}</td>
            <td>$${produc.subtot}</td>
            <td><button data-toggle="modal" data-target="#exampleModal" data-whatever="${produc.nombre}" data-otracosa="${produc.cant}" data-id="${produc.id}"><img src="../Image/edit.png" alt="Editar"></button></td>
          </tr>
          `;
        }

})