
//-----------------------------------------------------------------------------------------------
// Exporter and Saver - Exports arrays by concatenating a number of arrays into a bigger object
//-----------------------------------------------------------------------------------------------
// 2024-11-30 v0.1 Initial saving and download 

class ExporterSaver {

    constructor(software,version,softwaredate)
    {
          this.metadata = software+" "+version+" "+softwaredate;
          this.exportstr = "";
          this.exportervers="0.1";
    }

    // Download json string using appended page element
    downloadExport()
    {
          // Make anchor and click it!
          var anchor = document.createElement("a");
          var dataBlob = new Blob([this.exportstr],{type:"application/json"});
          var objUrl = URL.createObjectURL(dataBlob);
          anchor.href = objUrl;
          anchor.innerHTML ="With createObjectURL";
          anchor.download = "export.json";
          document.body.appendChild(anchor);
          anchor.click();
    }

    // Initiate export string and prepare for export
    beginExport()
    {
        // Clear previous string
        this.exportstr="";

        var tmpdate=new Date();

        // Add export date metadata and other information
        this.exportstr+="// "+this.metadata+"\n";
        this.exportstr+="// Exporter version "+this.exportervers+" (c) Hgustavs saved on "+tmpdate.toString()+"\n";

        this.exportstr+="{\n";
    }

    // Close exporting string
    endExport()
    {
        // Close string
        this.exportstr+="\n}";
    }

}
