import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() count = 1;
  @Output() buttonOnClick = new EventEmitter<number>();
  lastClicked: any = null;
  lastNumClicked = 1;

  constructor() {}

  ngOnInit(): void {}

  emitLastValue(): void {
    this.buttonOnClick.emit(this.lastNumClicked);
  }

  /** Prev / Next button clicked */
  dirOnClick(value: String): void {
    if (value === 'left') {
      if (this.lastNumClicked > 1) this.lastNumClicked--;
      else this.lastNumClicked = this.count;
    } else if (value === 'right') {
      if (this.lastNumClicked < this.count) this.lastNumClicked++;
      else this.lastNumClicked = 1;
    }
    this.emitLastValue();
  }

  /** Button numbers clicked */
  numOnClick(value: number): void {
    this.lastNumClicked = value;
    this.emitLastValue();
  }

  /**
   * Create range of integers
   * if -1 : show three dots
   * else show a button with the index as inner text
   */
  range(): number[] {
    const ret = [1];
    const count = this.count - 1;
    const first = Math.min(3, count < 0 ? 4 : count);
    if (this.lastNumClicked <= first) {
      for (let i = 2; i <= first; ++i) ret.push(i);
      if (this.count > 4) ret.push(-1);
      ret.push(this.count);
    } else if (this.lastNumClicked >= 4) {
      ret.push(-1);
      const start = Math.floor((this.lastNumClicked - 1) / 3) * 3 + 1;
      for (let i = start; i <= Math.min(start + 2, count); ++i) ret.push(i);
      if (this.count > start + 2) ret.push(-1);
      ret.push(this.count);
    }
    return ret;
  }
}
