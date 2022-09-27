import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() placeholder: string;
  @Input() type: string;
  @Input() name: string;
  @Input() inputValue: any;
  value: any;

  constructor() {
    this.placeholder = '';
    this.type = '';
    this.name = '';
    this.value = null;
  }

  ngOnInit(): void {}
}
