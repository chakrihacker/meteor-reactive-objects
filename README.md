ReactiveObjects
=======================

#### Add reactivity to your objects

In Meteor we have a lot of near magical tools that automatically update the DOM and rerun our functions. 
Some examples you may know are Meteor.Collections and Sessions variables.
Now you can easily get the same reactive goodness in your objects.

#### Breaking Changes!!!
As of v0.7.0 the api has completely changed. To use the old api reference tag v0.6.0

#### Technobabble
ReactiveObjects creates objects with clean reactive properties, via ECMA-262 [[get]] / [[set]] standards. 
ReactiveObjects sets up Deps dependancies inside the setProperty function. 
This means every time you update a reactive property in an object it will trigger a *invalidation*. 
This "automatically rerun[s] templates and other computations" (Meteor Docs) as well as Deps.autorun().

#### Install

###### This is an [Atmosphere](https://atmosphere.meteor.com/) compliant smart package for Meteorite (Meteor). 
Install with `mrt add reactive-objects`, this package is dependent only on core Meteor's Deps smart package.

## Simple Example
```js
//create a model with default settings
var ReactiveObjects = Behave.create({ReactiveObject: {}}) 

//create an instance with a reactive property
reactiveObject = ReactiveObjects.new({'reactiveProp': 'foo'})
reactiveObject.reactiveProp
=> 'foo' //this is now a reactive property.

//Its still an normal object
reactiveObject.normalProp = 'some string'
=> 'some string' //not a reactive property

//You can always add more reactive properties
reactiveObject.ReactiveFunctions.addProperty('otherReactiveProp','bar')
=> 'bar' //this now exists as a reactive property.

## Don't fear the Deps
Ok, that's a lie, you should respect `Deps` because it is very powerful. 
Before you use this package you should have a good understanding of Deps. 
Read [the docs](http://docs.meteor.com/#deps) and check out EventedMind's Deps videos by Chris Mather:

* [Introducing Deps](https://www.eventedmind.com/feed/meteor-introducing-deps)
* [Build A Reactive Data Source](https://www.eventedmind.com/feed/meteor-build-a-simple-reactive-data-source)

## API

##### Terms & Concepts

* object: It can be {}, an object with existing properties, coffeescript class @, or even a collection transformation.
* property: a string representation of the property key, ex. `object[keyName]`
* Unless otherwise noted, the functions mutate the existing object rather then returning a new.

##### instance.addProperty(name, value)
 - Adds a reactive property to the object and returns the object. 
 Don't worry about overriding existing properties, defaults are preserved.
  
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


## Use Case?
### ReactiveSchema
This project is intended to be a dependency of [ReactiveSchema](https://github.com/CMToups/meteor-reactive-schema)

### Handlebars!

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

## Changed log
* 0.6.0 Breaking change for mixin api. Moved `this` context to be the first attribute.

## Full Spec 'N Test [![Build Status](https://travis-ci.org/Meteor-Reaction/meteor-reactive-objects.png)](https://travis-ci.org/Meteor-Reaction/meteor-reactive-objects) 

To see the test run `mrt test-packages <path to package>`. 
These will always be updated before the readme so if something seems off, run the tests; I will try to keep the doc up-to-date.

*This package will not hit 1.0.0 until meteor is 1.0.0. No point in saying its stable when the Deps api may change.*
That said, the core api work is done. 
If you want a new feature or, if you want to change the names, please post an issue!
I would like to stabilize the api before 1.0.0. 
