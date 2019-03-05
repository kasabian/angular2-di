import {TestAService} from './test-a.service';

declare let Math: any;

export class TestService {

  random: string;

  constructor(testAService: TestAService) {
    this.random = Math.floor(Math.random() * 1000) + testAService.getPostfix();
  }

  getSalt() {
    console.log('random', this.random);
  }

}
