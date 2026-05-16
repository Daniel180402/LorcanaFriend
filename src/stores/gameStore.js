import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    player1Name: 'Giocatore 1',
    player2Name: 'Giocatore 2',
    baseTargetScore: 20,
    player1Score: 0,
    player2Score: 0,
    // Paperino Stregone Agitato: when a player plays this card,
    // the OPPONENT's target becomes 25 instead of 20
    paperinoActiveOnPlayer1: false, // Player 1 played it → Player 2's target becomes 25
    paperinoActiveOnPlayer2: false, // Player 2 played it → Player 1's target becomes 25
    selectedBackground: 'parchment', // 'parchment' | 'enchanted' | 'cosmic'
    showCoinToss: false,
    coinFlipResult: null, // 'player1' | 'player2'
    isCoinFlipping: false,
    winner: null,
    logs: JSON.parse(localStorage.getItem('lorcana-match-logs') || '[]'),
    savedPlayers: JSON.parse(localStorage.getItem('lorcana-saved-players') || '[]')
  }),
  getters: {
    // Player 1's target: if Player 2 played Paperino, Player 1 needs 25
    player1Target(state) {
      return state.paperinoActiveOnPlayer2 ? 25 : state.baseTargetScore
    },
    // Player 2's target: if Player 1 played Paperino, Player 2 needs 25
    player2Target(state) {
      return state.paperinoActiveOnPlayer1 ? 25 : state.baseTargetScore
    }
  },
  actions: {
    incrementScore(player) {
      if (this.winner) return
      
      if (player === 1) {
        this.player1Score++
        if (this.player1Score >= this.player1Target) this.declareWinner(1)
      } else if (player === 2) {
        this.player2Score++
        if (this.player2Score >= this.player2Target) this.declareWinner(2)
      }
    },
    declareWinner(player) {
      this.winner = player === 1 ? this.player1Name : this.player2Name
      this.logs.unshift({
        id: Date.now(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        winner: this.winner,
        p1Name: this.player1Name,
        p1Score: this.player1Score,
        p2Name: this.player2Name,
        p2Score: this.player2Score,
        p1Target: this.player1Target,
        p2Target: this.player2Target,
        background: this.selectedBackground
      })
      localStorage.setItem('lorcana-match-logs', JSON.stringify(this.logs))
    },
    decrementScore(player) {
      if (player === 1) this.player1Score = Math.max(this.player1Score - 1, 0)
      else if (player === 2) this.player2Score = Math.max(this.player2Score - 1, 0)
    },
    togglePaperino(player) {
      if (player === 1) {
        this.paperinoActiveOnPlayer1 = !this.paperinoActiveOnPlayer1
      } else {
        this.paperinoActiveOnPlayer2 = !this.paperinoActiveOnPlayer2
      }
    },
    resetMatch() {
      this.player1Score = 0
      this.player2Score = 0
      this.winner = null
      this.paperinoActiveOnPlayer1 = false
      this.paperinoActiveOnPlayer2 = false
    },
    startMatch(p1Name, p2Name, background) {
      this.player1Name = p1Name || 'Giocatore 1'
      this.player2Name = p2Name || 'Giocatore 2'
      this.selectedBackground = background || 'parchment'
      this.baseTargetScore = 20
      this.resetMatch()
      this.coinFlipResult = null
    },
    async triggerCoinToss() {
      this.showCoinToss = true
      this.isCoinFlipping = true
      this.coinFlipResult = null
      
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      this.coinFlipResult = Math.random() > 0.5 ? 'player1' : 'player2'
      this.isCoinFlipping = false
    },
    deleteLog(id) {
      this.logs = this.logs.filter(log => log.id !== id)
      localStorage.setItem('lorcana-match-logs', JSON.stringify(this.logs))
    },
    closeCoinToss() {
      this.showCoinToss = false
    },
    importLogs(newLogs) {
      if (Array.isArray(newLogs)) {
        const existingIds = new Set(this.logs.map(l => l.id))
        const toAdd = newLogs.filter(l => !existingIds.has(l.id))
        this.logs = [...toAdd, ...this.logs].sort((a, b) => b.id - a.id)
        localStorage.setItem('lorcana-match-logs', JSON.stringify(this.logs))
      }
    },
    savePlayerName(name) {
      if (!name || name.trim() === '') return
      const trimmed = name.trim()
      if (!this.savedPlayers.includes(trimmed)) {
        this.savedPlayers.push(trimmed)
        localStorage.setItem('lorcana-saved-players', JSON.stringify(this.savedPlayers))
      }
    }
  }
})
