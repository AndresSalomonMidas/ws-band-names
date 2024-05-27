import { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const BandList = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  const vote = (id) => {
    socket.emit("vote-band", id);
  };

  const deleteBand = (id) => {
    socket.emit("delete-band", id);
  };

  const changeName = (id, e) => {
    const newBands = bands.map((band) => {
      if (band.id === id) {
        band.name = e.target.value;
      }

      return band;
    });

    setBands(newBands);
  };

  // Call ws event on blur
  const onBlur = (id, newName) => {
    socket.emit("change-band-name", { id, name: newName });
  };

  const createRows = () =>
    bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => vote(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(e) => changeName(band.id, e)}
            onBlur={() => onBlur(band.id, band.name)}
          />
        </td>
        <td>
          <h4>{band.votes}</h4>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => deleteBand(band.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ));

  return (
    <table className="table table-stripped">
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Votes</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>{createRows()}</tbody>
    </table>
  );
};

export default BandList;
