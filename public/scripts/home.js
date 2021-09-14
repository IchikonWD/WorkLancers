// const { Json } = require("sequelize/types/lib/utils");

const box = document.getElementById("cards");

document.querySelector("form").addEventListener("submit", (event) => {
  box.innerHTML = ` 
                <div id="contenedor_carga">
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
                          <section class="section2">
                              <article class="job1">
                                  <div class="job_header">
                                      <h2 class="jobTitle">${offer.jobTitle}</h2><b class="newAlert">NEW</b>
                                  </div>
                                  <div class="separator"></div>
                                  <div class="job_body"><img class="job_img" src="/assets/img/default_img.jpg" alt="">
                                      <p class="job_description">${offer.jobDescription}</p>
                                  </div>
                                  <div class="separator"></div>
                                  <div class="job_footer">
                                      <p class="job_price">${offer.jobBudget}</p><button class="see_more_btn" onclick='pillarcajas()'>See More</button><img
                                          class="fav_img" src="/assets/img/favorite.png">
                                  </div>
                              </article>
                          </section>
                          `;
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  paintResults();
});
