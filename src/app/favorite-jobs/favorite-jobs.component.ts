import { Component } from '@angular/core';
import { JobService } from '../services/job.service';
import {Job} from "../model/job.model";

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css'
})
export class FavoriteJobsComponent {
  favorites: Job[] = [];

  constructor(private jobService: JobService) {
    this.jobService.loadAllJobs().subscribe(() => {
      this.favorites = this.jobService.favoriteJobs();
    });
  }

}
