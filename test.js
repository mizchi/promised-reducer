import PromiseQueueFolder from "./index";
const {ok, equal} = require("assert");

// helper
function wait(ms = 100) {return new Promise(done => setTimeout(done, ms));}

(async () => {
  var app = new PromiseQueueFolder({count: 0}, [])
  // case 1
  app.update(s => ({count: 1}));
  ok(!app.updating);
  console.log("pass case 1");

  // case 2
  const p1 = app.update(async (s) => {
    await wait(100);
    return {count: 2}
  });

  await p1;
  console.log("pass case 2");

  // case 3
  const p2 = app.update(async (s) => {
    await wait(100);
    return {count: 3}
  });

  const p3 = app.update(async (s) => {
    await wait(100);
    return {count: 4}
  });
  ok(app._updatingQueue.length === 1);
  ok(p2 === p3);
  await p2;

  // case 4
  const p4 = app.update(async (s) => {
    await wait(100);
    return {count: 3}
  });

  const p5 = app.update(async (s) => {
    await wait(100);
    return {count: 4}
  });
  ok(app._updatingQueue.length === 1);
  const p6 = app.update(async (s) => {
    await wait(100);
    return {count: 2}
  });
  ok(p4 === p5);
  ok(p5 === p6);

  ok(app._updatingQueue.length === 2);
  await p6;
  console.log("pass case 4");

  // finish
  console.log("all test passed");
})().catch(e => {
  console.log("catched", e)
  throw e;
});
