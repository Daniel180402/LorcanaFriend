<template>
  <main class="celestial-bg pb-44 pt-8 px-6 overflow-y-auto">
    <div class="max-w-xl mx-auto space-y-10 mb-8">
      <!-- Page Hero / Title -->
      <section class="text-center space-y-2">
        <h2 class="font-headline text-4xl font-bold text-on-surface tracking-tight">Match Setup</h2>
        <p class="text-on-surface-variant font-medium">Prepare your ink for the upcoming duel</p>
      </section>

      <!-- Player Entry Section -->
      <div class="grid grid-cols-1 gap-6">
        <!-- Player 1 Card -->
        <div class="bg-surface-container-highest rounded-xl p-6 relative overflow-hidden group border-t-2 border-[#e9c349]/20 shadow-2xl">
          <div class="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <span class="material-symbols-outlined text-8xl">auto_awesome</span>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
            </div>
            <div>
              <span class="text-xs uppercase tracking-widest text-secondary font-bold">Illumineer One</span>
              <h3 class="font-headline text-xl">Enter Name</h3>
            </div>
          </div>
          <input v-model="p1" class="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 outline-none focus:ring-tertiary/40 transition-all shadow-inner" placeholder="Character or Player Name" type="text"/>
        </div>

        <!-- Player 2 Card -->
        <div class="bg-surface-container-highest rounded-xl p-6 relative overflow-hidden group border-t-2 border-[#e9c349]/20 shadow-2xl">
          <div class="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
            <span class="material-symbols-outlined text-8xl">flare</span>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-tertiary-container flex items-center justify-center text-tertiary">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">person</span>
            </div>
            <div>
              <span class="text-xs uppercase tracking-widest text-tertiary font-bold">Illumineer Two</span>
              <h3 class="font-headline text-xl">Enter Name</h3>
            </div>
          </div>
          <input v-model="p2" class="w-full bg-surface-container-lowest border-none rounded-md px-4 py-3 text-on-surface placeholder:text-outline focus:ring-2 outline-none focus:ring-tertiary/40 transition-all shadow-inner" placeholder="Opponent Name" type="text"/>
        </div>
      </div>

      <!-- Lore Target Selection -->
      <section class="space-y-6">
        <div class="flex items-center gap-2">
          <span class="material-symbols-outlined text-secondary">stars</span>
          <h3 class="font-headline text-2xl font-bold text-on-surface">Victory Threshold</h3>
        </div>
        <div class="grid grid-cols-3 gap-4">
          <button @click="target = 20" :class="target === 20 ? 'ring-2 ring-secondary' : ''" class="gold-border-gradient rounded-md py-4 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
            <span class="text-2xl font-headline font-bold text-secondary">20</span>
            <span class="text-[10px] uppercase tracking-tighter text-outline-variant group-hover:text-secondary group-focus:text-secondary">Standard</span>
          </button>
          <button @click="target = 40" :class="target === 40 ? 'ring-2 ring-secondary' : ''" class="gold-border-gradient rounded-md py-4 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 group">
            <span class="text-2xl font-headline font-bold text-secondary">40</span>
            <span class="text-[10px] uppercase tracking-tighter text-outline-variant group-hover:text-secondary group-focus:text-secondary">Epic Duel</span>
          </button>
          <div class="relative">
            <input v-model.number="target" class="w-full h-full bg-surface-container-lowest border-none rounded-md text-center font-headline text-xl font-bold text-secondary outline-none focus:ring-2 focus:ring-tertiary/40 placeholder:text-outline-variant placeholder:font-body placeholder:text-sm shadow-inner" placeholder="Custom" type="number"/>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <div class="pt-4">
        <button @click="startMatch" class="w-full py-4 rounded-md bg-gradient-to-br from-[#e9c349] to-[#342800] text-on-secondary font-bold text-lg shadow-[0px_10px_30px_rgba(233,195,73,0.2)] hover:opacity-90 active:scale-[0.98] transition-all">
            Commence Chapter
        </button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/gameStore'

const router = useRouter()
const store = useGameStore()

const p1 = ref(store.player1Name)
const p2 = ref(store.player2Name)
const target = ref(store.targetScore)

const startMatch = () => {
    store.startMatch(p1.value, p2.value, target.value)
    router.push('/battle')
}
</script>
