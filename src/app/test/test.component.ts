import {Component, Inject, OnInit, ViewContainerRef} from '@angular/core';
import {TEST_FACTORY_TOKEN} from '../tokens';
import {TestAService} from '../test-a.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    @Inject(TEST_FACTORY_TOKEN) private testAService: TestAService,
    private vcRef: ViewContainerRef
  ) {
    console.log('test app', vcRef);
  }

  ngOnInit() {
  }

}
