const ping = require("ping");
const url = require("url");

exports.checkDomainIsValid = (stateCyberPrograms) => {
  return new Promise((resolve, reject) => {
    for (const state of stateCyberPrograms) {
      for (const school of state) {
        for (const program of school.Programs) {
          let programUrl = program.Link;
          let domain = url.parse(programUrl);
          //   console.log(domain.hostname);

          ping.sys.probe(domain.hostname, function (isAlive) {
            var msg = isAlive
              ? "host " + domain.hostname + " is alive"
              : "host " + domain.hostname + " is dead";
            console.log(msg);
          });
          //   program.DomainIsValid = validUrl.isUri(programUrl) ? true : false;
        }
      }
    }
    resolve(stateCyberPrograms);
  });
};
