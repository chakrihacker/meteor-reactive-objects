ReactiveObjects
=======================

#### Add reactivity to your objects

In Meteor we have a lot of near magical tools that automatically update the DOM and rerun our functions. 
Some examples you may know are Meteor.Collections and Sessions variables.
Now you can easily get the same reactive goodness in your objects.

#### Technobabble
ReactiveObjects creates objects with clean reactive properties, via ECMA-262 [[get]] / [[set]] standards. 
ReactiveObjects sets up Deps dependancies inside the setProperty function. 
This means every time you update a reactive property in an object it will trigger a *invalidation*. 
This "automatically rerun[s] templates and other computations" (Meteor Docs) as well as Deps.autorun().

#### Install

###### This is an [Atmosphere](https://atmosphere.meteor.com/) compliant smart package for Meteorite (Meteor). 
Install with `mrt add reactive-objects`, this package is dependant only on core Meteor's Deps smart package.

## Simple Example
```js

var reactiveObject = {
  normalProp: 'someObjectProp',
  reativeProp: 'value'
}

ReactiveObjects.setProperties(reactiveObject, ['reativeProp', 'otherReativeProp'])

//Now for a look at the objects state!
reactiveObject.normalProp
  => 'someObjectProp' //not a reactive property but it was preserved. 
reactiveObject.reativeProp
  => 'value' //this is now a reactive property.
reactiveObject.otherReativeProp
  => undefined //this now exists as a reactive property.
```

## Don't fear the Deps
Ok, thats a lie, you should respect Deps because it is very powerful. 
Before you use this package you should have a good understanding of Deps. 
Read the docs at http://docs.meteor.com/#deps
##### Also checkout EventedMind's Deps videos by Chris Mather.
Introducing Deps https://www.eventedmind.com/feed/sEwntmxWtAvjEeSSf <br>
Build A Reactive Data Source https://www.eventedmind.com/feed/vhdWPskmLjNDoqjYd

## API

##### Terms & Concepts

* object: It can be {}, an object with existing properties, coffeescript class @, or even a collection transformation.
* property: a string representation of the property key, ex. `object[keyName]`
* Unless otherwise noted, the functions mutate the existing object rather then returning a new.

##### setProperty(object, property, mixin)
 - Adds a reactive property to the object and returns the object. 
 Don't worry about overriding existing properties, defaults are preserved.
  
- mixin is an optional object for advanced usage. See the below mixin section for details.

##### setProperties(object, [property], mixin)
  - Runs setProperty for each property in the property array. 
  The mixin is used for all the properties.
  
##### removeProperty(object, property)
  - Removes a reactive property form the object and returns the object. 
  The property is **converted** back to a standard property with the current value. 

  - Note: to completely remove a reactive property call this function and then run `delete object.property`  
  
##### removeObject(object)
  - Removes reactive properties form the object and returns the object. 
  The properties are **converted** back to standard properties with their current values. 

  - Note: to completely remove the object just call `delete object`  
  
##### isReactiveProperty(object, property)
  - Checks if the given property is reactive and returns boolean.
   
##### isReactiveObject(object)
  - Checks if the object has any reactive properties and returns boolean.

##### getObjectProperties(object)
  - Creates a *new* object with *only* the reactive properties. 
  Nether this object nor its properties are reactive. 
  Calling this function will not trigger any Deps calls.
  Useful if you need to work with the values in a non-reactive state.
  This lets packages like ReactiveSchema setup white-lists.

### Mixin
  You can use the mixin object to add functionality or change the default functionality of the setters and getters. 
  It is fully optional and expects a `set` or `get` property that contains a function. No return value is expected.

  ```javascript
  mixin = {}
  mixin.set: function (setter) {
    setter.value 
    //the value that would be set. You can change the value with getter.value = 'some other value'
    
    setter.stop 
    //default set to false. If you do not want a setter on the property set getter.stop = true

    //run any other code here without having to set up a new Deps.autorun
  } 
  mixin.get: function (getter) {
    getter.value
    //the value that would be returned. You can change the value with getter.value = 'some other value'
    //Note: that this will not change the stored value, only the value the getter returns.

    getter.stop 
    //default set to false. If you do not want a setter on the property set getter.stop = true

    //run any other code here without having to set up a new Deps.autorun
  } 
  
  //It is important to note there is currently a bug that prevents calling the getters and setter of other properties within mixins.
  ```
## Use Case?
### ReactiveSchema
This project is intended to be a dependency of [ReactiveSchema](https://github.com/CMToups/meteor-reactive-schema)

### Handlebars!

#### The most obvious usage is reactive templates

```html
<!-- Lets assume: Template.example.reactiveObject = reactiveObject -->
{{#with ReactiveObject}}
  {{normalProp}} <!-- someObjectProp -->
  {{reativeProp}} <!-- value -->
  {{otherReativeProp}} <!-- -->
{{/with}}

```
#### Lets change things up
```javascript
reactiveObject.normalProp = "not going to react"
reactiveObject.reativeProp = "Something Awesome!"
reactiveObject.otherReativeProp = 42
```
```html
{{#with ReactiveObject}}
  {{normalProp}} <!-- someObjectProp -->
  {{reativeProp}} <!-- Something Awesome! -->
  {{otherReativeProp}} <!-- 42 -->
{{/with}}
```

## Changed log
* 0.6.0 Breaking change for mixin api. Moved `this` context to be the first attribute.

## Full Spec 'N Test [![Build Status](https://travis-ci.org/Meteor-Reaction/meteor-reactive-objects.png)](https://travis-ci.org/CMToups/meteor-reactive-objects) 

To see the test run `mrt test-packages <path to package>`. 
These will always be updated before the readme so if something seems off, run the tests; I will try to keep the doc up-to-date.

*This package will not hit 1.0.0 until meteor is 1.0.0. No point in saying its stable when the Deps api may change.*
That said, the core api work is done. 
If you want a new feature or, if you want to change the names, please post an issue!
I would like to stabilize the api before 1.0.0. 
