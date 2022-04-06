import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { SpacexapiService } from '../network/spacexapi.service';


@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {

  isMission = false
  currentMission: any
  missions: any

  constructor(private spacexApiService: SpacexapiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spacexApiService.sendGetRequest().subscribe(data=>{
      this.missions = data
    })
    this.route.queryParams.subscribe(params => {
      this.currentMission = params['currentMission']
    })
  }

  public onClick(mission: any){
    if(this.isMission && this.currentMission == mission){
      this.isMission = false
    }
    else{
      this.isMission = true
      this.currentMission = mission
    }
  }
}
