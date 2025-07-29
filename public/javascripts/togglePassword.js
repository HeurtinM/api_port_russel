//pris directmenet de w3c
function togglePasswordVisibility(elementID) {
  var x = document.getElementById(elementID);
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
} 