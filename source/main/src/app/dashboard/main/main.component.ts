import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'app/admin/admin.service';
import { AgentService } from 'app/agent/agent.service';
import { ConsultancyApi } from 'app/consultancy/consultancy-services/api.service';
import { ConsultancyService } from 'app/consultancy/consultancy-services/consultancy.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ApexTooltip,
  ApexPlotOptions,
  ApexDataLabels,
  ApexYAxis,
  ApexXAxis,
  ApexLegend,
  ApexResponsive,
  ApexFill,
  ApexStroke,
  ApexGrid,
  ApexTitleSubtitle,
  ApexStates,
} from 'ng-apexcharts';
import { map, Subscription, switchMap, tap } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  tooltip: ApexTooltip;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  responsive: ApexResponsive[];
  colors: string[];
  legend: ApexLegend;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  states: ApexStates;
  fill: ApexFill;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public areaChartOptions!: Partial<ChartOptions>;
  public barChartOptions!: Partial<ChartOptions>;
  public smallBarChart!: Partial<ChartOptions>;
  public smallAreaChart!: Partial<ChartOptions>;
  public smallColumnChart!: Partial<ChartOptions>;
  public smallLineChart!: Partial<ChartOptions>;


  // variables
  totalConsultancies: number;
  totalUsers: number;
  totalAgents: number;
  totalStudents: number;
  subscription: Subscription;
  defaultData: any = this.consultancyService.defaultRenderData()
  graphDetails: any
  filteredYears: any[]
  consultancyData: any
  agents: any
  roleName = localStorage.getItem('roleName')
  totalInstitutes: number
  totalPrograms: number
  totalSessions: number
  totalIntakes: number
  

  public sampleData = [
    31, 40, 28, 44, 60, 55, 68, 51, 42, 85, 77, 31, 40, 28, 44, 60, 55,
  ];

  breadscrums = [
    {
      title: 'Dashboard',
      active: 'Dashboard',
    },
  ];
  constructor(private consultancyApiService: ConsultancyApi, private consultancyService: ConsultancyService, private adminService: AdminService, private agentService: AgentService, private router: Router) {
    //constructor
  }

  navigateToAdminList() {
    this.router.navigate(['/admin/listusers'])
  }
  navigateToConsultancyList() {
    this.router.navigate(['/admin/consultancy-list'])
  }
  navigateToAgentList() {
    this.router.navigate(['/consultancy/agent-list'])
  }
  navigateToStudentList() {
    this.router.navigate(['/agent/list-students'])
  }
  navigateToInstituteList() {
    this.router.navigate(['/consultancy/institution-list'])
  }
  navigateToProgramList() {
    this.router.navigate(['/consultancy/program-list'])
  }
  navigateToSessionList() {
    this.router.navigate(['/consultancy/session-list'])
  }
  navigateToIntakeList() {
    this.router.navigate(['/consultancy/intake-list'])
  }




  ngOnInit() {
    // dashboard api's for superadmin
    if (this.roleName === 'superadmin') {
      this.consultancyApiService.getAllConsultancies().subscribe(res => {
        this.totalConsultancies = res.length;
        console.log(this.totalConsultancies)
      })

      this.agents = this.consultancyApiService.getAllAgents(this.defaultData).pipe(
        tap(res => {
          console.log(res)
          this.totalAgents = res['data'].length; // Update totalAgents as a side effect
          this.defaultData.pageSize = this.totalAgents
        }),
        switchMap(() => {
          if (this.roleName === 'superadmin') {
            this.defaultData.IsAdmin = true
          }
          return this.consultancyApiService.getAgents(this.defaultData).pipe(map(res => res['data']))
        })
      )



      this.adminService.getAllUsers().subscribe(res => {
        this.totalUsers = res.length;
        console.log(this.totalUsers)
      })

      this.agentService.getAllStudents().pipe(map(res => res['data'])).subscribe(res => {
        this.totalStudents = res.length;
        console.log(this.totalStudents)
      })
    }

    //dashboard api's for consultancy
    if (this.roleName === 'Consultancy') {
      this.agents = this.consultancyApiService.getAllAgents(this.defaultData).pipe(
        tap(res => {
          console.log(res)
          this.totalAgents = res['data'].length; // Update totalAgents as a side effect
          this.defaultData.pageSize = this.totalAgents
        }),
        switchMap(() => {
          if (this.roleName === 'superadmin') {
            this.defaultData.IsAdmin = true
          }
          return this.consultancyApiService.getAgents(this.defaultData).pipe(map(res => res['data']))
        })
      )

      this.consultancyApiService.getInstitutes(this.defaultData).pipe(map(res => res['pageInfo'].totalRecords)).subscribe(res => {
        console.log(res)
        this.totalInstitutes = res;
      })

      this.consultancyApiService.getPrograms(this.defaultData).pipe(map(res => res['pageInfo'].totalRecords)).subscribe(res => {
        this.totalPrograms = res;
      })

      this.consultancyApiService.getSession(this.defaultData).pipe(map(res => res['pageInfo'].totalRecords)).subscribe(res => {
        this.totalSessions = res;
      })

      this.consultancyApiService.getIntakes(this.defaultData).pipe(map(res => res['pageInfo'].totalRecords)).subscribe(res => {
        this.totalIntakes = res;
      })

      this.consultancyApiService.getAgents(this.defaultData).pipe(map(res => res['pageInfo'].totalRecords)).subscribe(res => {
        this.totalAgents = res;
      })
    }

    //consultancy

    this.agentService.getGraphDetails().pipe(map(res => res['data'])).subscribe(res => {
      this.graphDetails = res
      console.log(this.graphDetails)
      let map = {};
      //get consultancy admission details on the basis of year  
      for (let i = 0; i < this.graphDetails.length; i++) {
        const year = this.graphDetails[i].year;
        if (!Object.keys(map).includes(year)) {
          const yearBasedConsultancies = this.graphDetails.filter((el) => {
            return el.year === year;
          }).map(el => {
            return { consultancyName: el.consultancyName, numberOfApplications: el.numberOfApplications }
          })
          map[year] = yearBasedConsultancies;
        }
      }
      console.log(map)
    })



    this.cardChart1();
    this.cardChart2();
    this.cardChart3();
    this.cardChart4();
    this.chart1();
    this.chart2();
  }
  //   ngOnDestroy(){
  //   this.subscription.unsubscribe()
  // }
  private cardChart1() {
    this.smallBarChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart2() {
    this.smallAreaChart = {
      series: [
        {
          name: 'order',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'area',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
      },
      colors: ['#00E396'],
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }
  private cardChart3() {
    this.smallColumnChart = {
      chart: {
        type: 'bar',
        width: 200,
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '40%',
        },
      },
      series: [
        {
          name: 'income',
          data: this.sampleData,
        },
      ],

      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        y: {},
        marker: {
          show: false,
        },
      },
    };
  }
  private cardChart4() {
    this.smallLineChart = {
      series: [
        {
          name: 'Users',
          data: this.sampleData,
        },
      ],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true,
        },
      },
      stroke: {
        curve: 'straight',
        colors: ['#FEB019'],
        width: 4,
      },
      tooltip: {
        theme: 'dark',
        fixed: {
          enabled: false,
        },
        x: {
          show: false,
        },
        marker: {
          show: false,
        },
      },
      xaxis: {
        labels: {
          show: false,
        },
      },
      legend: {
        show: false,
      },
      yaxis: {
        show: false,
      },
      grid: {
        show: false,
      },
    };
  }

  private chart1() {
    this.areaChartOptions = {
      series: [
        // {
        //   name: 'New Clients',
        //   data: [31, 40, 28, 51, 42, 85, 77],
        // },
        // {
        //   name: 'Old Clients',
        //   data: [11, 32, 45, 32, 34, 52, 41],
        // },
      ],
      chart: {
        height: 350,
        type: 'area',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      colors: ['#FC8380', '#6973C6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        type: 'datetime',
        categories: [
          '2018-09-19',
          '2018-09-20',
          '2018-09-21',
          '2018-09-22',
          '2018-09-23',
          '2018-09-24',
          '2018-09-25',
        ],
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'center',
        offsetX: 0,
        offsetY: 0,
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  private chart2() {
    this.barChartOptions = {
      series: [
        {
          name: 'Consultancy 1',
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: 'Consultancy 2',
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: 'Consultancy 3',
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: 'Consultancy 4',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: 'Consultancy10',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: 'Consultancy10',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: 'Consultancy10',
          data: [9, 7, 5, 8, 6, 9, 4],
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        foreColor: '#9aa0ac',
      },
      colors: ['#5048e5', '#f43f5e', '#3c6494', '#a5a5a5'],
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ['#fff'],
      },
      xaxis: {
        categories: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015],
        // labels: {
        //   formatter: function (val: string) {
        //     return val + 'M';
        //   },
        // },
      },
      yaxis: {
        title: {
          text: undefined,
        },
      },
      grid: {
        show: true,
        borderColor: '#9aa0ac',
        strokeDashArray: 1,
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        y: {
          formatter: function (val: number) {
            return val + 'K';
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: 'top',
        horizontalAlign: 'left',
        offsetX: 40,
      },
    };
  }
}
