const http = require('http');
const fs = require('fs');
const NewsAPI = require('newsapi');
const hostname = '127.0.0.1';
const port = 3000;
const dotenv = require('dotenv');
dotenv.config();

const base_url = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;




const newsapi = new NewsAPI('be17a5a7e389464796681d8ec2bdfc94');
// To query /v2/top-headlines
// All options passed to topHeadlines are optional, but you need to include at least one of them
newsapi.v2.topHeadlines({
//   sources: 'bbc-news,the-verge',
  q: 'technology',
   category: 'technology',
  language: 'en',
  country: 'in'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      articles: [...]
    }
  */
});
// To query /v2/everything
// You must include at least one q, source, or domain
newsapi.v2.everything({
  q: 'technology',
//   sources: 'bbc-news,the-verge',
//   domains: 'bbc.co.uk, techcrunch.com',
//   from: '2017-12-01',
//   to: '2017-12-12',
  language: 'en',
  sortBy: 'relevancy',
  page: 2
}).then(response => {
//   console.log(response);
// add the data to the accordion
    let data = response.articles;
    let html = '';
    for(let i = 0; i < data.length; i++){
        html += `<div class="card">
        <div class="card-header" id="heading${i}">
            <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                    ${data[i].title}
                </button>
            </h2>
        </div>
        <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordion">
            <div class="card-body">
                ${data[i].description}
            </div>
        </div>
    </div>`;
    }

    window.document.getElementById('accordion').innerHTML = html;
}

);


  /*
    {
      status: "ok",
      articles: [...]
    }
  */

// To query sources
// All options are optional
newsapi.v2.sources({
  category: 'technology',
  language: 'en',
  country: 'us'
}).then(response => {
  console.log(response);
  /*
    {
      status: "ok",
      sources: [...]
    }
  */
});

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.writeHead(200, { 'content-type': 'text/html' })
  fs.createReadStream('index.html').pipe(res)

});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});