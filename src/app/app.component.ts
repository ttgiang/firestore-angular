import { Component, OnInit } from "@angular/core";
import * as data from "./links.json";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  title = "Angular Firebase Coffee";

  ngOnInit() {
    // https://www.techiediaries.com/import-local-json-files-in-typescript/
    console.log(data);
  }
}
