const puppeteer = require('puppeteer')
const fs = require('fs')


const extractJobs = (link, browser) => new Promise(async (resolve, reject) => {
    try {
        const jobData = {}

        const page = await browser.newPage()

        await page.goto(link)

        await page.waitForSelector('h1')

        jobData['jobTitle'] = await page.$eval('#content-main > h1', (title) => title.innerText)

        jobData['jobDescription'] = await page.$eval('#public-job-detail > div.job-description', (description) => description.innerText)

        jobData['jobTimer'] = await page.$eval('#public-job-detail > table > tbody > tr:nth-child(1) > td', (datePost) => datePost.innerText)

        jobData['location'] = await page.$eval('#public-job-detail > table > tbody > tr:nth-child(3) > td', (location) => location.innerText)

        jobData['jobBudget'] = await page.$eval('#public-job-detail > table > tbody > tr:nth-child(9) > td', (categories) => categories.innerText)

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

        const browser = await puppeteer.launch({
            headless: true
        })
        const page = await browser.newPage()
        const urls = []
        for (let i = 1; i < 2; i++) {
            await page.goto(`https://www.flexjobs.com/remote-jobs/web-design.html?category=Web+Design&catset%5B%5D=Web+Design&jobtypes%5B%5D=Freelance&page=${i}`)

            const urlsPage = await page.$$eval('#job-list > li > div > div > div.col.text-nowrap.pr-0 > a', (link) => link.map(link => link.href))
          //  console.log('URLS capturadas: ', urlsPage.length, urlsPage);
            urls.push(...urlsPage)
        }
        // console.log(urls);
        let newUrl = urls.slice(0,10)
        for (jobsLink in newUrl) {
            const jobs = await extractJobs(newUrl[jobsLink], browser)

            //console.log(urls[jobsLink]);
            scraperData.push(jobs)
            //  console.log(jobs);
        }
        // console.log(scraperData, "Lo que duelve mi funcion scraper", scraperData.length);
        browser.close()
        return scraperData
    } catch (err) {
        console.log("Error:", err);
    }

}

// scraper('https://www.flexjobs.com/remote-jobs/web-design.html?category=Web+Design&catset%5B%5D=Web+Design&jobtypes%5B%5D=Freelance')


module.exports = scraper;





