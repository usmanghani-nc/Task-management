import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interface/task';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() task: Task;

  constructor() {
    this.task = {
      id: '',
      task: '',
      description: '',
      active: false,
      done: false,
      timestamp: '',
    };
  }

  ngOnInit(): void {
    console.log(this.task);
  }

  onDelete(t: Task) {
    console.log(t);
  }
}
