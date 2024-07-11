import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';

@Component({
  selector: 'app-favorite-jobs',
  standalone: true,
  imports: [],
  templateUrl: './favorite-jobs.component.html',
  styleUrl: './favorite-jobs.component.css'
})
export class FavoriteJobsComponent implements OnInit {

  constructor(private jobService: JobService) {
  }
  ngOnInit() {

  }
  favorites = this.jobService.favoriteJobs();

}
