const PORT = 8000; 

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const webScrap = express();

const url = 'https://www.guitarworld.com/';
axios(url)
    .then(response => {
        const html = response.data
        const $ = load(html)
        const articles = []


        $('.article-name', html).each(function(){
            const title = $(this).text()
            const url = $(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
            console.log(articles)
        })
    }).catch(err => console.log(err));
webScrap.listen(PORT, () => console.log(`server listening on ${PORT}`));
