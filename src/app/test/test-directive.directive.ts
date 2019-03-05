import { Directive, ViewContainerRef } from '@angular/core';
import { RandomizeService } from '../services/randomize.service';

@Directive({
  selector: '[appTestDirective]'
})
export class TestDirectiveDirective {

  constructor(
    private randomizeServicesAlias: RandomizeService,
    private vcRef: ViewContainerRef
  ) {

    console.log('-------------');

    console.log('vcRef', vcRef);

    console.log('randomizeServicesAlias TestDirectiveDirective', randomizeServicesAlias.getSalt());
  }

}
