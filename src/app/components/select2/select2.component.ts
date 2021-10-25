import { Component, ElementRef, Input, OnChanges, Renderer2, SimpleChanges, ViewChild, OnInit, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: Select2Component,
      multi: true
    }
  ]
})
export class Select2Component implements OnInit, OnChanges, ControlValueAccessor {

  @Input() data: any[] = [];
  @Input() maxSelection: number = 10;
  @Input() visibleItem: number = 1;
  @Input() searchable: boolean = true;
  @Input() clearable: boolean = true;
  @Input() label: string = 'common';
  @Input() value: string = 'cca3';

  @ViewChild('inputSearch') inputSearch?: ElementRef;


  filteredData: any[] = [];
  selectedItems: any[] = [];
  search: string = '';
  show: boolean = false;

  private onChangeFn = (value: any) => {
    // 
  };
  private onTouchedFn = () => {
    // 
  };

  constructor(private renderer: Renderer2) { }

  ngOnInit() {
    this.renderer.listen('window', 'click', (e: Event) => {

      const target = e.target as HTMLElement;

      if (!target.className.includes('select-custom-inside')) {
        this.show = false;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('data')) {
      this.setData();
    }
  }

  @HostListener('window:scroll')
  onScrollEvent() {
    this.show = false;
  }

  setData() {
    this.filteredData = this.data;
  }

  addItem(item: any): void {
    if (this.selectedItems.includes(item)) {
      return;
    }
    if (this.maxSelection && this.selectedItems.length < this.maxSelection) {
      this.add(item);
    }
    if (!this.maxSelection) {
      this.add(item);
    }
  }

  add(item: any) {
    this.selectedItems = [...this.selectedItems, item];
    this.filteredData = this.data;
    this.search = '';
    this.showOptions();
    this.onChanges();
  }

  clear() {
    this.selectedItems = [];
    this.onChanges();
  }

  deleteItem(item: any) {
    this.selectedItems = this.selectedItems.filter(i => i.cca3 !== item.cca3);
    this.onChanges();
  }

  onSearch() {
    const value = this.search.toLocaleLowerCase().trim();
    this.filteredData = this.data.filter(i => {
      return JSON.stringify(`${i.name.common}`).toLowerCase().includes(value);
    });
  }

  showOptions() {
    this.show = !this.show;
    if (this.show) {
      this.inputSearch?.nativeElement.focus();
    } else {
      this.inputSearch?.nativeElement.blur();
    }
  }

  onChanges(): void {
    this.onTouchedFn();
    if (this.value) {
      this.onChangeFn([...this.selectedItems.map(i => i[this.value])]);
    } else {
      this.onChangeFn(this.selectedItems);
    }
  }

  writeValue(value: string[]): void {
    // 
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }
}
