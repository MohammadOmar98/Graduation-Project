import { Component, OnInit, Input } from '@angular/core';
import { CdkStepper } from '@angular/cdk/stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper implements OnInit {
  @Input() linearModeSelected: boolean;

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.linear = this.linearModeSelected;
  }

  // tslint:disable-next-line:typedef
  onClick(index: number) {
    this.selectedIndex = index;
  }

}
