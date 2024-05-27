import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const AddBand = () => {
  const [inputValue, setInputValue] = useState("");
  const { socket } = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim().length > 0) {
      addBand(inputValue);
      setInputValue("");
    }
  };

  const addBand = (name) => {
    socket.emit("add-band", { name });
  };

  return (
    <>
      <h3>Add Band</h3>
      <form onSubmit={onSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="form-control"
          placeholder="New band name"
        />
      </form>
    </>
  );
};

export default AddBand;
