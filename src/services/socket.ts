import { Socket, io } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(...params: Parameters<typeof io>) {
  if (!socket) {
    socket = io(params[0], params[1]);
    return socket;
  }

  return socket;
}

export function resetBoard(board = Array(9).fill(null)) {
  socket?.emit('reset:board', board);
}
