import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../interface/task';
import { TaskService } from '../../services/task.service';
import {
  faTrash,
  faFileEdit,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() task: Task;
  @Input() onActiveTask: any;
  @Input() cardLoading: any;
  @Output() onDeleteTask = new EventEmitter<Task>();
  @Output() onTaskDone = new EventEmitter<Task>();

  faTrash = faTrash;
  faFileEdit = faFileEdit;
  faCheckCircle = faCheckCircle;

  constructor(private taskService: TaskService) {
    this.task = {
      id: '',
      task: '',
      description: '',
      active: false,
      done: false,
      timestamp: '',
    };
  }

  ngOnInit(): void {}

  onDelete(t: Task, event: any) {
    event.stopPropagation();
    this.onDeleteTask.emit(t);
  }

  onActive(t: Task) {
    this.onActiveTask(t);
  }

  onDone(t: Task, event: any) {
    event.stopPropagation();
    this.onTaskDone.emit(t);
  }
}
