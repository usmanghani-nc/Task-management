import { Component, OnInit } from '@angular/core';
import { Task } from '../../interface/task';
import { TaskService } from '../../services/task.service';
import * as moment from 'moment';

@Component({
  selector: 'app-list-wrapper',
  templateUrl: './list-wrapper.component.html',
  styleUrls: ['./list-wrapper.component.scss'],
})
export class ListWrapperComponent implements OnInit {
  data: Task[] = [];
  loading: boolean = true;
  taskAddLoading: boolean = false;
  task: string = '';
  description: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((el) => {
      this.data = el.data.sort((a, b) => {
        return moment(b.timestamp).valueOf() - moment(a.timestamp).valueOf();
      });

      this.loading = false;
    });
  }

  handleSubmit() {
    const newTask: Task = {
      active: false,
      done: false,
      task: this.task,
      description: this.description,
    };

    this.taskAddLoading = true;

    this.taskService.addNewTask(newTask).subscribe((newData) => {
      this.data = [newData.data, ...this.data];
      this.task = '';
      this.description = '';
      this.taskAddLoading = false;
    });
  }

  onDelete(t: Task) {
    // Delay need to improve ux add ex add loading state
    this.taskService.deleteTask(t).subscribe((task) => {
      this.data = this.data.filter((el) => el.id !== t.id);
    });
  }

  onActiveTask(t: Task) {
    // Delay need to improve ux add ex add loading state
    this.taskService.updateTaskActive(t).subscribe((task) => {
      t.active = !t.active;
    });
  }
}
