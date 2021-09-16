// const { Json } = require("sequelize/types/lib/utils");

const box = document.getElementById("cards");

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

          let description = offer.jobDescription.substr(0,70) + ' ...';

          box.innerHTML += `
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
                          class="green container_title">'${jobtitle}'</span>,<br /><span class="space red">Description</span><span
                          class="cyan">:</span> <span class="green container_description">'${description}</span>',<br /><span
                          class="space red">Job Budget</span><span class="cyan">:</span><span
                          class="green container_budget">'${offer.jobBudget}'</span>,<br /><span
                          class="space red">website</span><span class="cyan">:</span> <span class="green"><a
                            class="container_url" href="${offer.jobUrl}">'Haz click Aqui!'</a></span><br /> };</p>
              </div>
              <input type="hidden" value=${offer._id} class="hiddenInp">
          </div>
        </div>
                          `;
        });
      })
      .then(() => {
        document.querySelectorAll("#fav_btn_empty").forEach((item) => {
          item.addEventListener("click", () => {

            // console.log(item.parentNode.parentNode.querySelector('.container_title').innerText);
            // console.log(item.parentNode.parentNode.querySelector('.container_description').innerText);
            // console.log(item.parentNode.parentNode.querySelector('.container_budget').innerText);
            // console.log(item.parentNode.parentNode.querySelector('.container_url').getAttribute("href"));
           

            let title = item.parentNode.parentNode.querySelector('.container_title').innerText;
            let description = item.parentNode.parentNode.querySelector('.container_description').innerText;
            let moreInfo = item.parentNode.parentNode.querySelector('.container_budget').innerText;
            let url = item.parentNode.parentNode.querySelector('.container_url').getAttribute("href")
            let user_id = userApp;

            const objJob = { title, description, moreInfo, url , user_id };

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
