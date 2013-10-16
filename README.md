ReactiveObjects
=======================

Objects with clean reactive properties, via ECMA-262 [[get]] / [[set]] standards. 
ReactiveObjects sets up Deps dependancies inside the setProperty function. 
This means every time you update a reactive property in an object it will trigger a *invalidation*. 
This "automatically rerun[s] templates and other computations" (Meteor Docs) as well as Deps.autorun().

## Don't fear the Deps
Ok, thats a lie, you should respect Deps because it is very powerful. 
Before you use this package you should have a good understanding of Deps. 
Read the docs at http://docs.meteor.com/#deps
##### Also checkout EventedMind's Deps videos by Chris Mather.
Introducing Deps https://www.eventedmind.com/feed/sEwntmxWtAvjEeSSf <br>
Build A Reactive Data Source https://www.eventedmind.com/feed/vhdWPskmLjNDoqjYd

## Full Spec 'N Test
Travis-ci is currently not able to test Meteor but here is the anyway (it returns passing falsely) [![Build Status](https://travis-ci.org/CMToups/meteor-reactive-objects.png)](https://travis-ci.org/CMToups/meteor-reactive-objects) 

To see the test run `mrt test-packages <path to package>`. 
These will always be updated before the readme so if something seems off, run the tests; I will try to keep the doc up-to-date.

*This package will not hit 1.0.0 until meteor is 1.0.0. No point in saying its stable when the Deps api may change.*
That said, the core api work is done. 
If you want a new feature or, if you want to change the names, please post an issue!
I would like to stabilize the api before 1.0.0. 

## API

##### setProperty(object, string)

##### setProperties(object, [string])

##### removeProperty(object, string)

##### removeObject(object)

##### isReactiveProperty(object, string)

##### isReactiveObject(object)

##### getReactiveProperties(object)

## Simple Example
```js

// Use any object. 
//It can be {}, 
//  an object with existing properties, 
//  inside a coffeescript class, 
//  or even a collection transformation.
var reactiveObject = {
  normalProp: 'someObjectProp',
  reativeProp: 'value'
}


// Just drop it in the first  argument and give your list of wanted reactive properties.
// Don't worry about overriding existing properties. Defaults are preserved.
ReactiveObjects.setProperties(reactiveObject, ['reativeProp', 'otherReativeProp'])

//Now for a look at the objects state!
reactiveObject.normalProp
  => 'someObjectProp' //not a reactive property but it was preserved. 
reactiveObject.reativeProp
  => 'value' //this is now a reactive property! Sit back and let it do your work for you.
reactiveObject.otherReativeProp
  => undefined //Oh, this now exits as a reactive property even though it did not have a value, sweet!
```

## Use Case?

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
