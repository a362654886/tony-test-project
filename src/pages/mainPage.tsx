import { FC, useEffect, useState } from "react";
import { StyledMainPage } from "./style";
import { Button } from "antd";
import SecondTimeComponent from "../components/secondTimer/secondTimer";
import MillionSecondTimer from "../components/millionSecondTimer/millionSecondTimer";
import { fromEvent, switchMap, takeUntil, timer } from "rxjs";

const MainPage: FC = () => {
  /*
  countState state used to decide if SecondTime running 
   */
  const [countState, setCountState] = useState<boolean>(false);

  /*
  fiveTimesLogs state record time when time can be divisible by 5
   */
  const [fiveTimesLogs, setFiveTimesLogs] = useState<
    {
      time: string;
      dateTime: Date;
    }[]
  >([]);

  useEffect(() => {
    if (countState) {
      setFiveTimesLogs([]);
      listenLongPress();
    }
  }, [countState]);

  /*
  listen if the Button with "endButton" id pressed more than 2 seconds
   */
  const listenLongPress = () => {
    const button = document.getElementById("endButton");
    if (button) {
      const buttonLongPress = fromEvent(button, "mousedown");
      buttonLongPress
        .pipe(
          switchMap(() =>
            /*
           if the button mouseup or mouseleave then stop count the second
            */
            timer(2000).pipe(
              takeUntil(fromEvent(button, "mouseup")),
              takeUntil(fromEvent(button, "mouseleave"))
            )
          )
        )
        .subscribe(() => {
          setCountState(false);
        });
    }
  };

  //update the log records
  const resetFiveTimesLog = (time: string) => {
    const newLog = {
      time: time,
      dateTime: new Date(),
    };
    const newArr = [...fiveTimesLogs, newLog];
    setFiveTimesLogs(newArr);
  };

  return (
    <StyledMainPage>
      <SecondTimeComponent countState={countState} />
      <MillionSecondTimer
        countState={countState}
        sendNewItemOfFiveTimes={(time) => resetFiveTimesLog(time)}
      />
      <Button id={"endButton"} onMouseDown={() => setCountState(true)}>
        {countState ? "End" : "Start"}
      </Button>
      <>
        {fiveTimesLogs.map((log, index) => (
          <>
            <p key={index}>{log.time}</p>
            <p key={index}>{log.dateTime.toLocaleString()}</p>
          </>
        ))}
      </>
    </StyledMainPage>
  );
};
export default MainPage;
