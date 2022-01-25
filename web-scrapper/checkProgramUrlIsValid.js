const validUrl = require("valid-url");

exports.checkProgramUrlIsValid = (stateCyberPrograms) => {
  return new Promise((resolve, reject) => {
    for (const state of stateCyberPrograms) {
      for (const school of state) {
        for (const program of school.Programs) {
          let programUrl = program.Link;
          program.UrlIsValid = validUrl.isUri(programUrl) ? true : false;
        }
      }
    }
    resolve(stateCyberPrograms);
  });
};
