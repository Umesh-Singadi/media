import classNames from "classnames";

function Skeleton({ times, children }) {
  const outerClassName = classNames("h-2 mb-5");
  const boxes = Array(times)
    .fill(0)
    .map((item, i) => {
      return (
        <div key={i} className={outerClassName}>
          <div>{children}</div>
        </div>
      );
    });
  return boxes;
}

export default Skeleton;
