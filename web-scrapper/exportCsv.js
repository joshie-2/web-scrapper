exports.exportCsv = (stateCyberPrograms) => {
  const data = [];
  for (const state of stateCyberPrograms) {
    for (const school of state) {
      let state = school.State;
      let schoolName = school.School;
      let campus = school.Campus;
      let nsaCert = school.NSACert;
      for (const program of school.Programs) {
        let row = {
          state: state,
          schoolName: schoolName,
          campus: campus,
          nsaCert: nsaCert,
          programName: program.Name,
          programUrl: program.Link,
        };
        data.push(row);
      }
    }
  }

  const csvRows = [];
  const headers = Object.keys(data[0]);
  csvRows.push(headers.join(","));
  for (const row of data) {
    const values = headers.map((header) => {
      const escaped = ("" + row[header]).replace(/"/g, '\\"');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }
  return csvRows.join("\n");
};
