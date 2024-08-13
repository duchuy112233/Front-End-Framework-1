import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { UserLoginRes } from '../../../types/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Add CommonModule here
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  authService = inject(AuthService);
  router = inject(Router);

  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: this.passwordMatchValidator() }
  );

  passwordMatchValidator(): ValidatorFn {
    return (form: AbstractControl): { [key: string]: any } | null => {
      const password = form.get('password')?.value;
      const confirmPassword = form.get('confirmPassword')?.value;
      return password === confirmPassword ? null : { mismatch: true };
    };
  }

  handleSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const registerData = {
      username: this.registerForm.value.username,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    console.log(registerData);
    this.authService.register(registerData).subscribe({
      next: (data) => {
        localStorage.setItem('token', (data as UserLoginRes).token);
        // Kiểm tra xem user có tồn tại không
        if ((data as UserLoginRes).user) {
          localStorage.setItem('userId', (data as UserLoginRes).user._id);
        }
        setTimeout(() => this.router.navigate(['/login']), 1000);
      },
      error: (error) => {
        // show error
        console.error(error.message);
      },
    });
    
  }
}
