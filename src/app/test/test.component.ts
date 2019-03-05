import { Component, Host, Inject, InjectionToken, Injector, OnInit, SkipSelf, ViewContainerRef } from '@angular/core';
import {TEST_FACTORY_TOKEN} from '../tokens';
import {TestAService} from '../services/test-a.service';
import { RandomizeService } from '../services/randomize.service';

// class A {
//   name = 'A';
//   constructor(b: B, c: C, name: any) {
//     this.name = name;
//   }
// }
//
// class B {
//   name = 'B';
//   constructor(c: C) {
//   }
// }
//
// class C {
//   name = 'C';
//   constructor() {
//   }
// }

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  providers: [RandomizeService]
})
export class TestComponent implements OnInit {

  constructor(
    @Inject(TEST_FACTORY_TOKEN) private testAService: TestAService,
    private vcRef: ViewContainerRef,

   @SkipSelf()
    private randomizeServices: RandomizeService,

   @Host()
   private randomizeServicesAlias: RandomizeService
    // private injector: Injector
  ) {

    console.log('randomizeServices TestComponent', randomizeServices.getSalt());
    console.log('randomizeServicesAlias TestComponent', randomizeServicesAlias.getSalt());

    console.log('vcRef', vcRef);

    // const RandomServiceToken = new InjectionToken<RandomizeService>('RandomizeService:Test-app');

    // A -> B -> C

    // const i = Injector.create([
    //   { provide: RandomServiceToken, useClass: RandomizeService, deps: [] },
    //   { provide: A, useClass: A, deps: [B, C, C] },
    //   { provide: B, useClass: B, deps: [C] },
    //   { provide: C, useClass: C, deps: [] },
    // ]);

    // console.log('i.get(A)', i.get(A).name);

    // console.log('i', i.get(RandomServiceToken).getSalt());
    //
    // console.log('randomizeService', this.randomizeService.getSalt());

    //console.log('injector', injector);
    //console.log('i', i);

    //console.log('injector', injector.get(RandomizeService).getSalt());

    // console.log('injector', injector);
    //
    // console.log('test app', vcRef);
  }

  ngOnInit() {
  }

}
