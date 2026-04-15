<template>
  <div v-if="store.showCoinToss" class="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md">
    <div class="relative w-full max-w-sm mx-4 bg-surface-container-high rounded-xl magical-glow gold-border overflow-hidden shadow-2xl transition-all duration-300 transform scale-100">
      
      <!-- Modal Header Decor -->
      <div class="h-1 w-full bg-gradient-to-r from-secondary-fixed-dim via-secondary to-secondary-fixed-dim"></div>
      
      <div class="p-8 flex flex-col items-center text-center relative z-10">
        <!-- Close Button -->
        <button @click="store.closeCoinToss" class="absolute top-4 right-4 text-on-surface-variant hover:text-secondary group transition-colors">
            <span class="material-symbols-outlined group-hover:rotate-90 transition-transform duration-300">close</span>
        </button>

        <h2 class="font-headline text-3xl text-on-surface mb-2 tracking-tight">Fate's Decree</h2>
        <p class="font-label text-sm text-slate-400 mb-10 tracking-wide uppercase">THE STARS WILL DECIDE WHO STARTS</p>
        
        <!-- The Ornate Coin -->
        <div class="relative group cursor-pointer mb-12">
            <!-- Orbiting particles (glow effect) -->
            <div class="absolute -inset-8 bg-tertiary/5 rounded-full blur-2xl group-hover:bg-tertiary/10 transition-all duration-700" :class="{'animate-pulse bg-tertiary/20': store.isCoinFlipping}"></div>
            
            <!-- Coin Body -->
            <div class="relative w-48 h-48 rounded-full bg-gradient-to-br from-secondary-fixed to-on-secondary-container p-1 shadow-[0px_0px_50px_rgba(233,195,73,0.3)] transition-transform duration-1000" :class="{'animate-spin duration-700': store.isCoinFlipping}">
              <div class="w-full h-full rounded-full bg-surface-container-highest flex items-center justify-center relative overflow-hidden">
                <!-- Ink Texture Overlay -->
                <div class="absolute inset-0 ink-shimmer-bg opacity-50"></div>
                
                <!-- Active Side shown -->
                <div class="relative z-10 flex flex-col items-center">
                  <span v-if="!store.coinFlipResult || store.coinFlipResult === 'player1'" class="material-symbols-outlined text-7xl text-secondary" style="font-variation-settings: 'FILL' 1;">{{ store.coinFlipResult ? 'wb_sunny' : 'help_center' }}</span>
                  <span v-if="store.coinFlipResult === 'player2'" class="material-symbols-outlined text-7xl text-tertiary" style="font-variation-settings: 'FILL' 1;">dark_mode</span>
                  <div v-if="store.coinFlipResult" class="mt-2 w-16 h-[2px] rounded-full" :class="store.coinFlipResult === 'player1' ? 'bg-secondary/30' : 'bg-tertiary/30'"></div>
                </div>
              </div>
              
              <!-- Coin Bezel/Rim Textures -->
              <div class="absolute inset-0 rounded-full border-[6px] border-secondary/20 pointer-events-none"></div>
              <div class="absolute inset-2 rounded-full border border-secondary/10 pointer-events-none"></div>
            </div>
        </div>

        <!-- Flip Result Info -->
        <div class="mb-10 space-y-4 flex flex-col items-center justify-center min-h-[80px]">
            <div v-if="!store.coinFlipResult" class="bg-surface-container-lowest px-6 py-2 rounded-full border border-secondary/10 inline-block">
              <span class="text-secondary font-bold tracking-widest text-xs uppercase">{{ store.isCoinFlipping ? 'Flipping...' : 'Decision Pending' }}</span>
            </div>
            
            <div v-if="store.coinFlipResult" class="px-6 py-3 rounded-xl border gold-border inline-block min-w-48 transition-all animate-bounce">
              <span class="text-xs uppercase tracking-widest font-bold opacity-60 mb-1 block">Winner</span>
              <span :class="store.coinFlipResult === 'player1' ? 'text-secondary' : 'text-tertiary'" class="font-headline text-2xl drop-shadow-md">
                {{ store.coinFlipResult === 'player1' ? store.player1Name : store.player2Name }}
              </span>
            </div>
        </div>

        <!-- Action Button -->
        <button @click="store.triggerCoinToss" :disabled="store.isCoinFlipping" class="w-full group relative overflow-hidden bg-gradient-to-br from-secondary to-on-secondary-container py-4 rounded-lg shadow-lg hover:shadow-secondary/20 transition-all duration-500 scale-95 active:scale-100 disabled:opacity-50 disabled:grayscale">
            <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span class="font-label font-extrabold text-on-secondary tracking-[0.2em] uppercase flex items-center justify-center gap-2">
                <span class="material-symbols-outlined text-lg">cached</span>
                {{ store.coinFlipResult ? 'Flip Again' : 'Flip Coin' }}
            </span>
        </button>
      </div>
      
      <!-- Particle effect anchors -->
      <div class="absolute top-0 right-0 p-4 opacity-20 pointer-events-none text-tertiary">
        <span class="material-symbols-outlined">auto_awesome</span>
      </div>
      <div class="absolute bottom-0 left-0 p-4 opacity-20 pointer-events-none text-secondary">
        <span class="material-symbols-outlined">flare</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
const store = useGameStore()
</script>
