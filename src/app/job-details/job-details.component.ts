import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JobService } from '../services/job.service';
import {JobDetails} from "../model/details.model";
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";

@Component({
  selector: 'app-job-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.css'
})
export class JobDetailsComponent implements OnInit {
  private jobService = inject(JobService);
  private destroyRef = inject(DestroyRef);
  private sanitizer = inject(DomSanitizer);

  isFetching = signal(false);
  error = signal('');
  _jobDetails = signal<JobDetails | undefined>(undefined)
  sanitizedDescription:SafeHtml = '';


  ngOnInit() {
    this.isFetching.set(true);
    const subscription = this.jobService.loadJobDetails(this.jobService.getJobId())
      .subscribe({
        next: (resData) => {
          this._jobDetails.set(resData);
          this.sanitizedDescription = this.sanitizeHtml(resData.description);
        },
        error: (error: Error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false)
      });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
