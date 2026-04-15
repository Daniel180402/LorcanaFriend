<template>
  <main class="celestial-bg pb-44 pt-8 px-6 overflow-y-auto">
    <div class="max-w-xl mx-auto space-y-8 mb-8">
      <!-- Page Hero / Title -->
      <section class="text-center space-y-2">
        <h2 class="font-headline text-4xl font-bold text-on-surface tracking-tight">Match History</h2>
        <p class="text-on-surface-variant font-medium">Chronicles of past duels</p>
      </section>

      <div v-if="store.logs.length === 0" class="text-center text-outline-variant font-label py-12">
        <span class="material-symbols-outlined text-6xl mb-4 opacity-50">auto_stories</span>
        <p>No matches recorded yet.</p>
      </div>

      <div v-else class="space-y-4">
        <div v-for="log in store.logs" :key="log.id" class="bg-surface-container-highest rounded-xl p-5 border-l-4 border-secondary/50 shadow-lg flex flex-col gap-3 relative overflow-hidden group">
          <div class="flex justify-between items-start">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-secondary text-sm" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
              <span class="font-headline font-bold text-lg text-secondary">{{ log.winner }}</span>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-on-surface-variant font-label">{{ log.date }}</span>
              <button @click="confirmDelete(log)" class="text-outline-variant hover:text-error transition-colors opacity-50 group-hover:opacity-100">
                <span class="material-symbols-outlined text-sm">delete</span>
              </button>
            </div>
          </div>
          
          <div class="flex items-center justify-between bg-surface-container-lowest rounded p-3">
            <div class="text-center min-w-[80px]">
              <span class="block text-xs uppercase tracking-widest text-on-surface-variant max-w-[80px] truncate" :title="log.p1Name">{{ log.p1Name }}</span>
              <span class="font-headline text-2xl" :class="log.winner === log.p1Name ? 'text-secondary font-bold' : 'text-outline-variant'">{{ log.p1Score }}</span>
            </div>
            <div class="text-xs text-outline-variant font-label uppercase tracking-widest">
              To {{ log.target }}
            </div>
            <div class="text-center min-w-[80px]">
              <span class="block text-xs uppercase tracking-widest text-on-surface-variant max-w-[80px] truncate" :title="log.p2Name">{{ log.p2Name }}</span>
              <span class="font-headline text-2xl" :class="log.winner === log.p2Name ? 'text-secondary font-bold' : 'text-outline-variant'">{{ log.p2Score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="logToDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-md px-4">
      <div class="relative w-full max-w-sm bg-surface-container-highest rounded-xl border border-error/20 overflow-hidden shadow-2xl p-8 flex flex-col items-center text-center animate-fade-in">
        <span class="material-symbols-outlined text-5xl text-error mb-4">warning</span>
        <h2 class="font-headline text-2xl text-on-surface mb-2 tracking-tight">Delete Match?</h2>
        <p class="font-label text-sm text-on-surface-variant mb-8">
          Are you sure you want to permanently delete this match from history?
        </p>
        <div class="flex w-full gap-3">
          <button @click="logToDelete = null" class="flex-1 bg-surface-container-low py-3 rounded-lg text-on-surface font-bold tracking-widest uppercase hover:bg-surface-variant active:scale-95 transition-all">
            Cancel
          </button>
          <button @click="executeDelete" class="flex-1 bg-error/20 border border-error/50 text-error py-3 rounded-lg font-bold tracking-widest uppercase hover:bg-error hover:text-on-error active:scale-95 transition-all">
            Delete
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useGameStore } from '@/stores/gameStore'
const store = useGameStore()

const logToDelete = ref(null)

const confirmDelete = (log) => {
  logToDelete.value = log
}

const executeDelete = () => {
  if (logToDelete.value) {
    store.deleteLog(logToDelete.value.id)
    logToDelete.value = null
  }
}
</script>

<style scoped>
@keyframes fade-in {
  0% { transform: scale(0.95); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.animate-fade-in {
  animation: fade-in 0.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
</style>
