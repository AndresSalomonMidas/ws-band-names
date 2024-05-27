import { useContext, useEffect, useState } from "react";
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";
import { SocketContext } from "../context/SocketContext";

const BandChart = () => {
  const [bands, setBands] = useState([]);
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });

    return () => socket.off("current-bands");
  }, [socket]);

  return (
    <BarChart width={730} height={250} data={bands}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="votes" fill="#8884d8" />
    </BarChart>
  );
};

export default BandChart;
