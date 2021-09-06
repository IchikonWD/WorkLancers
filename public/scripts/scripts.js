let itsHidden = true;

function mostrarForm() {
    if(itsHidden == true){
        document.getElementById('form').style.display = 'block'
        itsHidden = false
    }
    else{
        document.getElementById('form').style.display = 'none'
        itsHidden = true
    }
}