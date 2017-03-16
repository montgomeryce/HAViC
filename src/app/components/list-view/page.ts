export class Page {
  constructor(size:number,totalElements: number,totalPages:number,number: number) {
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.number = number;
  }
  size: number
  totalElements: number
  totalPages: number
  number: number
}
