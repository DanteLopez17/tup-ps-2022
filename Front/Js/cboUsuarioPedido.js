let user = sessionStorage.getItem("UsuarioActivo");
let idUser = sessionStorage.getItem("IdUsuarioActivo");
let html = "<option value = '";
html += idUser + "'>";
html += user;
html += "</option>";

$("#cboUsuario").append(html);
