const http = require("http");
const url = require("url");
let fs = require("fs");

const portti = 3101;

let nimi = "";
let email = "";
let kayttoehdot = "";
let n = 0;
let data = "New File Contents";

const palvelin = http.createServer( (req, res) => {

    if (req.url != "/favicon.ico") {

        let tiedot = url.parse(req.url, true).query;

        if(tiedot.nimi == "" ) {

            res.writeHead(200, { "Content-type" : "text/html; charset=utf-8" })
            res.write(`Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot`);
            res.end();
             
        }

        else if(tiedot.email == "" ) {

            res.writeHead(200, { "Content-type" : "text/html; charset=utf-8" })
            res.write(`Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot`);
            res.end();
             
        }

        else if(tiedot.kayttoehdot != `hyvaksytty` ) {

            res.writeHead(200, { "Content-type" : "text/html; charset=utf-8" })
            res.write(`Anna nimesi sekä sähköpostiosoitteesi ja hyväksy käyttöehdot`);
            res.end();
             
        }
            
        else {

            n++;
            console.log(`Uusi tilaus vastaanotettu. Tilauksia yhteensä ${n} kpl`);
            fs.appendFile('tilaukset.txt', '\n' + tiedot.nimi + ' , ' + tiedot.email,'utf8', (err) => {
                if (err) throw err;
              });
            res.writeHead(200, { "Content-type" : "text/html; charset=utf-8" })
            res.write(`Olet tilannut onnistuneesti uutiskirjeemme. Kiitos!`);
            res.end();
        
        }
    } 

});

palvelin.listen(portti, () => {

    console.log(`Palvelin käynnistyi porttiin:${portti}`);

});