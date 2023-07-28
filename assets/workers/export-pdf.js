import autoTable from 'jspdf-autotable'

import { jsPDF } from "jspdf";

self.addEventListener("message", event => {

  const doc = new jsPDF();

  let { dataset: raw, __image } = event.data;
  
  const columns = Object.keys(raw[0]);

  const dataset = raw.map(student => { let studentCopy = { ...student }; studentCopy[__image] = ""; return Object.values(studentCopy) });

  autoTable(doc, {

    head: [columns], body: dataset, styles: { minCellHeight: 20, valign: "middle" },

    didDrawCell: (data) => {
      if (data.section === 'body' && data.column.index === 0) {
        const row = raw[data.row.index];
        row ? doc.addImage(doc.loadImageFile(row[__image], true), 'JPEG', data.cell.x + 2, data.cell.y + 2, 15, 15) : null;
      }
    },

  });

  self.postMessage(doc.output("bloburi"));

})
