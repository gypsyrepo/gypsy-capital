export const filterStaff = (stafflist, staffId) => {
  return stafflist.filter((staff) => staff._id === staffId)[0];
};

export const convertArrayToTable = (tableHeaders, dataArray) => {
  const tableHead = `<tr>${tableHeaders
    .map((header) => `<td>${header}</td>`)
    .join("")}</tr>`;

  const tableRows = dataArray
    .map((data) => [
      `<tr>${Object.keys(data)
        .map(
          (key) =>
            `<td>${
              data[key] === null || data[key] === "" ? "" : data[key]
            }</td>`
        )
        .join("")}</tr>`,
    ])
    .join("");

  const table = `<table>${tableHead}${tableRows}</table>`.trim();
  return table;
};

export const createXMLTable = (table, fileName) => {
  const xmlTable = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel"
      xmlns="http://www.w3.org/TR/REC-html40"
    >
    <meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"/>
    <head>
        <xml>
          <x:ExcelWorkbook>
              <x:ExcelWorksheets>
                  <x:ExcelWorksheet>
                      <x:Name>${fileName}</x:Name>
                      <x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions>
                  </x:ExcelWorksheet>
              </x:ExcelWorksheets>
          </x:ExcelWorkbook>
        </xml>
    </head>
    <body>
      ${table}
    </body>
    </html> `;
  return xmlTable;
};

export const createFileUrl = (xmlTable) => {
  const tableBlob = new Blob([xmlTable], {
    type: "application/vnd.ms-excel;base64,",
  });
  const downloadURL = URL.createObjectURL(tableBlob);
  return downloadURL;
};

export const downloadFile = (downloadURL, fileName) => {
  const downloadLink = document.createElement("a");
  document.body.appendChild(downloadLink);
  downloadLink.download = fileName;
  downloadLink.href = downloadURL;
  downloadLink.click();
};
