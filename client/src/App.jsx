import { useContext } from "react";
import AddBand from "./components/AddBand";
import BandList from "./components/BandList";
import BandChart from "./components/BandChart";
import { SocketContext } from "./context/SocketContext";

function App() {
  const { online } = useContext(SocketContext);

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success fw-bold ms-1">Online</span>
          ) : (
            <span className="text-danger fw-bold ms-1">Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col">
          <BandChart />
        </div>
      </div>

      <div className="row">
        <div className="col-8">
          <BandList />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default App;
