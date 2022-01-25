const express = require("express");
const { findStates, findPrograms } = require("./cyberDegreeScrapper");
const { checkProgramUrlIsValid } = require("./checkProgramUrlIsValid");
const { exportCsv } = require("./exportCsv");
const fs = require("fs");
const url = "https://www.cyberdegrees.org/listings/";
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  try {
    // scrape state Url
    const foundStates = await findStates(url);
    const promiseArrayofStates = await findPrograms(foundStates);
    // scrape School, campus and programs
    const stateCyberPrograms = await Promise.all(promiseArrayofStates);
    res.json(stateCyberPrograms);
    // check if validity of url
    const validURLPrograms = await checkProgramUrlIsValid(stateCyberPrograms);
    // console.log(validURLPrograms);
    // export data to CSV
    const csvdata = exportCsv(validURLPrograms);
    fs.writeFile("cyberPrograms.csv", csvdata, (err) => {
      if (err) console.log(err);
      console.log("write successful!");
    });
    console.log(csvdata);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
