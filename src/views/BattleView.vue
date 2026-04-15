<template>
  <main class="flex-grow flex flex-col md:flex-row relative">
    <!-- Player 2 (Top/Opponent) Area - Rotated for 1v1 Table Use -->
    <section class="flex-1 flex flex-col items-center justify-center relative bg-surface-container-low border-b border-secondary/10 md:rotate-0 rotate-180">
      <div class="absolute inset-0 magical-shimmer pointer-events-none"></div>
      
      <!-- Opponent Info -->
      <div class="absolute top-8 flex flex-col items-center">
        <span class="text-secondary font-headline italic text-lg tracking-widest">{{ store.player2Name }}</span>
        <div class="w-24 h-1 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
          <div class="h-full bg-tertiary ink-glow transition-all duration-500" :style="`width: ${p2Percent}%`"></div>
        </div>
      </div>
      
      <!-- Lore Counter -->
      <div class="flex items-center justify-center gap-6 md:gap-12 z-10">
        <button @click="store.decrementScore(2)" class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary-fixed-dim hover:bg-surface-variant transition-all active:scale-90 border border-secondary/20 uppercase">
          <span class="material-symbols-outlined text-4xl">remove</span>
        </button>
        <div class="text-center w-32">
          <span class="font-headline text-8xl md:text-9xl text-secondary font-bold tracking-tighter drop-shadow-lg">{{ String(store.player2Score).padStart(2, '0') }}</span>
          <div class="text-on-surface-variant font-label text-[10px] md:text-xs tracking-[0.2em] mt-2 uppercase">Lore Collected</div>
        </div>
        <button @click="store.incrementScore(2)" class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary text-on-secondary flex items-center justify-center hover:opacity-90 transition-all active:scale-90 shadow-xl shadow-secondary/10 uppercase">
          <span class="material-symbols-outlined text-4xl">add</span>
        </button>
      </div>

      <!-- Progress Track (Decorative/Contextual) -->
      <div class="absolute bottom-4 left-6 right-6 flex items-center gap-4">
        <span class="text-[10px] font-label text-on-surface-variant">0</span>
        <div class="flex-1 h-1.5 bg-surface-container-lowest rounded-full p-[2px]">
          <div class="h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(233,195,73,0.3)] transition-all duration-500" :style="`width: ${p2Percent}%`"></div>
        </div>
        <span class="text-[10px] font-label text-secondary">{{ store.targetScore }}</span>
      </div>
    </section>

    <!-- Center Utility Bar (Coin Flip / Tools) -->
    <div class="h-16 md:h-full md:w-24 bg-surface-container-highest flex md:flex-col items-center justify-center gap-6 z-20 shadow-2xl relative border-y md:border-x border-secondary/20">
      <div class="absolute inset-0 bg-secondary/5 pointer-events-none"></div>
      
      <!-- Coin Flip Button -->
      <button @click="store.triggerCoinToss" class="group flex flex-col items-center gap-1 transition-transform duration-500 hover:scale-110">
        <div class="w-12 h-12 rounded-full border-2 border-secondary bg-surface-container-lowest flex items-center justify-center shadow-[0_0_15px_rgba(233,195,73,0.2)]">
          <span class="material-symbols-outlined text-secondary">monetization_on</span>
        </div>
        <span class="text-[10px] font-label text-secondary uppercase tracking-tighter">Flip</span>
      </button>

      <div class="w-px h-8 md:w-8 md:h-px bg-outline-variant/30"></div>
      
      <!-- Reset/Refresh -->
      <button @click="store.resetMatch" class="group flex flex-col items-center gap-1 transition-transform duration-500 hover:scale-110">
        <div class="w-12 h-12 rounded-full border border-outline-variant/30 bg-surface-container-lowest flex items-center justify-center">
          <span class="material-symbols-outlined text-on-surface-variant">restart_alt</span>
        </div>
        <span class="text-[10px] font-label text-on-surface-variant uppercase tracking-tighter">Reset</span>
      </button>
    </div>

    <!-- Player 1 (Bottom/Self) Area -->
    <section class="flex-1 flex flex-col items-center justify-center relative bg-surface">
      <div class="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <img class="w-full h-full object-cover grayscale opacity-20" alt="faint abstract smoke and ink swirling patterns on a deep dark navy background with subtle celestial sparkles" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQKDmKFRdmd7IccRQJYPF-vRcU4v8cgPT9ZSlGDDdgGDwgx8PJLFhYUtZOPn9f8Dtg2JmbznycjLdY6GAVJ6D0PLvz-nM9VVm_sbvxRVWlqRfG_fNmR-nQKbK7SlppbK2zrv4-rdHBFMC0ZiqO43m0Yq3_YQuDrwWHTrD3rnyDn-Ts1mwI4K1sy8ptARnZY8zLx3yjERIgmZN3baeavn0hUb-MTxZlww_Evjb5WoEr8Kb8qhDBynwhjvfatrn5I0yLNUq-k8Ap8HQ-"/>
      </div>
      
      <!-- Player Info -->
      <div class="absolute top-8 flex flex-col items-center">
        <span class="text-secondary font-headline italic text-lg tracking-widest">{{ store.player1Name }}</span>
        <div class="w-24 h-1 bg-surface-container-highest rounded-full mt-2 overflow-hidden">
          <div class="h-full bg-tertiary ink-glow transition-all duration-500" :style="`width: ${p1Percent}%`"></div>
        </div>
      </div>

      <!-- Lore Counter -->
      <div class="flex items-center justify-center gap-6 md:gap-12 z-10">
        <button @click="store.decrementScore(1)" class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-surface-container-highest flex items-center justify-center text-secondary-fixed-dim hover:bg-surface-variant transition-all active:scale-90 border border-secondary/20 uppercase">
          <span class="material-symbols-outlined text-4xl">remove</span>
        </button>
        <div class="text-center w-32">
          <span class="font-headline text-8xl md:text-9xl text-secondary font-bold tracking-tighter drop-shadow-lg">{{ String(store.player1Score).padStart(2, '0') }}</span>
          <div class="text-on-surface-variant font-label text-[10px] md:text-xs tracking-[0.2em] mt-2 uppercase">Lore Collected</div>
        </div>
        <button @click="store.incrementScore(1)" class="w-16 h-16 md:w-20 md:h-20 rounded-full bg-secondary text-on-secondary flex items-center justify-center hover:opacity-90 transition-all active:scale-90 shadow-xl shadow-secondary/10 uppercase">
          <span class="material-symbols-outlined text-4xl">add</span>
        </button>
      </div>

      <!-- Progress Track -->
      <div class="absolute bottom-[80px] left-6 right-6 flex items-center gap-4">
        <span class="text-[10px] font-label text-on-surface-variant">0</span>
        <div class="flex-1 h-1.5 bg-surface-container-lowest rounded-full p-[2px]">
          <div class="h-full bg-secondary rounded-full shadow-[0_0_10px_rgba(233,195,73,0.3)] transition-all duration-500" :style="`width: ${p1Percent}%`"></div>
        </div>
        <span class="text-[10px] font-label text-secondary">{{ store.targetScore }}</span>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from '@/stores/gameStore'

const store = useGameStore()

const p1Percent = computed(() => {
  return Math.min((store.player1Score / store.targetScore) * 100, 100)
})
const p2Percent = computed(() => {
  return Math.min((store.player2Score / store.targetScore) * 100, 100)
})
</script>
