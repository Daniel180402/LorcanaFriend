<template>
  <main class="setup-bg h-full px-6 py-12 overflow-y-auto overscroll-none" style="-webkit-overflow-scrolling: touch;">
    <!-- Back button -->
    <div class="max-w-sm mx-auto mb-6">
      <button @click="router.back()" class="flex items-center gap-1 text-lorcana-gold-dark/60 text-sm font-medium active:opacity-70 transition-opacity">
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        Indietro
      </button>
    </div>

    <div class="max-w-sm mx-auto space-y-6">
      <!-- Title -->
      <div class="text-center space-y-1">
        <h1 class="font-headline text-3xl font-bold text-lorcana-brown tracking-tight">Storico Partite</h1>
        <p class="text-lorcana-brown-light/50 text-sm font-medium">Cronologia delle sfide</p>
      </div>

      <!-- Import / Export Actions -->
      <div class="flex items-center justify-center gap-3">
        <button @click="exportData" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lorcana-brown/5 text-lorcana-brown font-bold text-xs uppercase tracking-widest active:scale-95 transition-all border border-lorcana-gold/20">
          <span class="material-symbols-outlined text-sm">download</span>
          Esporta
        </button>
        <button @click="triggerImport" class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-lorcana-brown/5 text-lorcana-brown font-bold text-xs uppercase tracking-widest active:scale-95 transition-all border border-lorcana-gold/20">
          <span class="material-symbols-outlined text-sm">upload</span>
          Importa
        </button>
        <input type="file" ref="fileInput" @change="handleImport" accept=".json" class="hidden" />
      </div>

      <!-- Head to Head Stats -->
      <div v-if="store.savedPlayers.length >= 2" class="bg-white/50 backdrop-blur-md rounded-2xl p-5 border border-lorcana-gold/20 shadow-sm relative overflow-hidden">
        <h2 class="font-headline text-lg font-bold text-lorcana-brown text-center mb-4">Testa a Testa</h2>
        
        <div class="flex items-center justify-between gap-3 mb-4">
          <select v-model="h2hPlayer1" class="flex-1 bg-white/70 border border-lorcana-gold/30 rounded-xl px-3 py-2.5 text-lorcana-brown text-sm font-bold focus:outline-none focus:border-lorcana-gold/60">
            <option disabled value="">Giocatore 1</option>
            <option v-for="p in store.savedPlayers" :key="p" :value="p">{{ p }}</option>
          </select>
          <div class="text-[10px] text-lorcana-brown/30 font-bold uppercase tracking-widest shrink-0">VS</div>
          <select v-model="h2hPlayer2" class="flex-1 bg-white/70 border border-lorcana-gold/30 rounded-xl px-3 py-2.5 text-lorcana-brown text-sm font-bold focus:outline-none focus:border-lorcana-gold/60">
            <option disabled value="">Giocatore 2</option>
            <option v-for="p in store.savedPlayers" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>

        <!-- Results -->
        <div v-if="h2hPlayer1 && h2hPlayer2 && h2hPlayer1 !== h2hPlayer2" class="flex items-center justify-between bg-parchment-100/80 rounded-xl p-4 border border-lorcana-gold/10">
          <div class="text-center flex-1">
            <span class="block text-[10px] uppercase tracking-widest text-lorcana-brown/40 truncate max-w-[80px] mx-auto mb-1">{{ h2hPlayer1 }}</span>
            <span class="font-headline text-3xl font-bold" :class="h2hStats.p1Wins > h2hStats.p2Wins ? 'text-lorcana-gold-dark' : (h2hStats.p1Wins === h2hStats.p2Wins ? 'text-lorcana-brown' : 'text-lorcana-brown/40')">{{ h2hStats.p1Wins }}</span>
          </div>
          <div class="w-px h-8 bg-lorcana-gold/20 mx-2"></div>
          <div class="text-center flex-1">
            <span class="block text-[10px] uppercase tracking-widest text-lorcana-brown/40 truncate max-w-[80px] mx-auto mb-1">{{ h2hPlayer2 }}</span>
            <span class="font-headline text-3xl font-bold" :class="h2hStats.p2Wins > h2hStats.p1Wins ? 'text-lorcana-gold-dark' : (h2hStats.p1Wins === h2hStats.p2Wins ? 'text-lorcana-brown' : 'text-lorcana-brown/40')">{{ h2hStats.p2Wins }}</span>
          </div>
        </div>
        
        <div v-else-if="h2hPlayer1 === h2hPlayer2 && h2hPlayer1" class="text-center text-xs text-lorcana-brown/40 font-medium py-2">
          Seleziona due giocatori diversi
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="store.logs.length === 0" class="text-center py-16">
        <span class="material-symbols-outlined text-5xl text-lorcana-gold/30 mb-3 block">auto_stories</span>
        <p class="text-lorcana-brown/30 text-sm">Nessuna partita registrata</p>
      </div>

      <!-- Log Entries -->
      <div v-else class="space-y-3">
        <div
          v-for="log in store.logs"
          :key="log.id"
          class="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-lorcana-gold/10 shadow-sm relative group"
        >
          <!-- Delete -->
          <button
            @click="confirmDelete(log)"
            class="absolute top-3 right-3 text-lorcana-brown/20 active:text-red-500 transition-colors opacity-0 group-active:opacity-100"
            style="opacity: 0.3;"
          >
            <span class="material-symbols-outlined text-base">delete</span>
          </button>

          <!-- Winner badge -->
          <div class="flex items-center gap-1.5 mb-3">
            <span class="material-symbols-outlined text-lorcana-gold text-sm" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
            <span class="font-headline font-bold text-sm text-lorcana-brown">{{ log.winner }}</span>
            <span class="text-[10px] text-lorcana-brown/30 ml-auto">{{ log.date }}</span>
          </div>

          <!-- Score -->
          <div class="flex items-center justify-between bg-parchment-100/80 rounded-lg p-3">
            <div class="text-center flex-1">
              <span class="block text-[10px] uppercase tracking-widest text-lorcana-brown/40 truncate max-w-[70px] mx-auto">{{ log.p1Name }}</span>
              <span class="font-headline text-xl font-bold" :class="log.winner === log.p1Name ? 'text-lorcana-gold-dark' : 'text-lorcana-brown/25'">{{ log.p1Score }}</span>
            </div>
            <div class="text-[10px] text-lorcana-brown/20 font-bold uppercase tracking-widest px-2">vs</div>
            <div class="text-center flex-1">
              <span class="block text-[10px] uppercase tracking-widest text-lorcana-brown/40 truncate max-w-[70px] mx-auto">{{ log.p2Name }}</span>
              <span class="font-headline text-xl font-bold" :class="log.winner === log.p2Name ? 'text-lorcana-gold-dark' : 'text-lorcana-brown/25'">{{ log.p2Score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <Teleport to="body">
      <Transition name="delete-modal">
        <div v-if="logToDelete" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-6">
          <div class="w-full max-w-xs bg-gradient-to-b from-parchment-100 to-parchment-200 rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col items-center text-center animate-scale-in">
            <span class="material-symbols-outlined text-4xl text-red-400 mb-3">warning</span>
            <h2 class="font-headline text-xl font-bold text-lorcana-brown mb-1">Eliminare?</h2>
            <p class="text-sm text-lorcana-brown/50 mb-6">Vuoi eliminare questa partita dallo storico?</p>
            <div class="flex w-full gap-2.5">
              <button @click="logToDelete = null" class="flex-1 py-3 rounded-xl bg-lorcana-brown/5 text-lorcana-brown font-bold text-sm uppercase tracking-widest active:scale-95 transition-all">
                Annulla
              </button>
              <button @click="executeDelete" class="flex-1 py-3 rounded-xl bg-red-50 border border-red-200 text-red-500 font-bold text-sm uppercase tracking-widest active:scale-95 transition-all">
                Elimina
              </button>
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
const logToDelete = ref(null)
const fileInput = ref(null)

const h2hPlayer1 = ref(store.savedPlayers?.length >= 2 ? store.savedPlayers[0] : '')
const h2hPlayer2 = ref(store.savedPlayers?.length >= 2 ? store.savedPlayers[1] : '')

const h2hStats = computed(() => {
  let p1Wins = 0
  let p2Wins = 0
  
  if (!h2hPlayer1.value || !h2hPlayer2.value) return { p1Wins, p2Wins }

  store.logs.forEach(log => {
    const isMatch = (log.p1Name === h2hPlayer1.value && log.p2Name === h2hPlayer2.value) || 
                    (log.p1Name === h2hPlayer2.value && log.p2Name === h2hPlayer1.value)
    
    if (isMatch) {
      if (log.winner === h2hPlayer1.value) p1Wins++
      if (log.winner === h2hPlayer2.value) p2Wins++
    }
  })
  
  return { p1Wins, p2Wins }
})

const triggerImport = () => {
  fileInput.value?.click()
}

const handleImport = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const logs = JSON.parse(e.target.result)
      store.importLogs(logs)
      alert("Storico importato con successo!")
    } catch (err) {
      alert("Formato file non valido.")
    }
    event.target.value = ''
  }
  reader.readAsText(file)
}

const exportData = () => {
  if (store.logs.length === 0) {
    alert("Nessuna partita da esportare.")
    return
  }
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(store.logs))
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute("href", dataStr)
  downloadAnchorNode.setAttribute("download", "lorcana_storico.json")
  document.body.appendChild(downloadAnchorNode)
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

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
.delete-modal-enter-active { animation: fade-in 0.25s ease-out; }
.delete-modal-leave-active { animation: fade-in 0.2s ease-out reverse; }

.animate-scale-in {
  animation: scale-in 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scale-in {
  from { transform: scale(0.9); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}
</style>
