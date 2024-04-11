const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
var fs = require('fs').promises;
var parse = require('csv-parse/lib/sync');
dotenv.config();
const PORT = 8000;
const path = require('path');
const cors = require('cors');
const apiRouter = require("./routes/api.js");
const e = require('express');
const Property = require('./models/PropertyModel');

app.use(express.static('client'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const uri = process.env.ATLAS_URI;

//writes csv file to a non - relational database 
(async function () {
  const fileContent = await fs.readFile(__dirname+'/controller/assets/redfin.csv');
  const records = parse(fileContent, {columns: true});
  const mapped = [];
  records.forEach(function(el) {
      mapped.push({
        sale_type: el["SALE TYPE"],
        sold_date: el["SOLD DATE"],
        property_type: el["PROPERTY TYPE"],
        address:el.ADDRESS,
        city:el.CITY,
        state: el["STATE OR PROVINCE"],
        zip: el["ZIP OR POSTAL CODE"],
        price:el.PRICE,
        beds:el.BEDS,
        baths:el.BATHS,
        location: el.LOCATION,
        squareFt: el["SQUARE FEET"],
        lotsize: el["LOT SIZE"],
        year_built: el["YEAR BUILT"],
        days_on_market:el["DAYS ON MARKET"],
        price_perSqFt: el["$/SQUARE FEET"],
        hoa: el["HOA/MONTH"],
        status: el.STATUS,
        next_open: el["NEXT OPEN HOUSE START TIME"],
        next_open_end: el["NEXT OPEN HOUSE END TIME"],
        url: el["URL (SEE http://www.redfin.com/buy-a-home/comparative-market-analysis FOR INFO ON PRICING)"],
        source: el.SOURCE,
        mls: el["MLS#"],
        favorite: el.FAVORITE,
        interested: el.INTERESTED,
        lat: el.LATITUDE,
        long: el.LONGITUDE,
        votes:0,
        net_score:0
      })
    });

  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const connect = mongoose.connection;
    connect.once('open', () => {
      Property.find()
        .then(data=> {
          if (data.length <= 0) {
             Property.insertMany(mapped)
              .then(data => {
                console.log('uploaded csv')
              })
              .catch(err => {
          console.log(err)
              });
          };
        })
        .catch(err => {
          console.log(err);
        })
    });
})()



//handle api
app.use("/api", apiRouter);


app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../client/index.html')));

// catch-all route handler--for unknown routes
app.use((req, res) => res.sendStatus(404));

// need global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = { ...defaultErr, ...err };
  return res.status(errorObj.status).send(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});