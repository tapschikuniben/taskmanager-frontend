import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../core/services/task.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent {
  taskForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  taskId: string | null = null; // for edit

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      status: ['PENDING', Validators.required]
    });

    // check if we are editing
    this.taskId = this.route.snapshot.paramMap.get('id');
    if (this.taskId) {
      this.loadTask(this.taskId);
    }
  }

  loadTask(id: string) {
    this.taskService.getTask(id).subscribe({
      next: task => this.taskForm.patchValue(task),
      error: err => this.errorMessage = err?.error?.message || 'Failed to load task'
    });
  }

  goBack() {
  this.router.navigate(['/tasks']);
}


  onSubmit() {
  if (this.taskForm.invalid) return;

  if (this.taskId) {
    // Update existing task — stay on the form
    this.taskService.updateTask(this.taskId, this.taskForm.value).subscribe({
      next: () => {
        this.successMessage = 'Task updated successfully!';
        setTimeout(() => this.successMessage = null, 3000); // disappear after 3 seconds
        this.errorMessage = null;
      },
      error: err => this.errorMessage = err?.error?.message || 'Update failed'
    });
  } else {
    // Create new task — redirect to dashboard
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.successMessage = 'Task created successfully! Redirecting...';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/tasks']), 1500);
      },
      error: err => this.errorMessage = err?.error?.message || 'Creation failed'
    });
  }
}

}

