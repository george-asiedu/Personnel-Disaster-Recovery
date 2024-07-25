import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SpinnerComponent } from '../components/spinner/spinner.component';
import { NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../auth/authService/auth.service';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [SpinnerComponent, NgIf, ReactiveFormsModule],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss'
})
export class AccountSettingsComponent implements OnInit {
  public loading: boolean = false
  public image: string | null = null
  public profileForm: FormGroup
  public name: string | null = null
  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef 

  constructor(
    private fb: FormBuilder, 
    private as: AuthService,
    private route: ActivatedRoute,
    private shared: SharedService,
    private toast: NgToastService) {
      this.profileForm = this.fb.group({
        name: [''],
        email: [''],
        image: [null]
      })
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.name = params.get('name')
      this.getUserData()
    })
  }

  getUserData() {
    const currentUser = this.as.currentUserValue
    if(currentUser) {
      const user = currentUser.data.user
      this.profileForm.patchValue({
        name: user.name,
        email: user.email
      })
      this.image = user.image || null
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault()
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer?.files) {
      const file = event.dataTransfer.files[0]
      if (file && file.type.startsWith('image/')) {
        this.loadImage(file)
      }
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      if (file && file.type.startsWith('image/')) {
        this.loadImage(file)
      }
    }
  }

  onClickUpload(): void {
    this.fileInput.nativeElement.click()
  }

  private loadImage(file: File): void {
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      this.toast.danger("Image size exceeds 5 MB, please choose a smaller file", "Error", 3000)
      return
    }
  
    const reader = new FileReader()
    reader.onload = (e: any) => {
      this.image = e.target.result
      this.profileForm.patchValue({ image: file })
    }
    reader.readAsDataURL(file)
  }

  onCancel(): void {
    this.profileForm.reset()
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      return
    }

    this.loading = true

    const formData = new FormData()
    formData.append('name', this.profileForm.get('name')?.value)
    formData.append('email', this.profileForm.get('email')?.value)
    const image: File = this.profileForm.get('image')?.value
    if (image) {
      formData.append('image', image)
    }

    this.shared.changeImage(formData).subscribe({
      next: (response) => {
        console.log('image response', response)
        this.loading = false
        this.toast.success(response.message, "Success", 3000)
      },
      error: (err) => {
        console.error('Error message', err?.message)
        this.loading = false
        this.toast.danger("Image failed to upload, please try again", "Error", 3000)
      }
    })
  }
}