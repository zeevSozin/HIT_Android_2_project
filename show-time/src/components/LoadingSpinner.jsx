import { PulseLoader } from "react-spinners";

function LoadingSpinner({ isLoading }) {
  return (
    <PulseLoader
      color="#ffeb3b"
      loading={isLoading}
      margin={8}
      size={20}
      speedMultiplier={0.5}
      cssOverride={{
        position: "fixed",
        top: "50%",
        left: "50%",
        backgroundColor: "#121212",
      }}
    />
  );
}

export default LoadingSpinner;
