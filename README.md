# Angular2 what need to know about dependency injection

## Part 1 

###### For create injection token use InjectionToken class

Simple example:
```typescript
export const TEST_FACTORY_TOKEN = new InjectionToken<TestAService>('TestAService:app');
```

Extended example:

```typescript
// Is example how to crate token with assign factory for that token and use 'providedIn' way.
export const TEST_SERVICE = new InjectionToken<TestService>('TestService:app', {
  providedIn: 'root',
  factory: () => new TestService(inject(TestAService))
});
```

Also you can use predefined system tokens

 PLATFORM_INITIALIZER: Callback is invoked when a platform is initialized.  
 APP_BOOTSTRAP_LISTENER: Callback is invoked for each component that is bootstrapped. The handler function receives the ComponentRef instance of the bootstrapped component. <br>
 APP_INITIALIZER: Callback is invoked before an app is initialized. All registered initializers can optionally return a Promise. All initializer functions that return Promises must be resolved before the application is bootstrapped. If one of the initializers fails to resolves, the application is not bootstrapped. 

###### Ways to add new providers

Generally add new provider looks like section below.

```typescript
{ 'token', 'option for getting DI instace' }
```

Examples:

```typescript
{ provide: TestAService, useClass: TestAService }, // This is simple way to declare Dependency throuth class.

// TestAService, Also you can use just class name. This is shortcut version

// { provide: TEST_SERVICE_ALIAS, useClass: TestService } This is not alias
{ provide: TEST_SERVICE_ALIAS, useExisting: TEST_SERVICE }, // TEST_SERVICE_ALIAS is alias TEST_SERVICE
{ provide: CONFIG_TOKEN, useValue: CONFIG }, // If you are need just value
{ provide: TEST_FACTORY_TOKEN, useFactory: factory }, // If use factory you can add some logic before obtain dependency instance
```

###### Example how to use Di in Controllers

```typescript
constructor(
    @Inject(TEST_FACTORY_TOKEN) private testAService: TestAService, // if you create own token
    // use just testAService: TestAService - is you use class and @Injectable decorator 
)
```

## Code scaffolding
