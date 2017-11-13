const socket = io()
//socket.emit('signaling', { hello: "world"})

let pc
const configuration = {"iceServers": [{"urls": "stun:stun.l.google.com:19302"}]}
const localVideo = document.getElementById("localVideo")


// NOTE: Les standards évoluent très vites
// Le guide HTML5Rock n'est absolument plus à jour
// https://www.html5rocks.com/fr/tutorials/webrtc/basics/
//
// Le draft W3C est à jour par contre : https://www.w3.org/TR/webrtc/#simple-peer-to-peer-example

function start() {
  pc = new RTCPeerConnection(configuration)

  pc.onicecandidate = (evt) => {
    socket.emit('signaling', { candidate: evt.candidate })
  };

  pc.ontrack = evt => {
    console.log("onaddstream", evt.streams)
  }

  pc.onnegotiationneeded = () => {
    pc
      .createOffer()
      .then(offer => pc.setLocalDescription(offer))
      .then(() => socket.emit('signaling', { desc: pc.localDescription }))
      .catch(err => console.log(err))
  }

  navigator
    .mediaDevices
    .getUserMedia({audio: true, video: true})
    .then(stream => {
      localVideo.srcObject = stream
      pc.addTrack(stream.getAudioTracks()[0], stream)
      pc.addTrack(stream.getVideoTracks()[0], stream)
    })
    .catch(err => console.log(err))
}

socket.on('signaling', (from,msg) => {
  if (!pc) start()

  console.log(msg)

  if (msg.candidate) {
    pc
      .addIceCandidate(msg.candidate)
      .catch(err => console.log(err))
  } else if (msg.desc) {
    if (msg.desc.type == "offer") {
      pc
        .setRemoteDescription(msg.desc)
        .then(() => pc.createAnswer())
        .then(answer => pc.setLocalDescription(answer))
        .then(() => socket.emit('signaling', { desc: pc.localDescription }))
        .catch(() => console.log(err))
    } else if (msg.desc.type == "answer") {
      pc
        .setRemoteDescription(msg.desc)
        .catch(() => console.log(err))
    } else {
      console.log("Unsupported SDP type.")
    }
  } else {
    console.log("Unknown message.")
  }
})
