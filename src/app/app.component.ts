import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Commit } from './commit';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private apiUrl = 'http://localhost:4201';
  private repoUrl = '/?api.github.com/repos/izuzak/pmrpc/commits';
  
  title = 'CrossRoads_TestProject';
  commits : Observable<Commit[]>;

  getCommits() : Observable<Commit[]> {
    this.commits = this.http.get<Commit[]>(this.apiUrl + this.repoUrl);
    return this.commits ;
  }

  getCommitTime(cmt : Commit) : string {
    return cmt.commitDay + " " + cmt.commitTime;
  }

  constructor(private http: HttpClient) {
    this.getCommits();
  }
}
