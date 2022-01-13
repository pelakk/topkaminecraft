import { Component, Input, OnInit } from '@angular/core';
import {Chart, registerables} from "chart.js";
import {CompleteServer} from "../../../model/CompleteServer";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  @Input() completeServer!: CompleteServer;
  last3DaysDates: number[] = [];
  last3DaysValues: number[] = [];

  constructor() { }

  ngOnInit(): void {
    Chart.register(...registerables);
    this.drawChart();
  }


  private drawChart() {

    if (this.completeServer.name.includes(":25565"))
      this.completeServer.name = this.completeServer.name.slice(0, length - 6);

    if (this.completeServer.motd.includes("\\n") || this.completeServer.motd.includes("\n")) {
    }


    this.extractKeysAndValues();
    new Chart("myChart", {
      type: 'line',
      data: {
        labels: this.last3DaysDates.map(data => {
          let date = new Date(+data);
          return date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
        }),
        datasets: [{
          label: 'Gracze online',
          data: this.last3DaysValues,
          borderWidth: 1,
          borderColor: '#D96F32',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 12,
              align: 'center',
            },
            // gridLines: {
            //   offsetGridLines: true  <--- TO NIBY MA SRODKOWAC LABELE ALE NIE DZIALA I ZARA ROZKURWIE KOMPA PRZEZ TO
            // }
          },
          y: {
            min: 0,
            ticks: {
              precision: 0
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              boxHeight: 0,
              textAlign: "center",

            },
          }
        }
      }
    });
  }

  private extractKeysAndValues() {
    for (let key in this.completeServer.onlineHistory) {
      let value = this.completeServer.onlineHistory[key] as unknown as number;

      let date = new Date(+key);
      let threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 1);

      if (date.getTime() > threeDaysAgo.getTime()) {
        this.last3DaysDates.push(date.getTime());
        this.last3DaysValues.push(value);
      }
    }
  }
}
