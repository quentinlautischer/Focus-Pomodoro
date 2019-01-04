import { Component } from '@angular/core';
import { EventService } from '../services/event.service';
import { EventModel } from '../models/eventModel';
@Component({
  selector: 'grid-component',
  template: `
  <ag-grid-angular (mouseenter)="mouseEnter()" (mouseleave)="mouseLeave()" 
    style="width: 900px; height: 200px;" 
    class="ag-theme-balham"
    [enableFilter]="true"
    [enableColResize]="true"
    [suppressAutoSize]="false"
    [rowData]="rowData"
    [columnDefs]="columnDefs"
    >
  </ag-grid-angular>
  <div class="btn-group" [hidden]="!isMouseHover()" (mouseenter)="mouseEnter()" (mouseleave)="mouseLeave()"> 
  <button class="btn btn-light" (click)="exportData()"><i class="fa fa-file-download fa-lg" aria-hidden="true"></i>Export CSV</button>
  <label class="btn btn-light"><i class="fa fa-file-upload fa-lg" aria-hidden="true"></i>
    Import CSV <input #fileInput (change)="readFile($event)" type="file" hidden>
</label>
  <button class="btn btn-danger" (click)="clearData()"><i class="fa fa-trash fa-lg" aria-hidden="true"></i>Clear Data</button>
  </div>
  `,
  styles: [`h1 { font-family: Lato; } .btn { float: right; margin-left: 5px; border: 1px solid #AAA; } ag-grid-angular{ margin-top: 20px; } i {margin-right: line-height: 1.5}`]
})

export class GridComponent {
    mouseHover: boolean = false;
    title = 'grid';
    columnDefs = [
        {
          headerName: '',
          field: 'activityType',
          width: 40,
          cellRenderer: (data) => {
              var activityType = data.value;
              var icon = '';
              if (activityType === "Strike") {
                icon = 'fas fa-heart-broken';
              } else if (activityType === "Task") {
                icon = 'fas fa-check';
              } else if (activityType === "Start") {
                icon = 'fas fa-sun';
              } else if (activityType === "SessionStart") {
                icon = 'far fa-circle';
              } else if (activityType === "SessionComplete") {
                icon = 'fas fa-circle';
              } else if (activityType === "SessionEnded") {
                icon = 'fas fa-times-circle';
              } else {
                icon = 'fas fa-question';
              }
              var x = "<i style='line-height: 1.5' class='" + icon + " fa-lg' aria-hidden='true'></i>";
              console.log(x);
              return x;
          }
        },
        { 
          headerName: 'Date', 
          sort: 'asc',
          field: 'date', 
          width: 140, 
          cellRenderer: (data) => {
            return this.formatDate(data.value);
          },   
        },
        { headerName: 'Activity', field: 'activity', width: 150 },
        { headerName: 'Comments', field: 'comments', width: 205 },
    ];

    rowData = [
        { activity: 'Started Focus', comments: 'Good morning!', date: new Date(), activityType: 'Start' },
    ];

    constructor(private eventService: EventService){

    }

    ngOnInit() {
      this.eventService.event.subscribe(event => {
        this.insertRowWithDate(event.activity, event.comments, event.datetime, event.activityType);
      })

      if (typeof(Storage) !== "undefined") {
        // If stored date is today pull data from storage.
        if (localStorage.focusDate === new Date().toDateString()) {
          this.rowData = JSON.parse(localStorage.focusData);
        }

        localStorage.setItem('focusDate', new Date().toDateString());
      } else {
        console.log("No local storage");
      }
    }

    private dateRenderOptions = {hour:'numeric', minute:'numeric', month: 'numeric', day: 'numeric', year: 'numeric'};

    clearData() {
      this.rowData = [];
    }

    formatDate(date){
      return date ? (new Date(date)).toLocaleDateString('en-US', this.dateRenderOptions) : '';
    }

    insertRow(activity: string, comments: string){
      this.rowData = this.rowData.concat([{activity: activity, comments: comments, date: new Date(), activityType: 'None'}]);
      localStorage.setItem('focusData', JSON.stringify(this.rowData));
    }

    insertRowWithDate(activity: string, comments: string, datetime: string, activityType: string){
      this.rowData = this.rowData.concat([{activity: activity, comments: comments, date: new Date(datetime), activityType: activityType}]);
      localStorage.setItem('focusData', JSON.stringify(this.rowData));
    }

    readFile($event) {
      var file:File = $event.target.files[0];

      var myReader:FileReader = new FileReader();

      myReader.onloadend = ()=> {
        this.importData(myReader.result);
        $event.target.value = null
      }
      
      myReader.readAsText(file);
    }

    importData(filestream){
      var allTextLines = filestream.split(/\r\n|\n/);
            console.log(allTextLines);
      var lines = [];

      for (var i=0; i<allTextLines.length-1; i++) {
          var data = allTextLines[i].split(',');
          this.insertRowWithDate(data[0], data[1], data[2], data[3]);
      }
    }

    exportData(){
      var data: string = "";
      this.rowData.forEach(function(row){
        for (var property in row) {
          if (row.hasOwnProperty(property)) {
              data = data.concat(row[property] + ",");
          }
        }
        data = data.concat("\n");
      })

      this.save("FocusTracker_" + (new Date()).toLocaleString('en-US', {month: 'numeric', day: 'numeric', year: 'numeric'}) + ".csv", data);
    }

    save(filename, data) {
  // Some hack    //https://stackoverflow.com/questions/3665115/create-a-file-in-memory-for-user-to-download-not-through-server
      var blob = new Blob([data], {type: 'text/csv'});
      if(window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
      }
      else{
          var elem = window.document.createElement('a');
          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename;        
          document.body.appendChild(elem);
          elem.click();        
          document.body.removeChild(elem);
      }
    }

  mouseEnter() {
    this.mouseHover = true;
  }

  mouseLeave() {
    this.mouseHover = false;
  }

  isMouseHover() {
    return this.mouseHover;
  }
}