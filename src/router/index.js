import { createRouter, createWebHistory } from 'vue-router'
import SetupView from '@/views/SetupView.vue'
import BattleView from '@/views/BattleView.vue'
import LogView from '@/views/LogView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'setup',
      component: SetupView
    },
    {
      path: '/battle',
      name: 'battle',
      component: BattleView
    },
    {
      path: '/log',
      name: 'log',
      component: LogView
    }
  ]
})

export default router
