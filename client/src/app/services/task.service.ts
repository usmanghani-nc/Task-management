import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interface/task';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl: string =
    'https://1x2xylnta8.execute-api.eu-central-1.amazonaws.com/Prod';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.apiUrl);
  }

  deleteTask(task: Task) {
    return this.http.delete(`${this.apiUrl}/${task.id}`);
  }

  updateTaskActive(task: Task) {
    return this.http.put(`${this.apiUrl}/${task.id}`, task, httpOptions);
  }

  updateTaskDone(task: Task) {
    return this.http.put(`${this.apiUrl}/${task.id}`, task, httpOptions);
  }

  addNewTask(task: Task) {
    return this.http.post(this.apiUrl, task, httpOptions);
  }
}
