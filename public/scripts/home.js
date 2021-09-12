const box = document.querySelector('main')

// http://localhost:3000/scraping

fetch('http://localhost:3000/scraping')
        .then((Data)=> Data.json())
        .then(scrapData => {
            
                scrapData.map(offer => {
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
                                <p class="job_price">${offer.jobBudget}</p><button class="see_more_btn">See More</button><img
                                    class="fav_img" src="/assets/img/favorite.png">
                            </div>
                        </article>
                    </section>
                    `
                })

})