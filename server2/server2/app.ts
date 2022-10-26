import http, { IncomingMessage, Server, ServerResponse } from "http";
import { ScriptTarget } from "typescript";
const cheerio = require("cheerio");
const axios = require("axios");
/*
implement your server code here
*/

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    if (req.method === "POST" && req.url === "/web-scrape") {
      async function scrape() {
        try {
          let data = '';
          req.on('data', async(chunk) => {
          data = chunk.toString();
          const url = JSON.parse(data).url;
          const response = await axios.get(`https://${url}`);
          const $ = cheerio.load(response.data);
          const title = $("title").text();
          const desc = $('meta[name="description"]').attr("content");
          const image_url = $('meta[property="og:image"]').attr('content');
          
          let result = {
            name: title,
            description: desc,
            image_url: image_url
          }

          res.writeHead(200, { "Content-Type": "text/HTML" });
          res.end(JSON.stringify(result, null, 2));

          });
          
        } 
        catch (error) {
          console.error(error);
        }
      }
      scrape();
    } else {
      res.writeHead(404, { "Content-Type": "text/HTML" });
      res.end("404 Not Found");
    }
  }
);

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {console.log(`Server is running on port ${PORT}`)});
