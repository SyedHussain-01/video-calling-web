import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "../context/SocketProvider";
import { useNavigate } from "react-router-dom";

export const Lobby = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");
  const socket = useSocket();
  const navigate = useNavigate();
  const onFormSubmit = useCallback(
    (e) => {
      e.preventDefault();
      socket.emit("room:join", { email, room });
    },
    [email, room, socket],
  );

  const handleJoinRoom = useCallback((data) => {
    const { email, room } = data;
    console.log(`data from BE: ${data} => ${email} ${room}`);
    navigate(`/room/${room}`);
  }, []);

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);

    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket]);

  return (
    <form onSubmit={onFormSubmit}>
      <label htmlFor="email">Email ID</label>
      <input
        type="email"
        placeholder="Enter Email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label htmlFor="room">Room Number</label>
      <input
        type="text"
        placeholder="Enter Room Number"
        id="room"
        onChange={(e) => setRoom(e.target.value)}
        value={room}
      />
      <button type="submit">Submit</button>
    </form>
  );
};
