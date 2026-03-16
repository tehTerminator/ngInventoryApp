import { Component } from '@angular/core';

@Component({
  selector: 'app-operator-sales-chart',
  templateUrl: './operator-sales-chart.component.html',
  standalone: false,
})
export class OperatorSalesChartComponent {
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Date';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Sales';
  legendTitle: string = 'Operators';

  
}
