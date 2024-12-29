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

          this.itemcount=0;
    }

    exportItem(title,itemdata)
    {
        if(this.itemcount>0) this.exportstr+=",";
        this.itemcount++;
        this.exportstr+="\n";
        this.exportstr+='  "'+title+'":'+itemdata;
    }

    exportArray(title,items,rowcount)
    {
        if(this.itemcount>0) this.exportstr+=",";
        this.itemcount++;
        this.exportstr+="\n";
        this.exportstr+='  "'+title+'":[';
        for(var i=0;i<items.length;i++){
            if(i>0) this.exportstr+=",";
            if((i%rowcount)==0) this.exportstr+="\n    ";
            if(items[i]<100) this.exportstr+=" ";
            if(items[i]<10) this.exportstr+=" ";
            this.exportstr+=items[i];
        }
        this.exportstr+="\n  ]";
    }

    // Array export one object per row
    exportArrayObjects(title,items)
    {
        if(this.itemcount>0) this.exportstr+=",";
        this.itemcount++;
        this.exportstr+="\n";
        this.exportstr+='  "'+title+'":[';
        for(var i=0;i<items.length;i++){
            if(i>0) this.exportstr+=",";
            this.exportstr+="\n    {";
            var cnt=0;
            for(let prop in items[i]){
                if(cnt!=0) this.exportstr+=", ";
                this.exportstr+='"'+prop+'":';
                if(isNaN(items[i][prop])){
                    this.exportstr+='"'+items[i][prop]+'"';
                }else{
                    this.exportstr+=items[i][prop];                
                }
                cnt++;
            }
            this.exportstr+="}";
        }
        this.exportstr+="\n  ]";    
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

        this.exportstr+="{\n";

        // Add export date metadata and other information
        this.exportstr+='  "meta":"'+this.metadata+'",\n';
        this.exportstr+='  "vers":"Exporter version '+this.exportervers+' (c) Hgustavs saved on '+tmpdate.toString()+'",\n';
    }

    // Close exporting string
    endExport()
    {
        // Close string
        this.exportstr+="\n}";
    }
    
    openFile(itemid)
    {
        // Show file picker dialog
        document.getElementById('filepicker').click();

        // Create form data element
        const formData = new FormData();
        const fileField = document.getElementById('filepicker');
        formData.append('filename', fileField.files[0]);

        // Upload file and await response containing file contents
        fetch('openFile.php', {
        method: 'PUT',
        body: formData
        })
        .then(response => response.json() )
        .then(result=>{ console.log(result) })
        .catch((error) => {
        console.error('Error:', error);
        });

    }
}
