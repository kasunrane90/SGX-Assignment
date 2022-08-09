import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { SimpleFormService } from 'src/app/shared/services/simple-form.service';
import { SuccessModalComponent } from 'src/app/shared/components/success-modal/success-modal.component'; 

@Component({
	selector: 'app-simple-form',
	templateUrl: './simple-form.component.html',
	styleUrls: ['./simple-form.component.scss']
})
export class SimpleFormComponent implements OnInit {
	simpleForm: FormGroup = new FormGroup({});
	isDataSaved = true;
	uploadedImageURLs = '';
	selectedFiles?: FileList;
	imagePreviews: string[] = [];

	constructor(private fb: FormBuilder, private simpleFormService: SimpleFormService, public dialog: MatDialog, private http: HttpClient) { }

	ngOnInit(): void {
		this.initializeForm()
	}

	// form initializer
	initializeForm() {
		this.simpleForm = this.fb.group({
			fname: [null, [Validators.required]],
			lname: [null, [Validators.required]],
			desc: [null, [Validators.required]],
			email: [null, [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
		})
	}

	// function for trigger the the email
	sendEmail() {
		const headers = new HttpHeaders({ "Content-Type": "application/json" });
		this.http.post('https://formspree.io/f/mdojoove',
			{ Name: `${this.simpleForm.value.fname} ${this.simpleForm.value.lname}`, Email: this.simpleForm.value.email, Description: this.simpleForm.value.desc, Attachments: this.uploadedImageURLs },
			{ headers: headers }
		).subscribe(response => {
			this.isDataSaved = true;
			this.openDialog()
		});

	}

	// collect form data to send the email - upload images to the serever if there any images selected
	saveSimpleForm() {
		this.isDataSaved = false;
		const selectedFilesCount = this.selectedFiles && this.selectedFiles.length ? this.selectedFiles.length : 0
		if(this.selectedFiles && selectedFilesCount > 0) { // checks for whether any files selected or not
			for(let i = 0; i < selectedFilesCount; i++) {
				// image upload http request
				this.simpleFormService.uploadImage(this.selectedFiles[i]).subscribe(
					(event: any) => {
						if (typeof (event) === 'object') {
							this.uploadedImageURLs += event.link + ', '
						}
						if(selectedFilesCount === (i + 1)){
							console.log(this.uploadedImageURLs)
							this.sendEmail()
						}
					}
				)
			}
		} else {
			this.sendEmail()
		}
	}

	// get selected files
	selectFiles(event: any): void {
		this.selectedFiles = event.target.files;
		if (this.selectedFiles && this.selectedFiles[0]) {
			const numberOfFiles = this.selectedFiles.length;
			for (let i = 0; i < numberOfFiles; i++) {
				const reader = new FileReader();
				reader.onload = (e: any) => {
					this.imagePreviews.push(e.target.result);
				};
				reader.readAsDataURL(this.selectedFiles[i]);
			}
		}
	}

	// open success modal
	openDialog() {
		this.dialog.open(SuccessModalComponent);
	}
}
