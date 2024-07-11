import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Job } from '../model/job.model';
import { JobDetails } from "../model/details.model";
import { toObservable } from "@angular/core/rxjs-interop";

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private initialized = false;
  private _jobs = signal<Job[]>([]);
  private _favoriteJobs = computed<Job[]>(() => this._jobs().filter(j => j.isFavorite));
  private jobId = signal(0);
  httpClient = inject(HttpClient);

  constructor() {
    toObservable(this._favoriteJobs).subscribe(fav => {
      if (this.initialized) {
        localStorage.setItem('favJobs', JSON.stringify(fav))
      }
      this.initialized = true;
    })
  }

  loadAllJobs() {
    return this
      .fetchJobs('/jobs', 'Something went wrong fetching the jobs. Please try again later.')
      .pipe(tap(() => {
          const favs: Job[] = JSON.parse(localStorage.getItem('favJobs') || '[]');
          console.warn('favs', favs)
          favs.forEach(f => this.addJobToFavorites(f))
        }
      ));
  }

  get jobs() {
    return this._jobs.asReadonly();
  }

  get favoriteJobs() {
    return this._favoriteJobs;
  }

  addJobToFavorites(job: Job) {
    console.warn('addJobToFavorites', job)
    this._jobs.update(jobs => {
        jobs.forEach(j => {
            if (j.id === job.id) {
              j.isFavorite = true;
            }
          }
        );
        return [...jobs];
      }
    );
  }

  removeJobFromFavorites(job: Job) {
    console.warn('removed', job)
    this._jobs.update(jobs => {
        jobs.forEach(j => {
            if (j.id === job.id) {
              j.isFavorite = false;
            }
          }
        );
        return [...jobs];
      }
    );
  }

  setJobId(jobId: number) {
    this.jobId.update(() => jobId);
    console.log(`job service set jobId ${{jobId}}`);
  }

  getJobId() {
    console.log('job service get jobId');
    return this.jobId();
  }

  loadJobDetails(id: number) : Observable<JobDetails> {
    return this.fetchJobDetails(`/jobs/${id}`, 'Something went wrong fetching the jobs. Please try again later.');
  }

  private fetchJobs(url: string, errorMessage: string): Observable<Job[]> {
    return this.httpClient
      .get<Job[]>(url)
      .pipe(tap((jobs)=> this._jobs.set(jobs) ), catchError((error) => {
          console.log(error);
          return throwError(
            () =>
              new Error(
                errorMessage
              )
          );
        })
      )
  }

  private fetchJobDetails(url: string, errorMessage: string): Observable<JobDetails> {
    return this.httpClient.get<JobDetails>(url).pipe(catchError((error) => {
      console.log(error);
      return throwError(() => new Error(errorMessage));
    })
    )
  }

}
