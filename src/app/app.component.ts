import { Component } from '@angular/core';
import { Task } from './task';
import { TaskService } from './post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  keyupInput = '';
  taskList: Task[] = [];

  constructor(public taskService: TaskService) {

  }

  ngOnInit() {
    this.taskService.gettaskList();
    this.taskService.taskListUpdated$.subscribe(data => {
      this.taskList = data;
    })
  }

  addTask() {
    const data: Task = {id: null, content: this.keyupInput};
    // console.log(data);
    this.taskService.addTask(data);
    this.keyupInput = '';
  }

  editTask() {

  }

  deleteTask(taskId: string) {
    this.taskService.deleteTask(taskId);
  }
}
