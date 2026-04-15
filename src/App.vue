<template>
  <div class="bg-surface text-on-surface font-body min-h-screen flex flex-col overflow-hidden">
    <!-- TopAppBar -->
    <header class="flex justify-between items-center px-6 py-4 w-full bg-[#0c1324] shadow-[0px_20px_40px_rgba(0,0,0,0.4)] top-0 z-50">
      <div class="flex items-center gap-4">
        <span class="material-symbols-outlined text-[#e9c349] hover:opacity-80 transition-opacity duration-300 cursor-pointer" data-icon="menu">menu</span>
        <h1 class="font-['Noto_Serif'] font-bold tracking-tight text-xl italic text-[#e9c349]">Celestial Archive</h1>
      </div>
      <div class="flex items-center gap-4">
        <span class="material-symbols-outlined text-[#e9c349] hover:opacity-80 transition-opacity duration-300 cursor-pointer" @click="gameStore.resetMatch">history</span>
      </div>
    </header>

    <router-view class="flex-grow" />

    <CoinFlipModal />
    <VictoryModal />

    <!-- BottomNavBar -->
    <footer v-show="!gameStore.showCoinToss" class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-12 pt-2 bg-[#151b2d]/80 backdrop-blur-xl border-t border-[#e9c349]/15 shadow-[0px_-10px_30px_rgba(0,0,0,0.5)] z-40 rounded-t-xl">
      <router-link to="/" class="flex flex-col items-center justify-center transition-colors duration-300 scale-95 active:scale-100 cursor-pointer" :class="$route.name === 'setup' ? 'text-[#e9c349] bg-[#2e3447] rounded-lg px-3 py-1' : 'text-slate-500 hover:text-[#ddb8ff]'">
        <span class="material-symbols-outlined">settings</span>
        <span class="font-['Manrope'] text-[10px] uppercase tracking-widest">Setup</span>
      </router-link>

      <router-link to="/battle" class="flex flex-col items-center justify-center transition-colors duration-300 scale-95 active:scale-100 cursor-pointer" :class="$route.name === 'battle' ? 'text-[#e9c349] bg-[#2e3447] rounded-lg px-3 py-1' : 'text-slate-500 hover:text-[#ddb8ff]'">
        <span class="material-symbols-outlined">balcony</span>
        <span class="font-['Manrope'] text-[10px] uppercase tracking-widest">Battle</span>
      </router-link>

      <div @click="gameStore.triggerCoinToss" class="flex flex-col items-center justify-center text-slate-500 hover:text-[#ddb8ff] transition-colors duration-300 scale-95 active:scale-100 cursor-pointer">
        <span class="material-symbols-outlined">monetization_on</span>
        <span class="font-['Manrope'] text-[10px] uppercase tracking-widest">Toss</span>
      </div>

      <router-link to="/log" class="flex flex-col items-center justify-center transition-colors duration-300 scale-95 active:scale-100 cursor-pointer" :class="$route.name === 'log' ? 'text-[#e9c349] bg-[#2e3447] rounded-lg px-3 py-1' : 'text-slate-500 hover:text-[#ddb8ff]'">
        <span class="material-symbols-outlined">auto_stories</span>
        <span class="font-['Manrope'] text-[10px] uppercase tracking-widest">Log</span>
      </router-link>
    </footer>
  </div>
</template>

<script setup>
import { useGameStore } from '@/stores/gameStore'
import CoinFlipModal from '@/components/CoinFlipModal.vue'
import VictoryModal from '@/components/VictoryModal.vue'

const gameStore = useGameStore()
</script>
