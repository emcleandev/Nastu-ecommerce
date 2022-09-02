import { Rings } from "react-loader-spinner";

const Loader = () => (
  <div className="flex items-center justify-center w-full my-4">
    <Rings height="100" width="100" color="grey" ariaLabel="loading" />
  </div>
);

export default Loader;
