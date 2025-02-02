import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  template: `
    <div class="auth-page">
      <mat-card class="auth-card">
        <div class="auth-header">
          <h1>Create Account</h1>
          <p>Join our manga community</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          <div class="name-fields">
            <mat-form-field appearance="outline">
              <mat-label>First Name</mat-label>
              <input matInput formControlName="firstName" placeholder="Enter your first name">
              <mat-error *ngIf="registerForm.get('firstName')?.hasError('required')">
                First name is required
              </mat-error>
            </mat-form-field>

            <mat-form-field appearance="outline">
              <mat-label>Last Name</mat-label>
              <input matInput formControlName="lastName" placeholder="Enter your last name">
              <mat-error *ngIf="registerForm.get('lastName')?.hasError('required')">
                Last name is required
              </mat-error>
            </mat-form-field>
          </div>

          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" placeholder="Enter your email">
            <mat-error *ngIf="registerForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="registerForm.get('email')?.hasError('email')">
              Please enter a valid email address
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="registerForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
            <mat-error *ngIf="registerForm.get('password')?.hasError('minlength')">
              Password must be at least 8 characters long
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Confirm Password</mat-label>
            <input matInput [type]="hideConfirmPassword ? 'password' : 'text'" formControlName="confirmPassword">
            <button mat-icon-button matSuffix (click)="hideConfirmPassword = !hideConfirmPassword" type="button">
              <mat-icon>{{hideConfirmPassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="registerForm.get('confirmPassword')?.hasError('required')">
              Please confirm your password
            </mat-error>
            <mat-error *ngIf="registerForm.hasError('passwordMismatch')">
              Passwords do not match
            </mat-error>
          </mat-form-field>

          <div class="form-actions">
            <mat-checkbox color="primary" formControlName="termsAccepted">
              I agree to the <a href="/terms" target="_blank">Terms of Service</a>
            </mat-checkbox>
          </div>

          <button mat-raised-button color="primary" type="submit" 
                  [disabled]="registerForm.invalid || isLoading || !registerForm.get('termsAccepted')?.value">
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
            <span *ngIf="!isLoading">Create Account</span>
          </button>

          <div class="auth-footer">
            <span>Already have an account?</span>
            <a routerLink="/auth/login">Login</a>
          </div>
        </form>
      </mat-card>
    </div>
  `,
  styles: [`
    .auth-page {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 2rem 1rem;
      background-color: #111111;
    }

    .auth-card {
      width: 100%;
      max-width: 500px;
      background-color: #1a1a1a;
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #ffffff;
      padding: 2rem;
    }

    .auth-header {
      text-align: center;
      margin-bottom: 2rem;

      h1 {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      p {
        color: #666666;
        font-size: 1rem;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      .name-fields {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        @media (max-width: 480px) {
          grid-template-columns: 1fr;
        }
      }

      mat-form-field {
        width: 100%;

        ::ng-deep {
          .mat-mdc-form-field-flex {
            background-color: rgba(255, 255, 255, 0.05);
          }

          .mat-mdc-text-field-wrapper {
            background-color: transparent;
          }

          .mat-mdc-form-field-label {
            color: rgba(255, 255, 255, 0.6);
          }

          .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__leading,
          .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__notch,
          .mdc-text-field--outlined:not(.mdc-text-field--disabled) .mdc-notched-outline__trailing {
            border-color: rgba(255, 255, 255, 0.1);
          }

          .mat-mdc-form-field-infix {
            color: #ffffff;
          }
        }
      }

      .form-actions {
        margin: 0.5rem 0;

        mat-checkbox {
          color: #ffffff;

          a {
            color: #6600ff;
            text-decoration: none;

            &:hover {
              text-decoration: underline;
            }
          }
        }
      }

      button[type="submit"] {
        margin-top: 1rem;
        background-color: #6600ff;
        color: #ffffff;
        padding: 0.75rem;
        font-size: 1rem;
        position: relative;
        min-height: 48px;

        &:hover:not(:disabled) {
          background-color: #7f1fff;
        }

        &:disabled {
          background-color: rgba(102, 0, 255, 0.5);
        }

        mat-spinner {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);

          ::ng-deep circle {
            stroke: #ffffff;
          }
        }
      }
    }

    .auth-footer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.9rem;

      span {
        color: #666666;
      }

      a {
        color: #6600ff;
        text-decoration: none;
        margin-left: 0.5rem;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  `]
})
export class RegisterPageComponent {
  registerForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      termsAccepted: [false, [Validators.requiredTrue]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password?.value !== confirmPassword?.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.isLoading = true;
      // TODO: Implement actual registration
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        this.snackBar.open('Account created successfully! Please log in.', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }, 1500);
    }
  }
}
