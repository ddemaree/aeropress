// This file doesn't go through babel or webpack transformation.
// Make sure the syntax and sources this file requires are compatible with the current node version you are running
// See https://github.com/zeit/next.js/issues/1245 for discussions on Universal Webpack or universal Babel
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const { db } = require('./models')

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass `true` as the second argument to `url.parse`.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/b', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/a', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, err => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})



// // server.js
// // where your node app starts

// // init project
// const express = require("express");
// const bodyParser = require("body-parser");
// const app = express();
// const fs = require("fs");
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// // we've started you off with Express,
// // but feel free to use whatever libs or frameworks you'd like through `package.json`.

// // http://expressjs.com/en/starter/static-files.html
// app.use(express.static("public"));

// // init sqlite db
// const dbFile = "./.data/sqlite.db";
// const exists = fs.existsSync(dbFile);
// const sqlite3 = require("sqlite3").verbose();
// const db = new sqlite3.Database(dbFile);

// // if ./.data/sqlite.db does not exist, create it, otherwise print records to console
// db.serialize(() => {
//   if (!exists) {
//     db.run(
//       "CREATE TABLE Dreams (id INTEGER PRIMARY KEY AUTOINCREMENT, dream TEXT)"
//     );
//     console.log("New table Dreams created!");

//     // insert default dreams
//     db.serialize(() => {
//       db.run(
//         'INSERT INTO Dreams (dream) VALUES ("Find and count some sheep"), ("Climb a really tall mountain"), ("Wash the dishes")'
//       );
//     });
//   } else {
//     console.log('Database "Dreams" ready to go!');
//     db.each("SELECT * from Dreams", (err, row) => {
//       if (row) {
//         console.log(`record: ${row.dream}`);
//       }
//     });
//   }
// });

// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(`${__dirname}/views/index.html`);
// });

// // endpoint to get all the dreams in the database
// app.get("/getDreams", (request, response) => {
//   db.all("SELECT * from Dreams", (err, rows) => {
//     response.send(JSON.stringify(rows));
//   });
// });

// // endpoint to add a dream to the database
// app.post("/addDream", (request, response) => {
//   console.log(`add to dreams ${request.body.dream}`);

//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects
//   // so they can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     const cleansedDream = cleanseString(request.body.dream);
//     db.run(`INSERT INTO Dreams (dream) VALUES (?)`, cleansedDream, error => {
//       if (error) {
//         response.send({ message: "error!" });
//       } else {
//         response.send({ message: "success" });
//       }
//     });
//   }
// });

// // endpoint to clear dreams from the database
// app.get("/clearDreams", (request, response) => {
//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects so you can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     db.each(
//       "SELECT * from Dreams",
//       (err, row) => {
//         console.log("row", row);
//         db.run(`DELETE FROM Dreams WHERE ID=?`, row.id, error => {
//           if (row) {
//             console.log(`deleted row ${row.id}`);
//           }
//         });
//       },
//       err => {
//         if (err) {
//           response.send({ message: "error!" });
//         } else {
//           response.send({ message: "success" });
//         }
//       }
//     );
//   }
// });

// // helper function that prevents html/css/script malice
// const cleanseString = function(string) {
//   return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// };

// // listen for requests :)
// var listener = app.listen(process.env.PORT, () => {
//   console.log(`Your app is listening on port ${listener.address().port}`);
// });