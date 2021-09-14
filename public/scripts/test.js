// Lo que llevo "adaptado"

const btn_search = document.querySelector("#btn_search");
const cards = document.querySelector(".cards");

const addfavBtn = () => {
  const cards = document.querySelectorAll(".card");
  for (let card of cards) {
    const title = card.querySelector(".card > article > div > h2").innerText;
    const description = card.querySelector(".card > article.job1 > .job_body > p").innerText;
    const image = card.querySelector(".card > article.job1 > .job_body > img").src;
    const price = card.querySelector(".card > article.job1 > .job_footer > pa").innerText;

    const favButton = document.createElement("button");
    const iconEdit = document.createElement("i");
    iconEdit.setAttribute("class", "far fa-heart");
    favButton.appendChild(iconEdit);

    card.appendChild(favButton);

    /*favButton.addEventListener('click', () =>{
            (async function () {

                const response = await fetch('/api/favorites', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        jobTitle: title,
                        JobCompany: company,
                        jobLocation: location,
                        jobDate: date,
                        jobImage: image,
                        jobUrl: url
                    })
                });
                if(response.status === 201){
                    console.log('La oferta se ha añadido a tus favoritos!')
                      })
                };

            })();
        })*/
  }
};