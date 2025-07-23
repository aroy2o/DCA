// Cricket Sound Effects Manager
export class CricketSounds {
  constructor() {
    this.audioContext = null
    this.sounds = new Map()
    this.isMuted = false
    this.volume = 0.3
    
    this.initAudioContext()
    this.createSyntheticSounds()
  }

  initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
    }
  }

  createSyntheticSounds() {
    if (!this.audioContext) return

    // Create synthetic cricket sounds using Web Audio API
    this.sounds.set('bat-hit', () => this.createBatHitSound())
    this.sounds.set('ball-bounce', () => this.createBallBounceSound())
    this.sounds.set('wicket-fall', () => this.createWicketSound())
    this.sounds.set('crowd-cheer', () => this.createCrowdCheerSound())
    this.sounds.set('boundary', () => this.createBoundarySound())
    this.sounds.set('six-hit', () => this.createSixHitSound())
  }

  createBatHitSound() {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    // Sharp crack sound
    oscillator.type = 'square'
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.1)

    filter.type = 'highpass'
    filter.frequency.value = 300

    gainNode.gain.setValueAtTime(this.volume, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.15)

    oscillator.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + 0.15)
  }

  createBallBounceSound() {
    if (!this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(150, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(80, this.audioContext.currentTime + 0.1)

    gainNode.gain.setValueAtTime(this.volume * 0.5, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  createWicketSound() {
    if (!this.audioContext) return

    // Create multiple oscillators for complex wicket sound
    const oscillators = []
    const gainNodes = []

    for (let i = 0; i < 3; i++) {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()
      
      osc.type = 'square'
      osc.frequency.setValueAtTime(400 + i * 200, this.audioContext.currentTime)
      osc.frequency.exponentialRampToValueAtTime(100 + i * 50, this.audioContext.currentTime + 0.3)
      
      gain.gain.setValueAtTime(this.volume * 0.3, this.audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)
      
      osc.connect(gain)
      gain.connect(this.audioContext.destination)
      
      oscillators.push(osc)
      gainNodes.push(gain)
    }

    oscillators.forEach(osc => {
      osc.start()
      osc.stop(this.audioContext.currentTime + 0.3)
    })
  }

  createCrowdCheerSound() {
    if (!this.audioContext) return

    // Create noise for crowd simulation
    const bufferSize = this.audioContext.sampleRate * 0.5
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate)
    const data = buffer.getChannelData(0)

    // Generate pink noise (crowd-like)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.pow(Math.random(), 2)
    }

    const noise = this.audioContext.createBufferSource()
    const filter = this.audioContext.createBiquadFilter()
    const gainNode = this.audioContext.createGain()

    noise.buffer = buffer
    filter.type = 'bandpass'
    filter.frequency.value = 1000
    filter.Q.value = 5

    gainNode.gain.setValueAtTime(this.volume * 0.4, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8)

    noise.connect(filter)
    filter.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    noise.start()
    noise.stop(this.audioContext.currentTime + 0.8)
  }

  createBoundarySound() {
    if (!this.audioContext) return

    // Celebratory sound for boundary
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.type = 'sawtooth'
    oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime)
    oscillator.frequency.linearRampToValueAtTime(880, this.audioContext.currentTime + 0.2)
    oscillator.frequency.linearRampToValueAtTime(440, this.audioContext.currentTime + 0.4)

    gainNode.gain.setValueAtTime(0, this.audioContext.currentTime)
    gainNode.gain.linearRampToValueAtTime(this.volume * 0.6, this.audioContext.currentTime + 0.1)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5)

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.start()
    oscillator.stop(this.audioContext.currentTime + 0.5)
  }

  createSixHitSound() {
    if (!this.audioContext) return

    // Epic sound for six
    const frequencies = [220, 330, 440, 660]

    frequencies.forEach((freq, index) => {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()

      osc.type = 'triangle'
      osc.frequency.setValueAtTime(freq, this.audioContext.currentTime)
      osc.frequency.linearRampToValueAtTime(freq * 2, this.audioContext.currentTime + 0.3)

      gain.gain.setValueAtTime(0, this.audioContext.currentTime + index * 0.1)
      gain.gain.linearRampToValueAtTime(this.volume * 0.3, this.audioContext.currentTime + index * 0.1 + 0.1)
      gain.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8)

      osc.connect(gain)
      gain.connect(this.audioContext.destination)

      osc.start(this.audioContext.currentTime + index * 0.1)
      osc.stop(this.audioContext.currentTime + 0.8)
    })
  }

  playSound(soundName) {
    if (this.isMuted || !this.sounds.has(soundName)) return

    try {
      // Resume audio context if suspended (browser policy)
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume()
      }

      const soundGenerator = this.sounds.get(soundName)
      soundGenerator()
    } catch (error) {
      console.warn('Error playing sound:', error)
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume))
  }

  toggleMute() {
    this.isMuted = !this.isMuted
    return this.isMuted
  }

  // Convenience methods for specific cricket events
  batHit() { this.playSound('bat-hit') }
  ballBounce() { this.playSound('ball-bounce') }
  wicketFall() { this.playSound('wicket-fall') }
  crowdCheer() { this.playSound('crowd-cheer') }
  boundary() { this.playSound('boundary') }
  sixHit() { this.playSound('six-hit') }
}

// Create global instance
export const cricketSounds = new CricketSounds()

// Auto-enable audio on first user interaction
let audioEnabled = false
const enableAudio = () => {
  if (!audioEnabled && cricketSounds.audioContext) {
    cricketSounds.audioContext.resume()
    audioEnabled = true
    
    // Remove listeners after first interaction
    document.removeEventListener('click', enableAudio)
    document.removeEventListener('keydown', enableAudio)
    document.removeEventListener('touchstart', enableAudio)
  }
}

// Add event listeners for audio enablement
document.addEventListener('click', enableAudio)
document.addEventListener('keydown', enableAudio)
document.addEventListener('touchstart', enableAudio)
