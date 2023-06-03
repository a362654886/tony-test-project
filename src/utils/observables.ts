import { Observable, Subscriber, Subscription } from "rxjs";

//Observable
export const createObservable = (
  subscribeFunction: (subscriber: Subscriber<unknown>) => void
): Observable<unknown> => new Observable(subscribeFunction);

export const subscribeObservable = <T>(
  observable: Observable<T>,
  nextFn: (v: unknown) => void,
  completeFn?: () => void
) => {
  return observable.subscribe({
    complete: completeFn ? completeFn : () => console.log("done"),
    next: nextFn,
    error: (e) => console.log(e),
  });
};

export const cancelObservable = (subscription: Subscription) =>
  subscription.unsubscribe();
