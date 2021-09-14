document.querySelectorAll(".see_more_btn").forEach(item => {
    item.addEventListener('click',() => {
        console.log(item);
        console.log('Hola');
    })
})