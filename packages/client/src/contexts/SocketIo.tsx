// import React, { useContext, useEffect, useState } from 'react'
// import io from 'socket.io-client'

// const SocketContext = React.createContext<SocketIOClient.Socket | undefined>(undefined)

// export function useSocket() {
//   return useContext(SocketContext)
// }

// export function SocketProvider(
//     { socket, children }: {socket: SocketIOClient.Socket, children: React.ReactChildren}
// ) {

//   useEffect(() => {
//     const newSocket = io(
//       process.env.REACT_APP_SERVER_URL!,
//       { query: { accessToken } }
//     )                   
//     setSocket(newSocket)
//     console.log("socket connection established")

//     return () => {newSocket.close()}
//   }, [accessToken])


//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   )
// }

export {};