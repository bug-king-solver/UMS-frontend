export const toCSVFile = (data: Array<any>): string => {
    const csvRows = [];  
    const headers = Object.keys(data[0]);  
    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const val = row[header];
        return `"${val}"`;
      });
      csvRows.push(values.join(','));
    }

    return "data:text/csv;charset=utf-8," + encodeURI(csvRows.join('\n'));
}


export const toFormatedText = (data: Array<Record<string, any>>) => {
    const SPERATOR = "	"
    const header = Object.keys(data[0]).join(SPERATOR);
    const body = data.map((row: Record<string, any>) => Object.values(row).join(SPERATOR));
    const text = `${header}\n${body.join("\n")}`;
    return text;
}

export const downloadFile = (fileClassName: string, content: string, extension: string) => {

    const timestamp = new Date().toLocaleDateString().replaceAll("/", "_");

    const salt = new Date().getMilliseconds();

    var link = document.createElement("a");
    
    link.download = `${fileClassName}-${timestamp}-${salt}.${extension}`;
    link.href = content;
    link.click();

}