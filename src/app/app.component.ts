import {Component, Inject, ViewContainerRef} from '@angular/core';
import {TestService} from './services/test.service';
import {CONFIG_TOKEN, IConf, TEST_FACTORY_TOKEN, TEST_SERVICE, TEST_SERVICE_ALIAS} from './tokens';
import {TestAService} from './services/test-a.service';
import { RandomizeService } from './services/randomize.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [RandomizeService]
})
export class AppComponent {
  title = 'di-app';

  isHide = false;

  constructor(
    @Inject(TEST_SERVICE) private testService: TestService,
    @Inject(TEST_SERVICE_ALIAS) private testServiceAlias: TestService,
    @Inject(CONFIG_TOKEN) private config: IConf,
    @Inject(TEST_FACTORY_TOKEN) private testAService: TestAService,
    private vcRef: ViewContainerRef,
    private randomizeServices: RandomizeService
  ) {

    console.log('randomizeServices AppComponent', randomizeServices.getSalt());

    // console.log('vcRef', vcRef);
    //
    // console.log(testAService.getPostfix());
    //
    // console.log('----');
    //
    // console.log('config', config);
    //
    // console.log('----');
    //
    // testServiceAlias.getSalt();
    //
    // console.log('--------');
    //
    // testService.getSalt();
  }
}
