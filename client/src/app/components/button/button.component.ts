import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() loading: boolean;
  @Input() type: string;

  constructor() {
    this.text = '';
    this.loading = false;
    this.type = 'button';
  }

  ngOnInit(): void {}
}
