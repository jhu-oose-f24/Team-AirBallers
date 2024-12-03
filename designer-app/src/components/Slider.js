import css from "@/styles/Slider.module.css";
import clsx from "clsx";
import { useEffect, useState } from "react";

/**
 * @param {{
 *   value: number;
 *   min: number;
 *   max: number;
 * }} props
 */
const Slider = (props) => {
  const { value, min, max } = props;

  const [majorTicks, setMajorTicks] = useState(1);
  const [minorTicks, setMinorTicks] = useState(1);
  /** @type {UseState<HTMLElement>} */
  const [track, setTrack] = useState(null);
  /** @type {UseState<ResizeObserver>} */
  const [trackObserver, setTrackObserver] = useState(null);
  const [tickMarks, setTickMarks] = useState([]);

  useEffect(() => {
    if (!track) return;

    if (trackObserver) {
      trackObserver?.disconnect();
    }

    const observer = new ResizeObserver(calcTickMarks);
    observer.observe(track);
    setTrackObserver(observer);
  }, [track]);

  useEffect(() => {
    console.log({ major: 2 ** majorTicks, minor: minorTicks });
    const tickMarks = [];
    const majorFrac = 2 ** majorTicks;
    const numUnits = max - min;

    for (let major = 0; major <= numUnits; major += 1 / majorFrac) {
      if (Math.floor(major) === major) {
        tickMarks.push(<MajorTick key={major} content={`${min + major}`} />);

        if (major === numUnits) break;

        for (let minor = 0; minor < minorTicks; minor++) {
          tickMarks.push(<MinorTick key={`${major}-${minor}`} />);
        }
      }
    }
    setTickMarks(tickMarks);
  }, [majorTicks, minorTicks]);

  /** @type {ResizeObserverCallback} */
  function calcTickMarks([track]) {
    const pad = parseFloat(getComputedStyle(track?.target).paddingInline);
    const unit = (track.contentRect.width - 2 * pad) / (1 + max - min);

    if (unit <= 8) {
      setMajorTicks(-2);
      setMinorTicks(Math.floor(unit / 2) - 1);
    } else if (unit <= 18) {
      setMajorTicks(-1);
      console.log(Math.floor(unit / 4) - 1);
      setMinorTicks(Math.floor(unit / 4) - 1);
    } else {
      setMajorTicks(0);
      setMinorTicks(Math.floor(unit / 8) - 1);
    }

    // console.log(unit);
  }

  const MajorTick = ({ content }) => (
    <span className={clsx(css["tick-mark"], css.major)} content={content} />
  );
  const MinorTick = () => (
    <span className={clsx(css["tick-mark"], css.minor)} />
  );

  return (
    <div className={css.slider}>
      <div className={css.track} ref={setTrack}>
        {tickMarks}
      </div>
    </div>
  );
};

export default Slider;
