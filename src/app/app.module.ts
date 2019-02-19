import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TestService} from './test.service';
import {CONFIG, CONFIG_TOKEN, TEST_FACTORY_TOKEN, TEST_SERVICE, TEST_SERVICE_ALIAS} from './tokens';
import {TestAService} from './test-a.service';
import {TestComponent} from './test/test.component';

export function factory() {
  return new TestAService();
}

export function factoryTestService(testAService) {
  return new TestService(testAService);
}

@NgModule({
  declarations: [
    AppComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [

    // You can use some predefined tokens for hook over staging of bootstrapping app

    // { provide: APP_INITIALIZER, useFactory: delayBootstrapping, multi: true },
    // { provide: APP_BOOTSTRAP_LISTENER, useFactory: appBootstrapped, multi: true },
    // { provide: PLATFORM_INITIALIZER, useFactory: platformInitialized, multi: true }

    { provide: TestAService, useClass: TestAService }, // This is simple way to declare Dependency throuth class.
    // { provide: TEST_SERVICE_ALIAS, useClass: TestService } This is not alias
    { provide: TEST_SERVICE_ALIAS, useExisting: TEST_SERVICE }, // TEST_SERVICE_ALIAS is alias TEST_SERVICE
    { provide: CONFIG_TOKEN, useValue: CONFIG }, // If you are need just value
    { provide: TEST_FACTORY_TOKEN, useFactory: factory }, // If use factory you can add some logic before obtain dependency instance
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
