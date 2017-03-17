export class LineChartConfig {
  constructor(name:string,fill: string,color:string,interpolation: string, style: string) {
    this.settings = { name,fill, color,interpolation, style};
  }
  settings: { name:string, fill: string, color: string,interpolation: string, style: string };
  dataset: Array<{ x: number, y: number }>
}
