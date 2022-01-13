import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  global_categories = ['SURVIVAL','FREEBUILD','SKYBLOCK','MEGADROP','RPG','EASYHC','PAINTBALL','PVP','VANILLA','MINIGAMES','BEDWARS','REALLIFE',
  'HIDEANDSEEK','MURDERMYSTERY','CREATIVE','CAVEBLOCK','WATERBLOCK','DUELS','SKYWARS','PARKOUR','HARDCORE','SURVIVALGAMES','SMP','MINEZ'];

  versions = ['MC_1_7', 'MC_1_7_1','MC_1_7_2', 'MC_1_7_4','MC_1_7_5', 'MC_1_7_6', 'MC_1_7_7', 'MC_1_7_8', 'MC_1_7_9', 'MC_1_7_10',
    'MC_1_8', 'MC_1_8_1', 'MC_1_8_2', 'MC_1_8_3', 'MC_1_8_4', 'MC_1_8_5', 'MC_1_8_6', 'MC_1_8_7', 'MC_1_8_8', 'MC_1_8_9', 'MC_1_9', 'MC_1_9_1', 
    'MC_1_9_2', 'MC_1_9_3', 'MC_1_9_4', 'MC_1_10', 'MC_1_10_1', 'MC_1_10_2', 'MC_1_11', 'MC_1_11_1', 'MC_1_11_2', 'MC_1_12', 'MC_1_12_1', 'MC_1_12_2',
    'MC_1_13', 'MC_1_13_1', 'MC_1_13_2', 'MC_1_14', 'MC_1_14_1', 'MC_1_14_2', 'MC_1_14_3', 'MC_1_14_4', 'MC_1_15', 'MC_1_15_1', 'MC_1_15_2',
    'MC_1_16', 'MC_1_16_1', 'MC_1_16_2', 'MC_1_16_3', 'MC_1_16_4', 'MC_1_16_5', 'MC_1_17', 'MC_1_17_1', 'MC_1_18', 'MC_1_18_1'];


  // formatVersions(versions: string[]){
  //   return versions.map(v => {
  //     return v.slice(3, v.length).split("_").join(".");
  //   });
  // }

  formatVersion(version: string){
    return version.slice(3, version.length).split("_").join(".");
  }

}


