let itsHidden = true;

function mostrarForm() {
  if (itsHidden == true) {
    document.getElementById("form").style.display = "block";
    itsHidden = false;
  } else {
    document.getElementById("form").style.display = "none";
    itsHidden = true;
  }
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
const menuBurguer = () => {
  var x = document.getElementById("myLinks");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
};
