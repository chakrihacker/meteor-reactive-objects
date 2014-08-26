ReactiveObjects
=======================

#### Add reactivity to your objects

In Meteor we have a lot of near magical tools that automatically update the DOM and rerun our functions. 
Some examples you may know are Meteor.Collections and Sessions variables.
Now you can easily get the same reactive goodness in your objects.

#### Breaking Changes!!!
As of v0.7.1 the api has completely changed. To use the old api reference tag v0.6.0

#### Technobabble
ReactiveObjects creates objects with clean reactive properties, via ECMA-262 [[get]] / [[set]] standards. 
ReactiveObjects sets up Deps dependancies inside the setProperty function. 
This means every time you update a reactive property in an object it will trigger a *invalidation*. 
This "automatically rerun[s] templates and other computations" (Meteor Docs) as well as Deps.autorun().
This package now uses proxies that can wrap object mutation functions. 
For example `Array.push()` will can Deps `changed()`

#### Behave behavior

This package is a [Behave](https://atmospherejs.com/package/behave) `behavior`!
This package exports both `Behave` and `ReactiveObjects`.
Use `Behave` to create new reactive objects.
`ReactiveObject` provides helper functions.

## Simple Example
```js
//create a module scope
var myReactiveObjects = Behave.extend() //not required but recommended.

//create an instance with a reactive property
reactiveObjectInstance = myReactiveObjects({ReactiveObject:{'reactiveProp': 'foo'}})
reactiveObjectInstance.reactiveProp
=> 'foo' //this is now a reactive property.

//Its still an normal object
reactiveObjectInstance.normalProp = 'some string'
=> 'some string' //not a reactive property

//You can always add more reactive properties
reactiveObjectInstance.ReactiveFunctions.addProperty('otherReactiveProp','bar')
=> 'bar' //this now exists as a reactive property.
```
## Don't fear the Deps
Ok, that's a lie, you should respect `Deps` because it is very powerful. 
Before you use this package you should have a good understanding of Deps. 
Read [the docs](http://docs.meteor.com/#deps) and check out EventedMind's Deps videos by Chris Mather:

* [Introducing Deps](https://www.eventedmind.com/feed/meteor-introducing-deps)
* [Build A Reactive Data Source](https://www.eventedmind.com/feed/meteor-build-a-simple-reactive-data-source)

## API

##### Terms & Concepts
* instance: Is the result of `Behave({ReactiveObject:{}})` or `myModule({ReactiveObject:{}})`.
  
##### model.removeProperty(object, property)
  - Removes a reactive property form the object and returns the object. 
  The property is **converted** back to a standard property with the current value. 

  - Note: to completely remove a reactive property call this function and then run `delete object.property`  
  
##### model.removeObject(object)
  - Removes reactive properties form the object and returns the object. 
  The properties are **converted** back to standard properties with their current values. 

  - Note: to completely remove the object just call `delete object`  
  
##### model.isReactiveProperty(object, property)
  - Checks if the given property is reactive and returns boolean.
   
##### model.isReactiveObject(object)
  - Checks if the object has any reactive properties and returns boolean.
   
##### instance.ReactiveFunctions.addProperty(name, value)
 - Adds a reactive property to the object and returns the object. 
 Don't worry about overriding existing properties, defaults are preserved.

##### instance.ReactiveSettings
 This object holds all of your objects reactive properties state data. It contains myProperty `value`, `type`, `deps`
 - `value` is the un-mutated value of the property. If you need to work with the value of the properly in a non-reactive way use this via `instance.ReactiveSettings.myProperty.value`
 - `type` is what proxy will be used to interface with the property
 - `deps` is the deps handle for the property.

## Proxies
  ReactiveObjects does its best not to mutate any values you pass into it. Unfortunately their is no universal way to observe objects changes without overriding its prototype or using wrappers. Proxies are wrappers around existing objects like arrays. To create you own proxies see Behave model settings.   
 - `default` Any genaric property that calls deps `changed()` on `set` and deps `depend()` on `get`
 - `array` An array proxy that wraps array functions with deps calls.
 
## Behave model settings
  ```js 
    Behave.create({ReactiveObject: {
      dynamicProxies: true //default
      proxies: {}
    }}) 
  ```
 - `dynamicProxies` is a boolean that enables type detection. Currently this just checks to see if the value you added is an array or not. If it is an array it sets `instance.ReactiveSettings.myArray.type = 'array'`. This property will now call on the array proxy. If you want manually control property proxy type then set this to false.
 - `proxies` This should any proxies you wish to add. See `lib/proxies.js` for examples
 
## Use Case?

#### The most obvious usage is reactive templates

```html
<!-- Lets assume: Template.example.reactiveObject = reactiveObject -->
{{#with ReactiveObject}}
  {{normalProp}} <!-- someObjectProp -->
  {{reactiveProp}} <!-- value -->
  {{otherReactiveProp}} <!-- -->
{{/with}}

```
#### Lets change things up
```javascript
reactiveObject.normalProp = "not going to react"
reactiveObject.reactiveProp = "Something Awesome!"
reactiveObject.otherReactiveProp = 42
```
```html
{{#with ReactiveObject}}
  {{normalProp}} <!-- someObjectProp -->
  {{reactiveProp}} <!-- Something Awesome! -->
  {{otherReactiveProp}} <!-- 42 -->
{{/with}}
```

## Full Spec 'N Test [![Build Status](https://travis-ci.org/Meteor-Reaction/meteor-reactive-objects.png)](https://travis-ci.org/Meteor-Reaction/meteor-reactive-objects) 

To see the test run `meteor test-packages <path to package>`. 
These will always be updated before the readme so if something seems off, run the tests; I will try to keep the doc up-to-date.

*This package will not hit 1.0.0 until meteor is 1.0.0. No point in saying its stable when the Deps api may change.*
That said, the core api work is done. 
If you want a new feature or, if you want to change the names, please post an issue!
I would like to stabilize the api before 1.0.0. 
