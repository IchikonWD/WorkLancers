const puppeteer = require('puppeteer')

const extractJobs = (link, browser) => new Promise (async (resolve, reject) => {

    try {
        
        const jobData = {}

        const page =await browser.newPage()

        await page.goto(link)

        await page.waitForSelector('h1')


        jobData['jobTitle'] = await page.$eval('h1', (title) => title.innerText)


    } catch (err) {
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

        await page.waitForSelector('.col-lg-6')

        await page.click('#main > div > div > div:nth-child(2) > section.job-grid.vs-bg-white > div.container-visitor > div.text-center.mt-20.pt-5.pt-lg-0.mt-lg-40 > a')

        const urls = await page.$$eval('.col-lg-6 > div > section > .job-tile-content > .mb-20 > a', (link) => link.map(link => link.href))
        // console.log('URLS capturadas: ', urls);

        for(jobsLink in urls){
            const jobs = await extractJobs(urls[jobsLink], browser)
            scraperData.push(jobs)
        }
        console.log(scraperData, "Lo que duelve mi funcion scraper", scraperData.length);
        browser.close()
        return scraperData
    } catch (err) {
        console.log("Error:", err);
    }
}

scraper('https://www.upwork.com/freelance-jobs/api-development/')