import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../interface/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() task: Task;
  @Input() onActiveTask: any;

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

  ngOnInit(): void {
    console.log(this.task);
  }

  onDelete(t: Task) {
    this.taskService.deleteTask(t).subscribe((task) => {});
  }

  onActive(t: Task) {
    this.onActiveTask(t);
  }
}
