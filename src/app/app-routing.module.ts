import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', component: SimpleFormComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
