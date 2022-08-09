import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SimpleFormComponent } from './components/simple-form/simple-form.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { SuccessModalComponent } from './shared/components/success-modal/success-modal.component';
import { environment } from '../environments/environment';

import { NgMaterialModule } from './shared/ng-material/ng-material.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

@NgModule({
	declarations: [
		AppComponent,
		SimpleFormComponent,
  		LoaderComponent,
  		SuccessModalComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		NgMaterialModule,
		ReactiveFormsModule,
		FormsModule,
		HttpClientModule,
  		provideFirebaseApp(() => initializeApp(environment.firebase))
	],
	providers: [
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }
	],
	bootstrap: [AppComponent]
})

export class AppModule { }
