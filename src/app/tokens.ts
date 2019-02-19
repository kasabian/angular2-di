import {inject, InjectionToken} from '@angular/core';
import {TestService} from './test.service';
import {TestAService} from './test-a.service';

export interface IConf {
  url: string;
  token: string;
}

export const CONFIG = {
  url: 'some url',
  token: 'some token'
};

// Examples for creation tokens for DI
export const CONFIG_TOKEN = new InjectionToken<IConf>('Conf:app');

export const TEST_SERVICE_ALIAS = new InjectionToken<TestService>('TestServiceAlias:app');

export const TEST_FACTORY_TOKEN = new InjectionToken<TestAService>('TestAService:app');

// Is example how to crate token with assign factory for that token and use 'providedIn' way.
export const TEST_SERVICE = new InjectionToken<TestService>('TestService:app', {
  providedIn: 'root',
  factory: () => new TestService(inject(TestAService))
});
