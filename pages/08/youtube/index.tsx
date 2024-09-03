import ReactPlayer from "react-player";

export default function Youtube() {
  return (
    <ReactPlayer
      url="https://www.youtube.com/watch?v=Z3W0jKcv1SU"
      width={800}
      height={600}
      playing={true}
      muted={true}
    />
  );
}
