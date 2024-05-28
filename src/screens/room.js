import React, { useCallback, useState } from "react";
import { useEffect } from "react";
import { useSocket } from "../context/SocketProvider";
import ReactPlayer from "react-player";

export const Room = () => {
  const socket = useSocket();
  const [remoteSocketId, setRemoteSocketId] = useState(null);
  const [stream, setStream] = useState(null);

  const handleUserJoin = useCallback(({ email, id }) => {
    console.log(`room joined ${email}`);
    setRemoteSocketId(id);
  }, []);

  useEffect(() => {
    socket.on("user:joined", handleUserJoin);
    return () => {
      socket.off("user:joined", handleUserJoin);
    };
  }, [socket, handleUserJoin]);

  const handleCallClick = useCallback(async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setStream(stream);
  }, []);
  return (
    <div>
      <div>Room</div>
      <div>{remoteSocketId ? "Connected" : "No one in the room"}</div>
      {remoteSocketId && <button onClick={handleCallClick}>Call</button>}
      <div>
        <ReactPlayer playing muted height="100px" width="200px" url={stream} />
      </div>
    </div>
  );
};
