import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges{
  @Input() totalData: number = 0
  @Input() pageSize: number = 10
  @Output() paginationChange = new EventEmitter<number>()
  totalPages: number[] = []

  ngOnChanges(): void {
    this.calculateTotalPages()
  }

  calculateTotalPages(): void {
    const totalPageCount = Math.ceil(this.totalData / this.pageSize)
    this.totalPages = Array.from({ length: totalPageCount }, (_, i) => i + 1)
  }

  onClick(pageNumber: number): void {
    this.paginationChange.emit(pageNumber)
  }
}