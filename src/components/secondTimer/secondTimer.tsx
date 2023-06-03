import { FC, useEffect, useState } from "react";
import { Subscription } from "rxjs";
import {
  cancelObservable,
  createObservable,
  subscribeObservable,
} from "../../utils/observables";
import { getTimeDiff } from "../../utils/timeFunctions";

export interface SecondTimeComponentProps {
  countState: boolean;
}

const SecondTimeComponent: FC<SecondTimeComponentProps> = (props) => {
  //Observable
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [countTime, setCountTime] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());

  useEffect(() => {
    if (props.countState) {
      setStartTime(new Date());
      setCountTime(new Date());
      subscribe();
    } else {
      unsubscribe();
    }
  }, [props.countState]);

  /*
    create an Observable and run next function per second
    define a subscribe function and the run subscribeObservable.
    the observable and subscribe function will be subscribeObservable's parameters
  */
  const subscribe = () => {
    const observable = createObservable((subscriber) => {
      setInterval(() => {
        subscriber.next(new Date());
      }, 1000);
    });

    const _subscription = subscribeObservable(observable, (v) =>
      setCountTime(v as Date)
    );
    setSubscription(_subscription);
  };

  // cancel ths subscribe
  const unsubscribe = () => {
    if (subscription) {
      cancelObservable(subscription);
    }
  };

  return (
    <>
      <p data-testid="SecondTimerText">
        Second Timer:
        {Math.floor(getTimeDiff(countTime, startTime, 1000)).toFixed(2)}
      </p>
    </>
  );
};
export default SecondTimeComponent;
