<template>
  <div v-if="store.winner" class="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md">
    <div class="relative w-full max-w-sm mx-4 bg-surface-container-highest rounded-xl magical-glow gold-border overflow-hidden shadow-2xl p-8 flex flex-col items-center text-center animate-bounce-in">
      
      <!-- Modal Header Decor -->
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary-fixed-dim via-secondary to-secondary-fixed-dim"></div>
      
      <!-- Star/Trophy Icon -->
      <div class="w-24 h-24 rounded-full bg-gradient-to-br from-secondary-fixed to-on-secondary-container p-1 shadow-[0px_0px_50px_rgba(233,195,73,0.3)] mb-6 animate-pulse">
        <div class="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center">
            <span class="material-symbols-outlined text-5xl text-secondary" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
        </div>
      </div>

      <h2 class="font-headline text-4xl text-secondary mb-2 tracking-tight">Victory!</h2>
      <p class="font-label text-lg text-on-surface mb-8">
        <span class="font-bold">{{ store.winner }}</span> has reached {{ store.targetScore }} Lore.
      </p>

      <div class="w-full space-y-3">
        <button @click="playAgain" class="w-full bg-gradient-to-br from-secondary to-on-secondary-container py-3 rounded-lg text-on-secondary font-bold tracking-widest uppercase hover:opacity-90 active:scale-95 transition-all shadow-lg border border-secondary/20">
          Play Again
        </button>
        <button @click="goToMenu" class="w-full bg-surface-container-low py-3 rounded-lg text-secondary font-bold tracking-widest uppercase hover:bg-surface-variant active:scale-95 transition-all border border-secondary/20">
          Main Menu
        </button>
      </div>
    </div>
    
    <!-- Confetti effects -->
    <div class="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent"></div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import { useRouter } from 'vue-router'

const store = useGameStore()
const router = useRouter()

const playAgain = () => {
  store.resetMatch()
}

const goToMenu = () => {
  store.winner = null
  router.push('/')
}
</script>
<style scoped>
@keyframes bounce-in {
  0% { transform: scale(0.8); opacity: 0; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-bounce-in {
  animation: bounce-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>
