import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Task } from '../task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
tasks:Task[]=[];
editActive=false;

constructor(private taskService:TaskService){}

ngOnInit(){
  this.fetchTasks();
}

fetchTasks(){

  this.taskService.getAllTasks().subscribe(response=>{
    console.log('all tasks fetched, response is',response);
    this.tasks=response;
  });

}

addTask(addTaskForm:NgForm){
  const title= addTaskForm.value.newTask;
  const newTask= new Task(title,false);
  this.taskService.addTask(newTask).subscribe(res=>{
    console.log('task added successfully',res)
    this.fetchTasks();
    addTaskForm.reset();
  })
}



updateTask(updateTaskForm:NgForm,task:Task){
  console.log('updated task is', updateTaskForm.value)
  const id=task.id;
  const title= updateTaskForm.value.newTitle;
  let completed=updateTaskForm.value.taskDone;
  if(completed===''){
    completed=false;
  }
  const updatedTask = new Task(title,completed)
  this.taskService.updateTask(id!,updatedTask).subscribe(response=>{
    console.log('task updated successfully',response)
    this.fetchTasks()
  })
}


deleteTask(id:string){
  this.taskService.deleteTask(id).subscribe(()=>{
    console.log('task deleted successfully');
    this.fetchTasks();
  })
}
  
}

