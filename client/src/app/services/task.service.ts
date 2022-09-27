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
    'https://aef3xu4820.execute-api.eu-central-1.amazonaws.com/Prod';

  constructor(private http: HttpClient) {}

  getTasks(): Observable<{ data: Task[] }> {
    return this.http.get<{ data: Task[] }>(`${this.apiUrl}/tasks`);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(`${this.apiUrl}/task/${task.id}`);
  }

  updateTaskActive(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/task/${task.id}`,
      task,
      httpOptions
    );
  }

  updateTaskDone(task: Task): Observable<Task> {
    return this.http.put<Task>(
      `${this.apiUrl}/task/${task.id}`,
      task,
      httpOptions
    );
  }

  addNewTask(task: Task): Observable<{ data: Task }> {
    return this.http.post<{ data: Task }>(
      `${this.apiUrl}/task`,
      task,
      httpOptions
    );
  }
}
