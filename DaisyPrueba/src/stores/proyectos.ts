import { defineStore } from "pinia";

export interface Tarea {
  id: number;
  nombre: string;
  completada: boolean;
}

export interface Proyecto {
  id: number;
  nombre: string;
  tareas: Tarea[];
}

export const useProyectosStore = defineStore("proyectos", {
  state: () => ({
    proyectos: [] as Proyecto[],
    nextId: 1,
    nextTareaId: 1,
  }),
  actions: {
    cargarDesdeLocalStorage() {
      const datos = localStorage.getItem("proyectos");
      if (datos) {
        const parsed = JSON.parse(datos);
        this.proyectos = parsed.proyectos || [];
        this.nextId = parsed.nextId || 1;
        this.nextTareaId = parsed.nextTareaId || 1;
      }
    },

    guardarEnLocalStorage() {
      const datos = {
        proyectos: this.proyectos,
        nextId: this.nextId,
        nextTareaId: this.nextTareaId,
      };
      localStorage.setItem("proyectos", JSON.stringify(datos));
    },

    limpiarLocalStorage() {
      localStorage.removeItem("proyectos");
      this.proyectos = [];
      this.nextId = 1;
      this.nextTareaId = 1;
    },

    agregarProyecto(nombre: string) {
      this.proyectos.push({
        id: this.nextId++,
        nombre,
        tareas: [],
      });
      this.guardarEnLocalStorage();
    },

    editarNombreProyecto(proyectoId: number, nuevoNombre: string) {
      const proyecto = this.proyectos.find((p) => p.id === proyectoId);
      if (proyecto && nuevoNombre.trim()) {
        proyecto.nombre = nuevoNombre.trim();
        this.guardarEnLocalStorage();
      }
    },

    eliminarProyecto(proyectoId: number) {
      const index = this.proyectos.findIndex((p) => p.id === proyectoId);
      if (index !== -1) {
        this.proyectos.splice(index, 1);
        this.guardarEnLocalStorage();
      }
    },

    agregarTarea(proyectoId: number, nombre: string) {
      const proyecto = this.proyectos.find((p) => p.id === proyectoId);
      if (proyecto) {
        proyecto.tareas.push({
          id: this.nextTareaId++,
          nombre,
          completada: false,
        });
        this.guardarEnLocalStorage();
      }
    },

    editarNombreTarea(
      proyectoId: number,
      tareaId: number,
      nuevoNombre: string
    ) {
      const proyecto = this.proyectos.find((p) => p.id === proyectoId);
      if (proyecto) {
        const tarea = proyecto.tareas.find((t) => t.id === tareaId);
        if (tarea && nuevoNombre.trim()) {
          tarea.nombre = nuevoNombre.trim();
          this.guardarEnLocalStorage();
        }
      }
    },

    eliminarTarea(proyectoId: number, tareaId: number) {
      const proyecto = this.proyectos.find((p) => p.id === proyectoId);
      if (proyecto) {
        const index = proyecto.tareas.findIndex((t) => t.id === tareaId);
        if (index !== -1) {
          proyecto.tareas.splice(index, 1);
          this.guardarEnLocalStorage();
        }
      }
    },

    toggleTarea(proyectoId: number, tareaId: number) {
      const proyecto = this.proyectos.find((p) => p.id === proyectoId);
      if (proyecto) {
        const tarea = proyecto.tareas.find((t) => t.id === tareaId);
        if (tarea) {
          tarea.completada = !tarea.completada;
          this.guardarEnLocalStorage();
        }
      }
    },

    calcularAvance(proyecto: Proyecto) {
      if (proyecto.tareas.length === 0) return 0;
      const completadas = proyecto.tareas.filter((t) => t.completada).length;
      return Math.round((completadas / proyecto.tareas.length) * 100);
    },
  },
});
