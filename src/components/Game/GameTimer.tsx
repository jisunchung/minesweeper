import useTimer from "@/hooks/useTimer";

export default function GameTimer() {
  const time = useTimer();

  return <div className="font-bold">{time}</div>;
}
