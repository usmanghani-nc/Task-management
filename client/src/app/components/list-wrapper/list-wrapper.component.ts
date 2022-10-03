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
  edit: boolean = false;
  cardLoading: any = false;

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

    this.cardLoading = t.id;

    this.taskService.deleteTask(t).subscribe((task) => {
      this.data = this.data.filter((el) => el.id !== t.id);
      this.cardLoading = false;

      console.log(task, '<= deleteTask.subscribe');
    });
  }

  onActiveTask(t: Task) {
    this.cardLoading = t.id;

    this.taskService.updateTaskActive(t).subscribe((task) => {
      t.active = !t.active;
      this.cardLoading = false;

      console.log(task, '<= updateTaskActive.subscribe');
    });
  }

  onDone(t: Task) {
    this.cardLoading = t.id;

    const newTask = {
      ...t,
      done: !t.done,
    };
    this.taskService.updateTaskDone(newTask).subscribe((task) => {
      console.log(task, '<= newTask.subscribe');
      this.cardLoading = false;
      t.done = !t.done;
    });
  }
}
