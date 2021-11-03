import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from '../../components/shared/confirmation-dialog/confirmation-dialog.component';
import { LoadingComponent } from '../../components/shared/loading/loading.component';
import { MainContainerComponent } from '../../components/shared/main-container/main-container.component';
import { ConfirmDialogDirective } from '../../directives/confirm-dialog/confirm-dialog.directive';
import { DebounceClickDirective } from '../../directives/debounce-click/debounce-click.directive';
import { DialogComponentDirective } from '../../directives/dialog-component/dialog-component.directive';
import { LoadingOverlayDirective } from '../../directives/loading-overlay/loading-overlay.directive';
import { MatInputFocusDirective } from '../../directives/mat-input-focus/mat-input-focus.directive';
import { SafeUrlPipe } from '../../pipes/safe-url/safe-url.pipe';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    MainContainerComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    SafeUrlPipe,
    ConfirmDialogDirective,
    DebounceClickDirective,
    DialogComponentDirective,
    LoadingOverlayDirective,
    MatInputFocusDirective,
  ],
  providers: [SafeUrlPipe],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ScrollingModule,
    MainContainerComponent,
    LoadingComponent,
    ConfirmationDialogComponent,
    SafeUrlPipe,
    ConfirmDialogDirective,
    DebounceClickDirective,
    DialogComponentDirective,
    LoadingOverlayDirective,
    MatInputFocusDirective,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule, ScrollingModule],
})
export class SharedModule {}
