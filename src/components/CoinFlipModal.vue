<template>
  <Teleport to="body">
    <Transition name="coin-modal">
      <div v-if="store.showCoinToss" class="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" @click.self="store.closeCoinToss">
        <div class="relative w-full max-w-xs mx-6 bg-gradient-to-b from-parchment-100 to-parchment-200 rounded-2xl overflow-hidden shadow-2xl animate-scale-in">
          <!-- Gold top accent -->
          <div class="h-1 w-full bg-gradient-to-r from-transparent via-lorcana-gold to-transparent"></div>

          <div class="p-8 flex flex-col items-center text-center">
            <!-- Close -->
            <button @click="store.closeCoinToss" class="absolute top-4 right-4 text-lorcana-brown/40 active:text-lorcana-brown transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>

            <h2 class="font-headline text-2xl font-bold text-lorcana-brown mb-1 tracking-tight">Lancia Moneta</h2>
            <p class="text-xs text-lorcana-brown-light/50 uppercase tracking-widest mb-8">Chi inizia?</p>

            <!-- Coin -->
            <div class="relative mb-8">
              <div class="absolute -inset-6 bg-lorcana-gold/10 rounded-full blur-2xl" :class="{ 'animate-pulse': store.isCoinFlipping }"></div>
              <div
                class="relative w-32 h-32 rounded-full bg-gradient-to-br from-lorcana-gold-light to-lorcana-gold-dark p-[3px] shadow-lg transition-all duration-500"
                :class="{ 'animate-spin': store.isCoinFlipping }"
              >
                <div class="w-full h-full rounded-full bg-parchment-100 flex items-center justify-center">
                  <span v-if="!store.coinFlipResult" class="material-symbols-outlined text-5xl text-lorcana-gold" style="font-variation-settings: 'FILL' 1;">help_center</span>
                  <span v-else-if="store.coinFlipResult === 'player1'" class="material-symbols-outlined text-5xl text-lorcana-gold" style="font-variation-settings: 'FILL' 1;">wb_sunny</span>
                  <span v-else class="material-symbols-outlined text-5xl text-lorcana-gold-dark" style="font-variation-settings: 'FILL' 1;">dark_mode</span>
                </div>
              </div>
            </div>

            <!-- Result -->
            <div class="min-h-[60px] flex items-center justify-center mb-6">
              <div v-if="!store.coinFlipResult" class="px-4 py-1.5 rounded-full bg-lorcana-brown/5 border border-lorcana-gold/15">
                <span class="text-lorcana-gold-dark font-bold tracking-widest text-xs uppercase">
                  {{ store.isCoinFlipping ? 'Lancio...' : 'Pronto' }}
                </span>
              </div>
              <div v-else class="text-center animate-bounce-in">
                <span class="text-[10px] uppercase tracking-widest text-lorcana-brown/40 block mb-1">Inizia</span>
                <span class="font-headline text-xl font-bold text-lorcana-brown">
                  {{ store.coinFlipResult === 'player1' ? store.player1Name : store.player2Name }}
                </span>
              </div>
            </div>

            <!-- Flip Button -->
            <button
              @click="store.triggerCoinToss"
              :disabled="store.isCoinFlipping"
              class="w-full py-3.5 rounded-xl bg-gradient-to-r from-lorcana-gold-dark via-lorcana-gold to-lorcana-gold-dark text-white font-bold text-sm tracking-widest uppercase active:scale-[0.98] transition-all disabled:opacity-40 disabled:grayscale"
            >
              {{ store.coinFlipResult ? 'Rilancia' : 'Lancia' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
const store = useGameStore()
</script>

<style scoped>
.coin-modal-enter-active { animation: fade-in 0.25s ease-out; }
.coin-modal-leave-active { animation: fade-in 0.2s ease-out reverse; }

.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.animate-bounce-in {
  animation: bounce-in 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
@keyframes bounce-in {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
</style>
