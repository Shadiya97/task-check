import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }

getAllTasks(){
  return this.http.get('https://task-check-2f4ad-default-rtdb.firebaseio.com/.json').pipe(map((response:any)=>{
    let newArray=[];
    for(const key in response){
    newArray.push({id:key,...response[key]})
    }
    // console.log(newArray);
    return newArray;
  }))
}

getTask(){}



addTask(task:Task){
  return this.http.post('https://task-check-2f4ad-default-rtdb.firebaseio.com/.json',task)
}

updateTask(id:string,task:Task){
  return this.http.put(`https://task-check-2f4ad-default-rtdb.firebaseio.com/${id}.json`,task)
}

deleteTask(id:string){
  return this.http.delete(`https://task-check-2f4ad-default-rtdb.firebaseio.com/${id}.json`)
}



}
