import { defineStore } from 'pinia'

export interface Tarea {
  id: number
  nombre: string
  completada: boolean
}

export interface Proyecto {
  id: number
  nombre: string
  tareas: Tarea[]
}

export const useProyectosStore = defineStore('proyectos', {
  state: () => ({
    proyectos: [] as Proyecto[],
    nextId: 1,
    nextTareaId: 1,
  }),
  actions: {
    agregarProyecto(nombre: string) {
      this.proyectos.push({
        id: this.nextId++,
        nombre,
        tareas: [],
      })
    },
    agregarTarea(proyectoId: number, nombre: string) {
      const proyecto = this.proyectos.find(p => p.id === proyectoId)
      if (proyecto) {
        proyecto.tareas.push({
          id: this.nextTareaId++,
          nombre,
          completada: false,
        })
      }
    },
    toggleTarea(proyectoId: number, tareaId: number) {
      const proyecto = this.proyectos.find(p => p.id === proyectoId)
      if (proyecto) {
        const tarea = proyecto.tareas.find(t => t.id === tareaId)
        if (tarea) {
          tarea.completada = !tarea.completada
        }
      }
    },
    calcularAvance(proyecto: Proyecto) {
      if (proyecto.tareas.length === 0) return 0
      const completadas = proyecto.tareas.filter(t => t.completada).length
      return Math.round((completadas / proyecto.tareas.length) * 100)
    }
  },
}) 