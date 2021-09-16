// const { Json } = require("sequelize/types/lib/utils");

const box = document.getElementById("cards");

console.log(userApp);

document.querySelector("form").addEventListener("submit", (event) => {
  box.innerHTML = ` 
                <div id="contenedor_carga">
                      <h2 id="loadingText">Cargando...</h2>
                      <div id="carga"></div>
                </div>
  `; //Se genera el spinner cada vez que llamamos al formulario
  event.preventDefault();

  const paintResults = () => {
    fetch("/scraping", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: search.value }),
    })
      .then((Data) => Data.json())
      .then((scrapData) => {
        document.getElementById("cards").innerHTML = "";
        scrapData.map((offer) => {
          box.innerHTML += `
          <div class="content">
          <div class="card">
              <div class="card__side card__side--front">
                  <!-- Front Content -->
                  <div class="card__cont"><span class="blue">alert</span><span>(<span class="green">'New
                              Job!'</span>)</span></div>
              </div>
              <div class="card__side card__side--back">
                  <!-- Back Content -->
                  <div class="card__cta"><a class="icon_heart"><i class="fa fa-heart"
                              id="fav_btn_empty"></i></a>
                      <p><span class="purple">const</span> NewJob <span class="cyan">=</span> {<br /><span
                              class="space red">Job Title</span><span class="cyan">:</span> <span
                              class="green">'${offer.jobTitle}'</span>,<br /><span class="space red">Description</span><span
                              class="cyan">:</span> <span class="green">'${offer.jobDescription}</span>',<br /><span
                              class="space red">Job Budget</span><span class="cyan">:</span><span
                              class="green">'${offer.jobBudget}'</span>,<br /><span
                              class="space red">website</span><span class="cyan">:</span> <span class="green"><a
                                  href="${offer.jobUrl}">'Haz click Aqui!'</a></span><br /> };</p>
                  </div>
              </div>
              <input type="hidden" value=${offer._id} class="hiddenInp">
          </div>
                          `;
        });
      })
      .then(() => {
        document.querySelectorAll("#fav_btn_empty").forEach((item) => {
          item.addEventListener("click", () => {
            /*
            console.log(item);
            console.log(item.parentNode.parentNode);
            console.log(item.parentNode.parentNode.childNodes[1].childNodes[1].innerText); // titlte
            console.log(item.parentNode.parentNode.childNodes[5].childNodes[0].currentSrc); //Imagen empresa
            console.log(item.parentNode.parentNode.childNodes[5].childNodes[2].innerText); //Descripcion
            console.log(item.parentNode.parentNode.childNodes[9].childNodes[1].innerText); //more info
            */

            let title =
              item.parentNode.parentNode.childNodes[1].childNodes[1].innerText;
            let img =
              item.parentNode.parentNode.childNodes[5].childNodes[0].currentSrc;
            let description =
              item.parentNode.parentNode.childNodes[5].childNodes[2].innerText;
            let moreInfo =
              item.parentNode.parentNode.childNodes[9].childNodes[1].innerText;
            let user_id = userApp;

            const objJob = { title, img, description, moreInfo, user_id };

            console.log(objJob);

            fetch("/api/addFav", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(objJob),
            });
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  paintResults();
});
