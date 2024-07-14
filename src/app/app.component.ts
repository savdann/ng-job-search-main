import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { JobService } from "./services/job.service";
import { FavoriteJobsComponent } from "./favorite-jobs/favorite-jobs.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, AllJobsComponent, FavoriteJobsComponent],
  providers: [JobService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ng-job-search'
}
