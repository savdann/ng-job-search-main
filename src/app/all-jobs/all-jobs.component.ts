import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Job } from '../model/job.model';
import { JobService } from '../services/job.service';
import { NgClass } from "@angular/common";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-all-jobs',
  standalone: true,
  imports: [NgClass, RouterModule],
  templateUrl: './all-jobs.component.html',
  styleUrl: './all-jobs.component.css',
})
export class AllJobsComponent implements OnInit {
  private jobService = inject(JobService);
  private destroyRef = inject(DestroyRef);
  jobs = this.jobService.jobs;
  isFetching = signal(false);
  error = signal('');

  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.jobService.loadAllJobs()
      .subscribe({
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false)
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onCheckFavorite(jobToAdd: Job) {
    const checkFavorite = this.jobService.favoriteJobs().find(job => job.id === jobToAdd.id);
    if (checkFavorite) {
      this.jobService.removeJobFromFavorites(checkFavorite);
    } else {
      this.jobService.addJobToFavorites(jobToAdd);
    }
  }

  onJobDetails(id: number) {
    this.jobService.setJobId(id);
  }

}
