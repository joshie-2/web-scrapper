const axios = require("axios");
const cheerio = require("cheerio");

exports.findStates = (url) => {
  return new Promise((resolve, reject) => {
    const states = [];
    axios(url).then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const statesTable = $("#menu-state-pages > li");

      statesTable.each(function () {
        const href = $(this).find("a").attr("href");
        const url = `https://www.cyberdegrees.org/${href}`;
        const stateName = $(this).find("a").text();
        states.push({
          name: stateName,
          url: url,
        });
      });
      console.log(states.length);
      resolve(states);
    });
  });
};

exports.findPrograms = (foundStates) => {
  const promiseArray = [];
  foundStates.forEach((state) => {
    promiseArray.push(
      new Promise((resolve, reject) => {
        axios(state.url).then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const schoolsTable = $(" tbody > tr.school");
          const schools = [];
          schoolsTable.each(function () {
            const cyberPrograms = [];
            const schoolName = $(this).find(".schoolname").text();
            const campus = $(this).find(".campus-header").text();
            const cert = $(this).find(".nsa").text();
            const programs = $(this).find("div.program"); //find and scrap each program
            programs.each(function () {
              const programName = $(this).text();
              const programLink = $(this).find("a").attr("href");
              cyberPrograms.push({
                Name: programName,
                Link: programLink,
              });
            });
            schools.push({
              State: state.name,
              School: schoolName,
              Campus: campus,
              NSACert: cert,
              Programs: cyberPrograms,
            });
          });
          resolve(schools);
        });
      })
    );
  });
  return promiseArray;
};
