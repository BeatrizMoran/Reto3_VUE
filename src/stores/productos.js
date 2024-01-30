import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useProductosStore = defineStore('productos', () => {
  const listaProductos = ref([])

  // Método para cargar productos desde la API
  async function cargarProductosDesdeAPI() {
    try {
      const response = await fetch('http://localhost/api/productos');
      console.log(response);
      if (!response.ok) {
        throw new Error('Error al obtener productos desde la API')
      }

      const data = await response.json()
      console.log('Datos recibidos desde la API:', data);

      // Actualizar la lista de productos en el almacén
      listaProductos.value = data
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  async function buscarProductos(nombre) {
    console.log('Entrando en la función buscarProductos'); // Verificar si la función se está ejecutando
    try {
      console.log('Término de búsqueda:', nombre);
  
      const response = await fetch(`http://localhost/api/productos?nombre=${nombre}`)
      console.log('URL de solicitud:', response.url);
      
      console.log("pene", response);

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message)
    }
  }
  


  function obtenerProductos() {
    return listaProductos.value
  }

  return { cargarProductosDesdeAPI, buscarProductos, obtenerProductos/* Resto de las funciones y datos del almacén... */ }
})
