<template>
  <div class="w-full h-full overflow-hidden flex flex-col relative">
    <router-view class="flex-grow overflow-hidden" />
    <CoinFlipModal />
    <VictoryModal />
  </div>
</template>

<script setup>
import CoinFlipModal from '@/components/CoinFlipModal.vue'
import VictoryModal from '@/components/VictoryModal.vue'
</script>
