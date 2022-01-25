const axios = require("axios");

exports.checkProgramUrlStatus = (stateCyberPrograms) => {
  return new Promise((resolve, reject) => {
    for (const state of stateCyberPrograms) {
      for (const school of state) {
        for (const program of school.Programs) {
          let programUrl = program.Link;
          axios
            .head(programUrl)
            .then((response) => {
              // console.log(response);
              program.UrlStatusOk = response.statusCode == 200 ? true : false;
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
    resolve(stateCyberPrograms);
  });
};
