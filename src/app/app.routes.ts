import { Routes } from '@angular/router';
import { AllJobsComponent } from './all-jobs/all-jobs.component';
import { FavoriteJobsComponent } from './favorite-jobs/favorite-jobs.component';
import { JobDetailsComponent } from './job-details/job-details.component';

export const routes: Routes = [

    { path: '', redirectTo: 'tabs', pathMatch: 'full' },
    { path: 'tabs', children: [
        { path: '', redirectTo: 'all-jobs', pathMatch: 'full' },
        { path: 'all-jobs', component: AllJobsComponent },
        { path: 'favorite-jobs', component: FavoriteJobsComponent },
        { path: 'job-details', component: JobDetailsComponent }
    ]}
]
