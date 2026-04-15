import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    player1Name: 'Illumineer One',
    player2Name: 'Illumineer Two',
    targetScore: 20,
    player1Score: 0,
    player2Score: 0,
    showCoinToss: false,
    coinFlipResult: null, // 'player1' | 'player2'
    isCoinFlipping: false,
    winner: null,
    logs: JSON.parse(localStorage.getItem('lorcana-match-logs') || '[]')
  }),
  actions: {
    incrementScore(player) {
      if (this.winner) return
      
      if (player === 1) {
        this.player1Score = Math.min(this.player1Score + 1, this.targetScore)
        if (this.player1Score >= this.targetScore) this.declareWinner(1)
      } else if (player === 2) {
        this.player2Score = Math.min(this.player2Score + 1, this.targetScore)
        if (this.player2Score >= this.targetScore) this.declareWinner(2)
      }
    },
    declareWinner(player) {
      this.winner = player === 1 ? this.player1Name : this.player2Name;
      this.logs.unshift({
        id: Date.now(),
        date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        winner: this.winner,
        p1Name: this.player1Name,
        p1Score: this.player1Score,
        p2Name: this.player2Name,
        p2Score: this.player2Score,
        target: this.targetScore
      });
      localStorage.setItem('lorcana-match-logs', JSON.stringify(this.logs));
    },
    decrementScore(player) {
      if (player === 1) this.player1Score = Math.max(this.player1Score - 1, 0)
      else if (player === 2) this.player2Score = Math.max(this.player2Score - 1, 0)
    },
    resetMatch() {
      this.player1Score = 0
      this.player2Score = 0
      this.winner = null
    },
    startMatch(p1Name, p2Name, target) {
      this.player1Name = p1Name || 'Illumineer One'
      this.player2Name = p2Name || 'Illumineer Two'
      this.targetScore = target
      this.resetMatch()
      this.coinFlipResult = null
    },
    async triggerCoinToss() {
      this.showCoinToss = true
      this.isCoinFlipping = true
      this.coinFlipResult = null
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      this.coinFlipResult = Math.random() > 0.5 ? 'player1' : 'player2'
      this.isCoinFlipping = false
    },
    deleteLog(id) {
      this.logs = this.logs.filter(log => log.id !== id);
      localStorage.setItem('lorcana-match-logs', JSON.stringify(this.logs));
    },
    closeCoinToss() {
      this.showCoinToss = false
    }
  }
})
