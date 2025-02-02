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
  selector: 'app-login-page',
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
          <h1>Welcome Back!</h1>
          <p>Sign in to continue reading manga</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <mat-form-field appearance="outline">
            <mat-label>Email</mat-label>
            <input matInput type="email" formControlName="email" placeholder="Enter your email">
            <mat-error *ngIf="loginForm.get('email')?.hasError('required')">
              Email is required
            </mat-error>
            <mat-error *ngIf="loginForm.get('email')?.hasError('email')">
              Please enter a valid email address
            </mat-error>
          </mat-form-field>

          <mat-form-field appearance="outline">
            <mat-label>Password</mat-label>
            <input matInput [type]="hidePassword ? 'password' : 'text'" formControlName="password">
            <button mat-icon-button matSuffix (click)="hidePassword = !hidePassword" type="button">
              <mat-icon>{{hidePassword ? 'visibility_off' : 'visibility'}}</mat-icon>
            </button>
            <mat-error *ngIf="loginForm.get('password')?.hasError('required')">
              Password is required
            </mat-error>
          </mat-form-field>

          <div class="form-actions">
            <mat-checkbox color="primary">Remember me</mat-checkbox>
            <a routerLink="/auth/forgot-password" class="forgot-password">Forgot password?</a>
          </div>

          <button mat-raised-button color="primary" type="submit" [disabled]="loginForm.invalid || isLoading">
            <mat-spinner diameter="20" *ngIf="isLoading"></mat-spinner>
            <span *ngIf="!isLoading">Sign In</span>
          </button>

          <div class="auth-footer">
            <span>Don't have an account?</span>
            <a routerLink="/auth/register">Sign up</a>
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
      max-width: 400px;
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: -0.5rem 0;

        mat-checkbox {
          color: #ffffff;
        }

        .forgot-password {
          color: #6600ff;
          text-decoration: none;
          font-size: 0.9rem;

          &:hover {
            text-decoration: underline;
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
export class LoginPageComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      // TODO: Implement actual authentication
      setTimeout(() => {
        this.isLoading = false;
        this.router.navigate(['/home']);
        this.snackBar.open('Successfully logged in!', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }, 1500);
    }
  }
}
