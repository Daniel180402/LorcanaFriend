<template>
  <Teleport to="body">
    <Transition name="victory-modal">
      <div v-if="store.winner" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm">
        <div class="relative w-full max-w-xs mx-6 bg-gradient-to-b from-parchment-100 to-parchment-200 rounded-2xl overflow-hidden shadow-2xl animate-bounce-in">
          <!-- Gold top accent -->
          <div class="h-1 w-full bg-gradient-to-r from-transparent via-lorcana-gold to-transparent"></div>

          <div class="p-8 flex flex-col items-center text-center">
            <!-- Trophy -->
            <div class="w-20 h-20 rounded-full bg-gradient-to-br from-lorcana-gold-light to-lorcana-gold-dark p-[3px] shadow-lg mb-5 animate-pulse-gold">
              <div class="w-full h-full rounded-full bg-parchment-100 flex items-center justify-center">
                <span class="material-symbols-outlined text-4xl text-lorcana-gold" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
              </div>
            </div>

            <h2 class="font-headline text-3xl font-bold text-lorcana-brown mb-1 tracking-tight">Vittoria!</h2>
            <p class="text-sm text-lorcana-brown-light/70 mb-6">
              <span class="font-bold text-lorcana-brown">{{ store.winner }}</span> ha raggiunto
              <span class="font-bold text-lorcana-gold-dark">{{ winnerTarget }}</span> Lore
            </p>

            <!-- Score summary -->
            <div class="w-full flex items-center justify-between bg-lorcana-brown/5 rounded-xl p-4 mb-6 border border-lorcana-gold/10">
              <div class="text-center flex-1">
                <span class="block text-[10px] uppercase tracking-widest text-lorcana-brown/40 mb-1 truncate max-w-[80px] mx-auto">{{ store.player1Name }}</span>
                <span class="font-headline text-2xl font-bold" :class="store.winner === store.player1Name ? 'text-lorcana-gold-dark' : 'text-lorcana-brown/30'">{{ store.player1Score }}</span>
              </div>
              <div class="text-xs text-lorcana-brown/20 font-bold uppercase tracking-widest px-3">vs</div>
              <div class="text-center flex-1">
                <span class="block text-[10px] uppercase tracking-widest text-lorcana-brown/40 mb-1 truncate max-w-[80px] mx-auto">{{ store.player2Name }}</span>
                <span class="font-headline text-2xl font-bold" :class="store.winner === store.player2Name ? 'text-lorcana-gold-dark' : 'text-lorcana-brown/30'">{{ store.player2Score }}</span>
              </div>
            </div>

            <!-- Actions -->
            <div class="w-full space-y-2.5">
              <button
                @click="playAgain"
                class="w-full py-3.5 rounded-xl bg-gradient-to-r from-lorcana-gold-dark via-lorcana-gold to-lorcana-gold-dark text-white font-bold text-sm tracking-widest uppercase active:scale-[0.98] transition-all"
              >
                Gioca Ancora
              </button>
              <button
                @click="goToMenu"
                class="w-full py-3 rounded-xl bg-transparent border border-lorcana-gold/20 text-lorcana-gold-dark font-bold text-sm tracking-widest uppercase active:scale-[0.98] transition-all"
              >
                Menu Principale
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'

const store = useGameStore()
const router = useRouter()

const winnerTarget = computed(() => {
  if (store.winner === store.player1Name) return store.player1Target
  return store.player2Target
})

const playAgain = () => {
  store.resetMatch()
}

const goToMenu = () => {
  store.winner = null
  router.push('/')
}
</script>

<style scoped>
.victory-modal-enter-active { animation: fade-in 0.25s ease-out; }
.victory-modal-leave-active { animation: fade-in 0.2s ease-out reverse; }

.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes bounce-in {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
</style>
