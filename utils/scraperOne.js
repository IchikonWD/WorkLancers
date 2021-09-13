const puppeteer = require('puppeteer')

const extractJobs = (link, browser) => new Promise (async (resolve, reject) => {
    try {
        const jobData = {}

        const page =await browser.newPage()

        await page.goto(link)

        // await page.waitForSelector('h1')

        jobData['jobTitle'] = await page.$eval('h1', (title) => title.innerText)

        
        jobData['jobDescription'] = await page.$$eval('div.PageProjectViewLogout-detail > p', (description) => {
            let filtro = description.filter((element) => {
                return !element.classList.contains('PageProjectViewLogout-detail-paragraph') && !element.classList.contains('PageProjectViewLogout-detail-tags')
            })
            return filtro.map((e) => {
                return e.innerText
            })
        })
        jobData['jobBudget'] = await page.$eval('#main > div > header > div > div > div.Grid-col.Grid-col--tablet-4 > p ', (payment) => payment.innerText)

        jobData['jobTimer'] = await page.$eval('#main > div > div > div > div.Grid-col.Grid-col--desktopSmall-8 > section:nth-child(1) > div > div.Card-footer > div.Grid.Grid--verticalCenter > div.Grid-col.Grid-col--tablet-3 > div > div > span ', (timer) => timer.innerText)

        resolve(jobData)
    } catch (err) {
        console.log(err);
        reject("Error: ", err)
    }
})
const scraperOne = async (url) => {

    try {
        
        const scraperData = []
        console.log("Opening the browser......");

        const browser = await puppeteer.launch({ headless: true})

        const page = await browser.newPage()
        await page.goto(url)
        
        await page.waitForSelector('#close-cookie-banner')
        
        await page.click("#close-cookie-banner")

        const urls = await page.$$eval('#project-list > div.JobSearchCard-item > div.JobSearchCard-item-inner > div.JobSearchCard-primary > div.JobSearchCard-primary-heading > a', (link) => link.map(link => link.href))
        // console.log('URLS capturadas: ', urls.length);

        let newUrl = urls.slice(0,2)
        for(jobsLink in newUrl){
            const jobs = await extractJobs(newUrl[jobsLink], browser)
            // console.log(urls[jobsLink]);
            scraperData.push(jobs)
            // console.log(jobs);
        }
        // console.log(scraperData, "Lo que duelve mi funcion scraper", scraperData.length);
        // browser.close()
        return scraperData
    } catch (err) {
        console.log("Error:", err);
    }
}

// scraper('https://www.freelancer.es/jobs/?keyword=developer#')

module.exports = scraperOne