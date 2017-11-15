export default class Network {
  constructor() {
    this.socket = io()
    this.configuration = {
      iceServers: [{ urls: 'stun:stun.l.google.com:19302'}]
    }
    this.pc
    this.channel
    this.callReady = []
    this.callMessage = []
    this.initiator = null
    this.from
    this.to
    this.waitRTCConnection()
  }

  init(initiator, from, to) {
    if (this.pc) return

    this.initiator = initiator
    this.from = from
    this.to = to

    this.pc = new RTCPeerConnection(this.configuration)
    this.pc.onicecandidate = evt => this.socket.emit(
      'signaling',
      { candidate: evt.candidate, from: from, to: to }
    )

    this.pc.onnegotiationneeded = () => {
      this.pc.createOffer()
        .then(offer => this.pc.setLocalDescription(offer))
        .then(() => this.socket.emit(
          'signaling',
          { desc: this.pc.localDescription, from: from, to: to }
        ))
        .catch(err => console.error(err))
    }

    if (initiator) {
      this.channel = this.pc.createDataChannel("quantum")
      this.setup()
    } else {
      this.pc.ondatachannel = evt => {
        this.channel = evt.channel
        this.setup()
      }
    }
  }

  setup() {
    this.channel.onopen = () => this.callReady.forEach(f => f())
    this.channel.onmessage = evt => this.callMessage.forEach(
      f => f(JSON.parse(evt.data))
    )
  }

  onReady(fn) {
    this.callReady.push(fn)
  }

  onMessage(fn) {
    this.callMessage.push(fn)
  }

  send(msg) {
    this.channel.send(JSON.stringify(msg))
  }

  waitRTCConnection() {
    this.socket.on('signaling', msg => {
      if (!this.pc) this.init(false, msg.to, msg.from)

      if (msg.desc) {
        if (msg.desc.type == 'offer') {
          this.pc
            .setRemoteDescription(msg.desc)
            .then(() => this.pc.createAnswer())
            .then(answer => this.pc.setLocalDescription(answer))
            .then(() => this.socket.emit(
              'signaling',
              { desc: this.pc.localDescription, from: msg.to, to: msg.from }
            ))
            .catch(() => console.error(err))
        } else
          this.pc.setRemoteDescription(msg.desc).catch(err => console.error(err))
      } else if (msg.candidate)
        this.pc.addIceCandidate(msg.candidate).catch(err => console.error(err))
      else
        console.error("Unsupported message: ", msg)
    })
  }

  getLocation() {
    return new Promise((resolve, reject) => {
      let handleData = (data) => {
        this.socket.off('location', handleData)
        resolve(data)
      }
      this.socket.on('location', handleData)
      this.socket.emit('location', {})
    })
  }
}
