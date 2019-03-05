# Angular2 dependency injection

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

## Part 2

###### How to Angular is resolving dependencies. Example StaticInjector service. 
How to Angular is known about dependencies in services. Ingector service is using inside StaticInjector service for resolving dependencies.
```typescript
class C {

  name = 'C';

}

class B {
  name = 'B';

  constructor(c) {}
}

class A {

  name = 'A';

  constructor(b) {}
}

  const i = Injector.create([
      {provide: C, useClass: C, deps: []},
      {provide: B, useClass: B, deps: [C]},
      {provide: A, useClass: A, deps: [B]}
    ]);

    // A -> B -> C
```

###### Hierarchical Injectors

The Angular dependency injection system is hierarchical. There is a tree of injectors that parallels an app's component tree. You can get ViewContainerRef instance for to see that. 
ViewContainerRef contains inside injector method and parentInjector service. <br>
You can get any service instance from tree position. Using decorators like this.

```typescript
  constructor(
    @Inject(TEST_FACTORY_TOKEN) private testAService: TestAService,
    private vcRef: ViewContainerRef,

   @SkipSelf()
    private randomizeServices: RandomizeService,

   @Host()
   private randomizeServicesAlias: RandomizeService
    // private injector: Injector
  ) {
```

or create token alias:

```typescript
{ provide: RANDOMIZE_SERVICE_ALIAS, useExisting: forwardRef(() => RandomizeService) }
```

Also use forwardRef for solve cyclic dependencies.

###### Injectors assign to element not to component

See to example below:

```html
<app-test appTestDirective
          *ngIf="isHide"
></app-test>
```

appTestDirective and app-test compoent have common providers. That's why from directive you can get access to component providers.

###### Injector instance is living when still alive component

Injector instance is living when still alive component. If component was destroyed Injector instance and providers will be destroyed too. <br />

For Example use *ngIf construction as you can see below.

```html
<app-test appTestDirective
          *ngIf="isHide"
></app-test>
```
