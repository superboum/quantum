const socket = io()
//socket.emit('signaling', { hello: "world"})

let pc
let configuration = {}

function start(isCaller) {
  pc = new RTCPeerConnection(configuration)
  pc.onicecandidate = (evt) => {
    socket.emit('signaling', { candidate: evt.candidate })
  };

}
