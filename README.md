meteor-reactive-objects
=======================

Objects with clean reactive properties, via ECMA-262 property get/set standards.

Basically ReactiveObjects = Deps + ECMA-262 setProperty function



Simple Example (more to come)
```js

var reactiveObject = {
  normalProp: 'someObjectProp',
  reativeProp: 'boring value'
}

ReactiveObjects.setObject(reactiveObject, ['reativeProp', 'otherReativeProp'])



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
Now however, `reactiveObject.otherReativeProp = "Something Awesome!"` the template will just update!
