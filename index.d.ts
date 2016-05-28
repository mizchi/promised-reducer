import * as React from "react";

export default class PromisedReducer<State> {
  constructor(initialState: State, middlewares: Function[]);
  state: State;
  on: (eventName: string, fn: Function) => void;
  update(updater: (s?: State) => State | Promise<State>): Promise<any>;
  subscribe(): void;
}
