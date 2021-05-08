import React, {useEffect, useState} from "react";
import io from "socket.io-client";

const useSocket = ({accessToken}: {accessToken: string}) => {
    const [socket, setSocket] = useState<SocketIOClient.Socket>()

    useEffect(() => {
      const newSocket = io(
        process.env.REACT_APP_SERVER_URL!,
        { query: { accessToken: accessToken } }
      )                   
      setSocket(newSocket)
      console.log("socket connection established")
  
      return () => {newSocket.close()}
    }, [accessToken])

    useEffect(() => {
        if (!socket) return;
        socket.on("connect_error", (err: any) => {
            if (err.message === "unauthorized") {
                console.log("not authorized");
            }else {
                console.log(err);
            }
        })    

      }, [socket])

    return socket;
}

export default useSocket;