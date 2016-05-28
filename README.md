# PromisedReducer

Fold promise queue and tell detect sync or async

```
npm install promised-reducer
```

## Example

```js
import PromisedReducer from "promised-reducer";

const reducer = new PromisedReducer({count: 0});

reducer.on(":process-updating", () => {
  // called by each queue
});

reducer.on(":process-async-updating", () => {
  // called by each async queue (including synced update)
});

reducer.on(":start-async-updating", () => {
  // called once on start async
});

reducer.on(":end-anync-updating", () => {
  // called once on end async
});

reducer.on(":update", state => {
  // emit on non-promise update or end-async-update
  console.log(state):
});

queue.update(({count}) => ({count: count + 1}))
// => logging {count: 1}
queue.update(({count}) => Promise.resolve({count: count + 1}))
queue.update(({count}) => Promise.resolve({count: count + 1}))
// => logging {count: 3} not 2: queuing promises are reduced to one result.
```

## Middlewares

Middleware function type is `<T>(t: T | Promise<T>) => T | Promise<T>`;
Handle Promise.resolve if you need to consider promise by upper middleware chain.

```js
const logger = (state_or_promise) => {
  return Promise.resolve(state_or_promise)
  .then(state => {
    console.log("log:", state);
    return state;
  })
}

const reducer = new PromisedReducer({count: 0}, [logger]);
```

## With Rx

PromisedReducer extends EventEmitter. Handle it as EventEmitter.

```js
const reducer = new PromisedReducer({count: 0});
const updateStream: Rx.Observable<{count: number;}> = Rx.Observable.formEvent(reducer, ":update")
```

## LICENSE

MIT
