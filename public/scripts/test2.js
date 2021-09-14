const box = document.getElementById('cards-box')
const busqueda = document.getElementById('busqueda')
const ciudad = document.getElementById('ciudad')
const form = document.querySelector('form')
const loader = document.querySelector('#box-loader')

console.log(userAplication);

form.addEventListener('submit', e => {
    e.preventDefault()
    box.innerHTML = ''
    // console.log(busqueda.value);
    // console.log(ciudad.value);

    loader.style.display = 'block'


    fetch('/searchscraping', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ busqueda: busqueda.value, ciudad: ciudad.value })
    })
        .then(data => data.json())
        .then(offers => {
            console.log(offers);
            offers[0].map(offer => {

                let description = offer.offerDescription.substr(0, 70) + ' ...';

                console.log(offer);
                if (userAplication) {
                    if (offer.offerImage === "") {
                        box.innerHTML += `
                        <div class="card-offert">
                        <div class="title-city-img">
                        <div>
                        <h2>${offer.offerTitle}</h2>
                        <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                        </div>
                        <div class="img-container">
                        <img src="${offer.offerImage}" style="display: none;">
                        </div>
                        </div>
                        
                        <div class="salary-offert">
                        <span>${offer.offerSalary}</span>
                        <span>${offer.offerJobType}</span>
                        </div>
                        
                        <p>${description}</p>
                        
                        <div class="favorite-check">
                        <i class="fas fa-star icon-star"></i>
                        <i class="far fa-star icon-star-empty"></i>
                        <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                        </div>
                        <input type="hidden" value="${offer._id}">
                        </div>
                        `
                    } else {
                        box.innerHTML += `
                        <div class="card-offert">
                        <div class="title-city-img">
                        <div>
                        <h2>${offer.offerTitle}</h2>
                        <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                        </div>
                        <div class="img-container">
                        <img src="${offer.offerImage}" alt="">
                        </div>
                        </div>
                        
                        <div class="salary-offert">
                        <span>${offer.offerSalary}</span>
                        <span>${offer.offerJobType}</span>
                        </div>
                        
                        <p>${description}</p>
                        
                        <div class="favorite-check">
                        <i class="fas fa-star icon-star"></i>
                        <i class="far fa-star icon-star-empty"></i>
                        <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                        </div>
                        <input type="hidden" value="${offer._id}">
                        </div>
                        `
                    }

                } else {
                    if (offer.offerImage === "") {
                        box.innerHTML += `
                        <div class="card-offert">
                            <div class="title-city-img">
                                <div>
                                <h2>${offer.offerTitle}</h2>
                                <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                                </div>
                                <div class="img-container">
                                <img src="${offer.offerImage}" style="display: none;">
                                </div>
                                </div>
    
                                <div class="salary-offert">
                                <span>${offer.offerSalary}</span>
                                <span>${offer.offerJobType}</span>
                                </div>
    
                                <p>${description}</p>
    
                                <div class="favorite-check">
                                <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                            </div>
                            <input type="hidden" value="${offer._id}">
                        </div>
                        `
                    } else {
                        box.innerHTML += `
                        <div class="card-offert">
                            <div class="title-city-img">
                                <div>
                                <h2>${offer.offerTitle}</h2>
                                <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                                </div>
                                <div class="img-container">
                                <img src="${offer.offerImage}" alt="">
                                </div>
                                </div>

                                <div class="salary-offert">
                                <span>${offer.offerSalary}</span>
                                <span>${offer.offerJobType}</span>
                                </div>

                                <p>${description}</p>

                                <div class="favorite-check">
                                <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                            </div>
                            <input type="hidden" value="${offer._id}">
                        </div>
                        `
                    }
                }


            })

            offers[1].map(offer => {

                let description = offer.offerDescription.substr(0, 70) + ' ...';

                if (userAplication) {
                    if (offer.offerImage === "") {
                        box.innerHTML += `
                        <div class="card-offert">
                        <div class="title-city-img">
                        <div>
                        <h2>${offer.offerTitle}</h2>
                        <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                        </div>
                        <div class="img-container">
                        <img src="${offer.offerImage}" style="display: none;">
                        </div>
                        </div>
                        
                        <div class="salary-offert">
                        <span>${offer.offerSalary}</span>
                        <span>${offer.offerJobType}</span>
                        </div>
                        
                        <p>${description}</p>
                        
                        <div class="favorite-check">
                        <i class="fas fa-star icon-star"></i>
                        <i class="far fa-star icon-star-empty"></i>
                        <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                        </div>
                        <input type="hidden" value="scrap">
                        </div>
                        `
                    } else {
                        box.innerHTML += `
                        <div class="card-offert">
                        <div class="title-city-img">
                        <div>
                        <h2>${offer.offerTitle}</h2>
                        <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                        </div>
                        <div class="img-container">
                        <img src="${offer.offerImage}" alt="">
                        </div>
                        </div>
                        
                        <div class="salary-offert">
                        <span>${offer.offerSalary}</span>
                        <span>${offer.offerJobType}</span>
                        </div>
                        
                        <p>${description}</p>
                        
                        <div class="favorite-check">
                        <i class="fas fa-star icon-star"></i>
                        <i class="far fa-star icon-star-empty"></i>
                        <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                        </div>
                        <input type="hidden" value="scrap">
                        </div>
                        `
                    }

                } else {
                    if (offer.offerImage === "") {
                        box.innerHTML += `
                        <div class="card-offert">
                            <div class="title-city-img">
                                <div>
                                <h2>${offer.offerTitle}</h2>
                                <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                                </div>
                                <div class="img-container">
                                <img src="${offer.offerImage}" style="display: none;">
                                </div>
                                </div>
    
                                <div class="salary-offert">
                                <span>${offer.offerSalary}</span>
                                <span>${offer.offerJobType}</span>
                                </div>
    
                                <p>${description}</p>
    
                                <div class="favorite-check">
                                <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                            </div>
                            <input type="hidden" value="scrap">
                        </div>
                        `
                    } else {
                        box.innerHTML += `
                        <div class="card-offert">
                            <div class="title-city-img">
                                <div>
                                <h2>${offer.offerTitle}</h2>
                                <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                                </div>
                                <div class="img-container">
                                <img src="${offer.offerImage}" alt="">
                                </div>
                                </div>

                                <div class="salary-offert">
                                <span>${offer.offerSalary}</span>
                                <span>${offer.offerJobType}</span>
                                </div>

                                <p>${description}</p>

                                <div class="favorite-check">
                                <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                            </div>
                            <input type="hidden" value="scrap">
                        </div>
                        `
                    }
                }

            })

        }).then((param) => {
            loader.style.display = 'none'

            document.querySelectorAll('.icon-star-empty').forEach(item => {

                item.addEventListener('click', () => {
                    console.log(item);
                    // console.log(item.parentNode);
                    // console.log(item.parentNode.parentNode.childNodes);
                    // console.log(item.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerText); // titlte
                    // console.log(item.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].currentSrc); // url imagen
                    // console.log(item.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].childNodes[0].innerText); // compañia
                    // console.log(item.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].childNodes[1].textContent); // ciudad
                    // console.log(item.parentNode.parentNode.childNodes[3].childNodes[1].innerText) // salario
                    // console.log(item.parentNode.parentNode.childNodes[3].childNodes[3].innerText) // jobtype
                    // console.log(item.parentNode.parentNode.childNodes[5].innerText) // description
                    // console.log(item.parentNode.parentNode.childNodes[7].childNodes[5].href) // url
                    // console.log(item.parentNode.parentNode.childNodes[9].value) // mongo

                    let title = item.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].innerText
                    let img = item.parentNode.parentNode.childNodes[1].childNodes[3].childNodes[1].currentSrc
                    let company = item.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].childNodes[0].innerText
                    let city = item.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[3].childNodes[1].textContent
                    let salary = item.parentNode.parentNode.childNodes[3].childNodes[1].innerText
                    let jobtype = item.parentNode.parentNode.childNodes[3].childNodes[3].innerText
                    let description = item.parentNode.parentNode.childNodes[5].innerText
                    let urlOffer = item.parentNode.parentNode.childNodes[7].childNodes[5].href
                    let idUser = userAplication.id
                    let mongoId = item.parentNode.parentNode.childNodes[9].value

                    const objectBody = { title, company, salary, img, jobtype, city, urlOffer, idUser, mongoId }

                    console.log(title, company, salary, img, jobtype, city, urlOffer, idUser, mongoId);

                    item.style.display = 'none'
                    item.parentNode.childNodes[1].className = 'fas fa-star checkbox-star'
                    console.log(item.parentNode.childNodes[1])

                    fetch('/addfavorite', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(objectBody)
                    })
                })
            })


            document.querySelectorAll('.icon-star').forEach(item => {

                item.addEventListener('click', () => {
                    console.log(item);

                    let urlOffer = item.parentNode.parentNode.childNodes[7].childNodes[5].href
                    let idUser = userAplication.id
                    let mongoId = item.parentNode.parentNode.childNodes[9].value

                    const objectBody = { urlOffer, idUser, mongoId }

                    item.className = 'fas fa-star icon-star'
                    item.parentNode.childNodes[3].style.display = 'block'
                    console.log(item.parentNode.childNodes)

                    fetch('/removefavorite', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(objectBody)
                    })

                })
            })
        })

})
















//     fetch('/searchScraping', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ busqueda: busqueda, ciudad: ciudad })
//     }).then(response => response.json()).then(response => {
//         response.map(offer => {

//             let description = offer.offerDescription.substr(0, 70) + ' ...';

//             console.log(offer);



//             if (offer.offerImage === "") {
//                 box.innerHTML += `
                    // <div class="card-offert">
                    // <div class="title-city-img">
                    //     <div>
                    //     <h2>${offer.offerTitle}</h2>
                    //     <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
                    //     </div>
                    //     <div class="img-container">
                    //     </div>
                    //     </div>

                    //     <div class="salary-offert">
                    //     <span>${offer.offerSalary}</span>
                    //     <span>${offer.offerJobType}</span>
                    //     </div>

                    //     <p>${description}</p>

                    //     <div class="favorite-check">
                    //     <i class="fas fa-star icon-star"></i>
                    //     <i class="far fa-star icon-star-empty"></i>
                    //     <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
                    //     </div>
                    //     </div>
//                         `
//             } else {

//                 box.innerHTML += `
//                     <div class="card-offert">
//                     <div class="title-city-img">
//                         <div>
//                         <h2>${offer.offerTitle}</h2>
//                         <span><b>${offer.offerCompany}</b> - ${offer.offerCity}</span>
//                         </div>
//                         <div class="img-container">
//                         <img src="${offer.offerImage}" alt="">
//                         </div>
//                         </div>

//                         <div class="salary-offert">
//                         <span>${offer.offerSalary}</span>
//                         <span>${offer.offerJobType}</span>
//                         </div>

//                         <p>${description}</p>

//                         <div class="favorite-check">
//                         <i class="fas fa-star icon-star"></i>
//                         <i class="far fa-star icon-star-empty"></i>
//                         <a target="_blank" href="${offer.offerUrl}" class="check-offert">Ver oferta</a>
//                         </div>
//                         </div>
//                         `
//             }
//         })
//     }).then(() => {
//         loader.style.display = 'none'

        // document.querySelectorAll('.icon-star-empty').forEach(item => {

        //     item.addEventListener('click', () => {

//                 const divFavoriteCheck = item.parentNode
//                 const divCardOffer = divFavoriteCheck.parentNode

//                 let title = divCardOffer.childNodes[1].childNodes[1].childNodes[1].innerText
//                 let company = divCardOffer.childNodes[1].childNodes[1].childNodes[3].childNodes[0].innerText
//                 let city = divCardOffer.childNodes[1].childNodes[1].childNodes[3].childNodes[1].data
//                 let img = divCardOffer.childNodes[1].childNodes[3].childNodes[0].nextSibling.currentSrc
//                 let salary = divCardOffer.childNodes[3].childNodes[1].innerText
//                 let jobtype = divCardOffer.childNodes[3].childNodes[3].innerText
//                 let url = divCardOffer.childNodes[7].childNodes[5].href
//                 let idUser = userAplication.id

//                 console.log(title, company, city, img, salary, jobtype, url, idUser);

//                 console.log(item.classList)
//                 // fetch('/addFavorite', {
//                 //     method: 'POST',
//                 //     headers: {
//                 //         'Content-Type': 'application/json'
//                 //     },
//                 //     body: JSON.stringify({ title, company, city, img, salary, jobtype, url, idUser })
//                 // })
//                 //     .then(() => {
//                 //         item.classList
//                 //     })
//                 //     .catch(err => console.log(err))
//             })
//         })

//     })
//         .catch(error => console.error('Error:', error));

// })
