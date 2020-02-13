import { Component, OnInit } from '@angular/core';

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

interface Column {
  title: string;
  id: string;
  tasks?: Task[];
}

interface Task {
  title: string;
  description: string;
  id: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-kanban-dd';

  public columns: Column[] = [
    {
      title: 'Todo',
      id: window.btoa(Math.random().toString()),
      tasks: [
        {
          title: 'Tarefa 1',
          description: 'lorem ipsum dorime ameno',
          id: window.btoa('t' + Math.random().toString()),
        },
        {
          title: 'Tarefa 2',
          description: 'lorem ipsum dorime ameno',
          id: window.btoa('t' + Math.random().toString()),
        },
        {
          title: 'Tarefa 3',
          description: 'lorem ipsum dorime ameno',
          id: window.btoa('t' + Math.random().toString()),
        },
      ],
    },
    {
      title: 'Doing',
      id: window.btoa(Math.random().toString()),
      tasks: []
    },
    {
      title: 'Done',
      id: window.btoa(Math.random().toString()),
      tasks: []
    },
  ];

  get columnIds(): string[] {
    return this.columns.map(column => column.id);
  }


  drop(event: CdkDragDrop<Task[]>) {
    console.log('dragged item', event.item.data);
    const currentIndex = event.currentIndex;

    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log('previous', event.container.data[currentIndex - 1]);
    console.log('next', event.container.data[currentIndex + 1]);
  }

  public ngOnInit() {}
}
