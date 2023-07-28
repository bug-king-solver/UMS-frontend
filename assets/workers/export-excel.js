import XLSX from 'xlsx';

self.addEventListener("message", event => {

    let { dataset, __omit } = event.data;
    
    dataset = dataset.map(student => { let studentCopy = { ...student }; delete studentCopy[__omit]; return studentCopy });
    
    const worksheet = XLSX.utils.json_to_sheet(dataset);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dates");
    const buffer = XLSX.write(workbook, { bookType: "xlsb", type: "buffer" });
    const url = URL.createObjectURL(new Blob([buffer]));

    self.postMessage(url);

})