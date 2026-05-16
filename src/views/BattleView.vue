<template>
  <main
    class="fixed inset-0 flex flex-col overflow-hidden overscroll-none"
    style="touch-action: manipulation;"
    :style="{ backgroundImage: `url(${bgSrc})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <!-- Background overlay for readability -->
    <div class="absolute inset-0 pointer-events-none" :class="bgOverlay"></div>

    <!-- Top-right action buttons -->
    <div class="top-actions">
      <button class="top-action-btn" @click="store.triggerCoinToss" title="Lancia Moneta">
        <span class="material-symbols-outlined text-lg">monetization_on</span>
      </button>
      <button class="top-action-btn" @click="router.push('/log')" title="Storico">
        <span class="material-symbols-outlined text-lg">auto_stories</span>
      </button>
    </div>

    <!-- ===== PLAYER 2 (Top Half — Rotated 180°) ===== -->
    <section class="flex-1 flex flex-col items-center justify-center relative rotate-180">
      <!-- Player Name -->
      <div class="mb-4 text-center">
        <span class="font-headline font-bold text-lg tracking-[0.15em] uppercase" :style="{ color: nameColor }">
          {{ store.player2Name }}
        </span>
      </div>

      <!-- Score area with +/- and diamond counter -->
      <div class="flex items-center justify-center gap-5">
        <!-- Minus -->
        <button class="score-btn" @click="store.decrementScore(2)" :style="btnStyle">
          <span class="material-symbols-outlined">remove</span>
        </button>

        <!-- Lore step indicator -->
        <span class="lore-step" :style="{ color: stepColor }">{{ store.player2Score > 0 ? store.player2Score : '' }}</span>

        <!-- Diamond Counter -->
        <div class="diamond-counter" :style="diamondBorder">
          <div class="diamond-counter-inner" :style="diamondInner">
            <div class="diamond-counter-content">
              <span class="font-headline font-bold text-5xl leading-none" :style="{ color: scoreColor }">
                {{ store.player2Score }}
              </span>
            </div>
          </div>
        </div>

        <!-- Lore step indicator -->
        <span class="lore-step" :style="{ color: stepColor }">{{ store.player2Target > store.player2Score ? '' : '' }}</span>

        <!-- Plus -->
        <button class="score-btn" @click="store.incrementScore(2)" :style="btnStyle">
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>

      <!-- Target indicator if Paperino is active -->
      <div v-if="store.paperinoActiveOnPlayer1" class="mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
           style="background: rgba(197,165,90,0.15); color: #c5a55a; border: 1px solid rgba(197,165,90,0.3);">
        Obiettivo: {{ store.player2Target }}
      </div>
    </section>

    <!-- ===== ORNATE DIVIDER ===== -->
    <div class="ornate-divider py-1 z-10 relative">
      <div class="ornate-divider-diamond"></div>
    </div>

    <!-- ===== PLAYER 1 (Bottom Half) ===== -->
    <section class="flex-1 flex flex-col items-center justify-center relative">
      <!-- Score area with +/- and diamond counter -->
      <div class="flex items-center justify-center gap-5">
        <!-- Minus -->
        <button class="score-btn" @click="store.decrementScore(1)" :style="btnStyle">
          <span class="material-symbols-outlined">remove</span>
        </button>

        <!-- Lore step indicator -->
        <span class="lore-step" :style="{ color: stepColor }">{{ store.player1Score > 0 ? store.player1Score : '' }}</span>

        <!-- Diamond Counter -->
        <div class="diamond-counter" :style="diamondBorder">
          <div class="diamond-counter-inner" :style="diamondInner">
            <div class="diamond-counter-content">
              <span class="font-headline font-bold text-5xl leading-none" :style="{ color: scoreColor }">
                {{ store.player1Score }}
              </span>
            </div>
          </div>
        </div>

        <!-- Lore step indicator -->
        <span class="lore-step" :style="{ color: stepColor }">{{ '' }}</span>

        <!-- Plus -->
        <button class="score-btn" @click="store.incrementScore(1)" :style="btnStyle">
          <span class="material-symbols-outlined">add</span>
        </button>
      </div>

      <!-- Player Name -->
      <div class="mt-4 text-center">
        <span class="font-headline font-bold text-lg tracking-[0.15em] uppercase" :style="{ color: nameColor }">
          {{ store.player1Name }}
        </span>
      </div>

      <!-- Target indicator if Paperino is active -->
      <div v-if="store.paperinoActiveOnPlayer2" class="mt-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
           style="background: rgba(197,165,90,0.15); color: #c5a55a; border: 1px solid rgba(197,165,90,0.3);">
        Obiettivo: {{ store.player1Target }}
      </div>
    </section>

    <!-- ===== MENU TRIGGER ===== -->
    <div class="menu-trigger" @click="showMenu = true" v-show="!showMenu">
      <span class="material-symbols-outlined text-xl menu-trigger-chevron">expand_less</span>
      <span class="menu-trigger-text font-label">Menù</span>
    </div>

    <!-- ===== SLIDE-UP MENU ===== -->
    <Teleport to="body">
      <Transition name="menu-backdrop">
        <div v-if="showMenu" class="menu-backdrop" @click="showMenu = false"></div>
      </Transition>
      <Transition name="menu-panel">
        <div v-if="showMenu" class="menu-panel">
          <div class="menu-handle"></div>

          <!-- Coin Toss -->
          <div class="menu-item" @click="doCoinToss">
            <div class="menu-item-icon">
              <span class="material-symbols-outlined text-lg">monetization_on</span>
            </div>
            <div>
              <div class="menu-item-text">Lancia Moneta</div>
              <div class="menu-item-sub">Chi inizia per primo?</div>
            </div>
          </div>

          <!-- Reset Match -->
          <div class="menu-item" @click="doReset">
            <div class="menu-item-icon">
              <span class="material-symbols-outlined text-lg">restart_alt</span>
            </div>
            <div>
              <div class="menu-item-text">Resetta Partita</div>
              <div class="menu-item-sub">Azzera i punteggi</div>
            </div>
          </div>

          <div class="menu-separator"></div>

          <!-- Paperino Stregone Agitato — Player 1 -->
          <div class="menu-item" @click="store.togglePaperino(1)">
            <div class="menu-item-icon">
              <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">auto_fix_high</span>
            </div>
            <div class="flex-1">
              <div class="menu-item-text">{{ store.player1Name }}</div>
              <div class="menu-item-sub">Paperino Stregone Agitato</div>
            </div>
            <div class="toggle-switch" :class="{ active: store.paperinoActiveOnPlayer1 }"></div>
          </div>

          <!-- Paperino Stregone Agitato — Player 2 -->
          <div class="menu-item" @click="store.togglePaperino(2)">
            <div class="menu-item-icon">
              <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">auto_fix_high</span>
            </div>
            <div class="flex-1">
              <div class="menu-item-text">{{ store.player2Name }}</div>
              <div class="menu-item-sub">Paperino Stregone Agitato</div>
            </div>
            <div class="toggle-switch" :class="{ active: store.paperinoActiveOnPlayer2 }"></div>
          </div>

          <div class="menu-separator"></div>

          <!-- Back to Setup -->
          <div class="menu-item" @click="goToSetup">
            <div class="menu-item-icon">
              <span class="material-symbols-outlined text-lg">home</span>
            </div>
            <div>
              <div class="menu-item-text">Menu Principale</div>
              <div class="menu-item-sub">Torna alla configurazione</div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const router = useRouter()
const store = useGameStore()
const showMenu = ref(false)

// Background
const bgSrc = computed(() => `/backgrounds/${store.selectedBackground}.png`)

// Dynamic colors based on background
const bgOverlay = computed(() => {
  switch (store.selectedBackground) {
    case 'parchment': return 'bg-transparent'
    case 'enchanted': return 'bg-black/20'
    case 'cosmic': return 'bg-black/30'
    default: return ''
  }
})

const nameColor = computed(() => {
  switch (store.selectedBackground) {
    case 'parchment': return '#3a2d1a'
    case 'enchanted': return '#e0d8c0'
    case 'cosmic': return '#e0d0f0'
    default: return '#3a2d1a'
  }
})

const scoreColor = computed(() => {
  switch (store.selectedBackground) {
    case 'parchment': return '#3a2d1a'
    case 'enchanted': return '#f5eedd'
    case 'cosmic': return '#ffffff'
    default: return '#3a2d1a'
  }
})

const stepColor = computed(() => {
  switch (store.selectedBackground) {
    case 'parchment': return 'rgba(197,165,90,0.5)'
    case 'enchanted': return 'rgba(255,255,255,0.3)'
    case 'cosmic': return 'rgba(255,255,255,0.3)'
    default: return 'rgba(197,165,90,0.5)'
  }
})

const diamondBorder = computed(() => {
  const gold = 'rgba(197,165,90,0.6)'
  const light = 'rgba(255,255,255,0.3)'
  const border = store.selectedBackground === 'parchment' ? gold : light
  return {
    border: `2px solid ${border}`,
    background: store.selectedBackground === 'parchment'
      ? 'rgba(197,165,90,0.06)'
      : 'rgba(255,255,255,0.05)'
  }
})

const diamondInner = computed(() => {
  return {
    background: store.selectedBackground === 'parchment'
      ? 'rgba(240,230,208,0.3)'
      : 'rgba(0,0,0,0.2)',
    borderRadius: '4px'
  }
})

const btnStyle = computed(() => {
  if (store.selectedBackground === 'parchment') {
    return {
      borderColor: 'rgba(197,165,90,0.6)',
      background: 'rgba(197,165,90,0.08)',
      color: 'rgba(197,165,90,0.9)'
    }
  }
  return {
    borderColor: 'rgba(255,255,255,0.4)',
    background: 'rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.9)'
  }
})

const doCoinToss = () => {
  showMenu.value = false
  store.triggerCoinToss()
}

const doReset = () => {
  showMenu.value = false
  store.resetMatch()
}

const goToSetup = () => {
  showMenu.value = false
  store.winner = null
  router.push('/')
}
</script>

<style scoped>
/* Menu transitions */
.menu-backdrop-enter-active { animation: fade-in 0.25s ease-out; }
.menu-backdrop-leave-active { animation: fade-in 0.2s ease-out reverse; }

.menu-panel-enter-active { animation: slide-up 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.menu-panel-leave-active { animation: slide-up 0.25s cubic-bezier(0.22, 1, 0.36, 1) reverse; }

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slide-up {
  from { transform: translateY(100%); }
  to { transform: translateY(0); }
}
</style>
