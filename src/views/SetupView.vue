<template>
  <main class="setup-bg flex flex-col items-center px-6 py-12 relative h-full overflow-y-auto overscroll-none" style="-webkit-overflow-scrolling: touch;">
    <!-- Subtle gold corner ornaments -->
    <div class="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-lorcana-gold/30 rounded-tl-lg pointer-events-none"></div>
    <div class="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-lorcana-gold/30 rounded-tr-lg pointer-events-none"></div>
    <div class="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-lorcana-gold/30 rounded-bl-lg pointer-events-none"></div>
    <div class="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-lorcana-gold/30 rounded-br-lg pointer-events-none"></div>

    <div class="w-full max-w-sm space-y-8">
      <!-- Title -->
      <div class="text-center space-y-1">
        <h1 class="font-headline text-3xl font-bold text-lorcana-brown tracking-tight">Nuova Partita</h1>
        <p class="text-lorcana-brown-light/60 text-sm font-medium">Prepara la tua sfida</p>
      </div>

      <!-- Step 1: Player Names -->
      <div class="space-y-4" v-show="step === 1">
        <!-- Player 1 Input -->
        <div class="relative">
          <label class="text-xs font-bold uppercase tracking-widest text-lorcana-gold-dark mb-1.5 block">Giocatore 1</label>
          <input
            v-model="p1"
            type="text"
            list="saved-players"
            placeholder="Nome giocatore"
            class="w-full bg-white/60 border border-lorcana-gold/20 rounded-xl px-4 py-3.5 text-lorcana-brown placeholder:text-parchment-400 focus:outline-none focus:border-lorcana-gold/50 focus:bg-white/80 transition-all text-[16px]"
          />
        </div>

        <!-- Player 2 Input -->
        <div class="relative">
          <label class="text-xs font-bold uppercase tracking-widest text-lorcana-gold-dark mb-1.5 block">Giocatore 2</label>
          <input
            v-model="p2"
            type="text"
            list="saved-players"
            placeholder="Nome avversario"
            class="w-full bg-white/60 border border-lorcana-gold/20 rounded-xl px-4 py-3.5 text-lorcana-brown placeholder:text-parchment-400 focus:outline-none focus:border-lorcana-gold/50 focus:bg-white/80 transition-all text-[16px]"
          />
        </div>

        <datalist id="saved-players">
          <option v-for="name in store.savedPlayers" :key="name" :value="name"></option>
        </datalist>

        <!-- Save Players Checkbox -->
        <div class="flex items-center gap-2 mt-4 ml-1 mb-2">
          <input type="checkbox" id="savePlayers" v-model="savePlayers" class="accent-lorcana-gold-dark w-4 h-4 rounded border-lorcana-gold/30 cursor-pointer">
          <label for="savePlayers" class="text-sm font-medium text-lorcana-brown/80 cursor-pointer">Salva i nomi per le prossime partite</label>
        </div>

        <!-- Next Button -->
        <button
          @click="step = 2"
          class="w-full py-4 rounded-xl bg-gradient-to-r from-lorcana-gold-dark via-lorcana-gold to-lorcana-gold-dark text-white font-bold text-base tracking-wide shadow-lg shadow-lorcana-gold/20 active:scale-[0.98] transition-all mt-4"
        >
          Scegli Sfondo
        </button>
      </div>

      <!-- Step 2: Background Selection -->
      <div class="space-y-4" v-show="step === 2">
        <div class="flex items-center gap-2 mb-2">
          <button @click="step = 1" class="text-lorcana-gold-dark">
            <span class="material-symbols-outlined text-xl">arrow_back</span>
          </button>
          <span class="text-xs font-bold uppercase tracking-widest text-lorcana-gold-dark">Scegli lo sfondo</span>
        </div>

        <!-- Background options -->
        <div class="space-y-3">
          <div
            v-for="bg in backgrounds"
            :key="bg.id"
            @click="selectedBg = bg.id"
            class="bg-select-card"
            :class="{ selected: selectedBg === bg.id }"
          >
            <img :src="bg.src" :alt="bg.label" loading="lazy" />
            <div class="bg-select-label">{{ bg.label }}</div>
            <div class="bg-select-check">
              <span class="material-symbols-outlined text-white text-sm" style="font-variation-settings: 'FILL' 1;">check</span>
            </div>
          </div>
        </div>

        <!-- Start Match -->
        <button
          @click="startMatch"
          class="w-full py-4 rounded-xl bg-gradient-to-r from-lorcana-gold-dark via-lorcana-gold to-lorcana-gold-dark text-white font-bold text-base tracking-wide shadow-lg shadow-lorcana-gold/20 active:scale-[0.98] transition-all mt-4"
        >
          Inizia Partita
        </button>
      </div>

      <!-- Match History Link -->
      <button
        @click="router.push('/log')"
        class="w-full flex items-center justify-center gap-2 text-lorcana-gold-dark/60 text-sm font-medium py-2 active:opacity-70 transition-opacity"
      >
        <span class="material-symbols-outlined text-lg">auto_stories</span>
        Storico Partite
      </button>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const router = useRouter()
const store = useGameStore()

const step = ref(1)
const p1 = ref(store.player1Name === 'Giocatore 1' ? '' : store.player1Name)
const p2 = ref(store.player2Name === 'Giocatore 2' ? '' : store.player2Name)
const selectedBg = ref(store.selectedBackground)
const savePlayers = ref(true)

const backgrounds = [
  { id: 'parchment', label: 'Pergamena Classica', src: '/backgrounds/parchment.png' },
  { id: 'enchanted', label: 'Foresta Incantata', src: '/backgrounds/enchanted.png' },
  { id: 'cosmic', label: 'Galassia Cosmica', src: '/backgrounds/cosmic.png' },
]

const startMatch = () => {
  if (savePlayers.value) {
    store.savePlayerName(p1.value)
    store.savePlayerName(p2.value)
  }
  store.startMatch(p1.value, p2.value, selectedBg.value)
  router.push('/battle')
}
</script>
