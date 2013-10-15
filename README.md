meteor-reactive-objects
=======================

Objects with clean reactive properties, via ECMA-262 property get/set standards.

Basically ReactiveObjects = Deps + ECMA-262 setProperty function

# Travis-ci is currently not able to test with Meteor. To see the test run mrt test-packages <path to package>.
[![Build Status](https://travis-ci.org/CMToups/meteor-reactive-objects.png)](https://travis-ci.org/CMToups/meteor-reactive-objects)

There currently are many failing test as I have writen the full project spec in tinytest. 


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
