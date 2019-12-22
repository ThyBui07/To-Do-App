import { Injectable } from '@angular/core';
import { Task } from './task';
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskList:Task[] = [];
  //update taskList to use in other components
  public taskListUpdated$ = new BehaviorSubject<Task[]>(this.taskList);

  constructor(private http: HttpClient) { }

  gettaskList() {
    this.http.get<{taskList: any }>('http://localhost:3000/')
    .pipe(map(taskData => taskData.taskList.map(task => {
      return {
        content: task.content,
        id: task._id
      }
    })))
    .subscribe((transformedTask) => {
      console.log(transformedTask);
      //in the get method: it changes JSON format to javascript object
      this.taskList = transformedTask;
      this.taskListUpdated$.next([...this.taskList]);
    });
  }

  addTask(data) {
    this.http.post<{ message: string, taskId: string }>('http://localhost:3000/', data)
    .subscribe((res) => {
      console.log(res.message);
      data.id = res.taskId;
      console.log(data);
      this.taskList.push(data);
      this.taskListUpdated$.next([...this.taskList]);
    })

  }

  deleteTask(taskId: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/' + taskId)
      .subscribe((res) => {
        console.log(res.message);
        const updatedTaskList = this.taskList.filter(task => task.id != taskId);
        this.taskList = updatedTaskList;
        this.taskListUpdated$.next([...this.taskList]);
      })
  }

  editTask() {

  }
}
