const puppeteer = require('puppeteer')

const extractJobs = (link, browser) => new Promise(async (resolve, reject) => {
    try {
        const jobData = {}

        const page = await browser.newPage()

        await page.goto(link)

        await page.waitForSelector('h1')

        jobData['jobTitle'] = await page.$eval('#productName > h1', (title) => title.innerText)

        jobData['jobDescription'] = await page.$eval('#app > div > div.container.main > section > section.box-common.block-project > div > section > article:nth-child(1) > div.expander.js-expander-passed', (description) => description.innerText)

        jobData['jobBudget'] = await page.$eval('#app > div > div.container.main > section > section.box-common.block-project > div > section > article:nth-child(1) > div.row > div:nth-child(2) > h4', (payment) => payment.innerText)

        jobData['jobTimer'] = await page.$eval('#productName > p', (timer) => timer.innerText)

        jobData['jobUrl'] = await page.url();

        resolve(jobData)
    } catch (err) {
        console.log(err);
        reject("Error: ", err)
    }
})
const scraperTwo = async (url) => {
    try {

        const scraperData = []
        console.log("Taking info page 2...");

        const browser = await puppeteer.launch({

            headless: true

        })
        const page = await browser.newPage()
        const urls = []
        for (let i = 1; i < 2; i++) {

            await page.goto(`${url}&page=${i}`)

            const urlsPage = await page.$$eval('#projects > div > div.project-header > h2 > a', (link) => link.map(link => link.href))
            // console.log('URLS capturadas: ', urlsPage.length, urlsPage);
            urls.push(...urlsPage)
        }
        // console.log(urls);

        let newUrl = urls.slice(0, 5)
        for (jobsLink in newUrl) {
            const jobs = await extractJobs(newUrl[jobsLink], browser)
            // console.log(urls[jobsLink]);
            scraperData.push(jobs)
            // console.log(jobs);
        }
        //console.log(scraperData, "Lo que duelve mi funcion scraper", scraperData.length);
        browser.close()
        return scraperData
    } catch (err) {
        console.log("Error:", err);
    }

}

// scraper('https://www.workana.com/jobs?category=it-programming&language=es')


module.exports = scraperTwo