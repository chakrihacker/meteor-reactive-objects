ReactiveObjects
=======================

Objects with clean reactive properties, via ECMA-262 [[get]] / [[set]] standards. 
ReactiveObjects sets up Deps dependancies inside the setProperty function. 
This means everytime you update a property in a reactive object it will triger a *invalidation*. 
This "automatically rerun templates and other computations" (Meteor Docs) as well as Deps.autorun().

# Don't fear the Deps
Ok, thats a lie, you should respect Deps because it is very powerful. 
Before you use this package you should have a good understanding of Deps. 
Read the docs at http://docs.meteor.com/#deps
##### Also checkout EventedMind's Deps videos by Chris Mather.
Introducing Deps https://www.eventedmind.com/feed/sEwntmxWtAvjEeSSf <br>
Build A Reactive Data Source https://www.eventedmind.com/feed/vhdWPskmLjNDoqjYd

# Full Spec 'N Test
Travis-ci is currently not able to test Meteor but here is the anyway (it returns passing falsely) [![Build Status](https://travis-ci.org/CMToups/meteor-reactive-objects.png)](https://travis-ci.org/CMToups/meteor-reactive-objects) 

To see the test run `mrt test-packages \<path to package\>`. 
These will always be updated before the readme so if something seems off do check; I will try to keep the doc up-to-date.
There currently are a few failing test as I have writen the full 1.0.0 spec in tinytest. 

*This package will not hit 1.0.0 until meteor is 1.0.0. No point in saying its stable when the Deps api may change.*

Simple Example (more to come)
```js

var reactiveObject = {
  normalProp: 'someObjectProp',
  reativeProp: 'boring value'
}

ReactiveObjects.setProperties(reactiveObject, ['reativeProp', 'otherReativeProp'])



```


Object State
```js
reactiveObject.normalProp
  => 'someObjectProp'
reactiveObject.reativeProp
  => 'boring value' //but its reactive
reactiveObject.otherReativeProp
  => undefined //but its also reative

```

With `Template.example.reactiveObject = reactiveObject`
```html

{{#with ReactiveObject}}
  {{normalProp}}
  {{reativeProp}}
  {{otherReativeProp}}
{{/with}}

```

If you do `reactiveObject.normalProp = "not going to react"` the template will not update, this is normal.
Now however, `reactiveObject.reativeProp = "Something Awesome!"` the template will just update!
