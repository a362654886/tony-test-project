import { FC, useEffect, useState } from "react";
import { Subscription, interval } from "rxjs";

interface SecondTimeComponentProps {
  countState: boolean;
  sendNewItemOfFiveTimes: (time: string) => void;
}

const MillionSecondTimer: FC<SecondTimeComponentProps> = (props) => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (props.countState) {
      setTime(0);
      setRunning(true);
    } else {
      setRunning(false);
    }
  }, [props.countState]);

  useEffect(() => {
    let subscription: Subscription | null = null;

    if (running) {
      /*
       if running is true, time will be recorded per 10 million second 
       */
      subscription = interval(10).subscribe(() => {
        setTime((prevTime) => prevTime + 1);
      });
    }

    return () => {
      /*
       if running is changed then return function to cancel this subscribe
       */
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [running]);

  /*
    if time can be divisible by 5 then send this time to father's component
  */
  useEffect(() => {
    if (parseFloat(getTime(time)) % 5 === 0 && time > 0) {
      props.sendNewItemOfFiveTimes(getTime(time));
    }
  }, [time]);

  const getTime = (time: number) => (time * 0.01).toFixed(2);

  return (
    <>
      <p data-testid="MillionSecondTimerText">
        Million Second Timer: {getTime(time)}
      </p>
    </>
  );
};
export default MillionSecondTimer;
