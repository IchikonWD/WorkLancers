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
        resolve(jobData)
    } catch (err) {
        console.log(err);
        reject("Error: ", err)
    }
})
const scraper = async (url) => {

    try {
        
        const scraperData = []
        console.log("Opening the browser......");

        const browser = await puppeteer.launch({ headless: false})

        const page = await browser.newPage()
        await page.goto(url)
        
        await page.waitForSelector('#close-cookie-banner')
        
        await page.click("#close-cookie-banner")

        const urls = await page.$$eval('#project-list > div.JobSearchCard-item > div.JobSearchCard-item-inner > div.JobSearchCard-primary > div.JobSearchCard-primary-heading > a', (link) => link.map(link => link.href))
        console.log('URLS capturadas: ', urls.length);

        for(jobsLink in urls){
            const jobs = await extractJobs(urls[jobsLink], browser)
            console.log(urls[jobsLink]);
            scraperData.push(jobs)
            console.log(jobs);
        }
        console.log(scraperData, "Lo que duelve mi funcion scraper", scraperData.length);
        // browser.close()
        return scraperData
    } catch (err) {
        console.log("Error:", err);
    }
}

scraper('https://www.freelancer.es/jobs/?keyword=developer#')