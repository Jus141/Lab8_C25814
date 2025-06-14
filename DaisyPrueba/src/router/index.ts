import { createRouter, createWebHistory } from 'vue-router'
import ProyectosListView from '../views/ProyectosListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: () => import('@/layouts/MenuLayout.vue'),
      children: [
        {
          path: '/',
          name: 'home',
          component: ProyectosListView,
        },
        {
          path: '/proyectos',
          name: 'proyectos',
          component: ProyectosListView,
        },
        {
          path: '/proyecto/:id',
          name: 'proyecto-detalle',
          component: () => import('../views/ProyectoDetalleView.vue'),
        },
      ]
    }
  ]
})

export default router