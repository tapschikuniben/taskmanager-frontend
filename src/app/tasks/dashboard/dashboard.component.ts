import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // 👈 needed for *ngIf, *ngFor
import { TaskService } from '../../core/services/task.service';
import { Task, TaskStatus } from '../../shared/models/task.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule], // 👈 add CommonModule here
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tasks: Task[] = [];
  loading = false;
  errorMessage: string | null = null;
  taskToDelete: Task | null = null;
  successMessage: string | null = null;


  constructor(
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks() {
    this.loading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Failed to load tasks';
        this.loading = false;
      }
    });
  }

  createTask() {
    this.router.navigate(['/tasks/new']);
  }

  editTask(taskId: string) {
    this.router.navigate([`/tasks/${taskId}`]);
  }

  deleteTask(taskId: string) {
    if (!confirm('Are you sure you want to delete this task?')) return;
    this.taskService.deleteTask(taskId).subscribe({
      next: () => this.fetchTasks(),
      error: (err) => this.errorMessage = err?.error?.message || 'Failed to delete task'
    });
  }

  toggleStatus(task: Task) {
  const nextStatus: TaskStatus = this.getNextStatus(task.status);
  this.taskService.updateTaskStatus(task.id, nextStatus).subscribe({
    next: () => this.fetchTasks(),
    error: (err) => this.errorMessage = err?.error?.message || 'Failed to update status'
  });
}


// Define the next status cycle
getNextStatus(current: TaskStatus): TaskStatus {
  switch (current) {
    case 'PENDING':
      return 'IN_PROGRESS';
    case 'IN_PROGRESS':
      return 'COMPLETED';
    case 'COMPLETED':
      return 'CANCELLED';
    case 'CANCELLED':
      return 'PENDING';
  }
}


// Button label for toggling
getNextStatusLabel(task: Task): string {
  switch (task.status) {
     case 'PENDING': return 'Start ⏳';
    case 'IN_PROGRESS': return 'Complete ✅';
    case 'COMPLETED': return 'Cancel ❌';
    case 'CANCELLED': return 'Restart 🔄';
  }
}

updateTaskStatusFromEvent(task: Task, event: Event) {
  const value = (event.target as HTMLSelectElement).value as TaskStatus;
  this.updateTaskStatus(task, value);
}


updateTaskStatus(task: Task, status: TaskStatus) {
  this.taskService.updateTaskStatus(task.id, status).subscribe({
    next: () => {
      this.successMessage = `Status for "${task.title}" updated successfully!`;
      this.fetchTasks();
      setTimeout(() => this.successMessage = null, 3000); // disappear after 3 seconds
    },
    error: err => this.errorMessage = err?.error?.message || 'Failed to update status'
  });
}

confirmDelete() {
  if (!this.taskToDelete) return;
  const deletedTaskTitle = this.taskToDelete.title;
  this.taskService.deleteTask(this.taskToDelete.id).subscribe({
    next: () => {
      this.fetchTasks();
      this.taskToDelete = null;
      this.successMessage = `Task "${deletedTaskTitle}" deleted successfully!`;
      setTimeout(() => this.successMessage = null, 3000); // disappear after 3 seconds
    },
    error: err => {
      this.errorMessage = err?.error?.message || 'Failed to delete task';
      this.taskToDelete = null;
    }
  });
}


// Open modal
openDeleteModal(task: Task) {
  this.taskToDelete = task;
}


}
