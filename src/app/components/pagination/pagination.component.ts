import { NgClass, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgFor, NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnChanges{
  @Input() totalData: number = 0
  @Input() pageSize: number = 9
  @Input() currentPage: number = 0
  @Output() paginationChange = new EventEmitter<number>()
  public totalPages: number[] = []

  ngOnChanges(): void {
    this.calculateTotalPages()
  }

  calculateTotalPages(): void {
    const totalPageCount = Math.ceil(this.totalData / this.pageSize)
    this.totalPages = Array.from({ length: totalPageCount }, (_, i) => i + 1)
  }

  onClick(pageNumber: number): void {
    if (pageNumber >= 0 && pageNumber < this.totalPages.length) {
      this.currentPage = pageNumber
      this.paginationChange.emit(pageNumber)
    }
  }
}