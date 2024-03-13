
import { defineStore } from 'pinia'
import { ElementStyle, Style } from '@/components/type'
import { reactive } from 'vue'


interface ComponentData {
  component: string, data: ElementStyle, type: string
}

export const useComponentStore = defineStore({
  id: 'componentStore',
  state: () => ({
    data: [] as ComponentData[]
  }),
  getters: {
    getData: (state) => {
      return state.data
    },
    getStyle: (state) => {


      let stateData: ComponentData[] = reactive([])
      state.data.forEach((el: ComponentData) => {
        const { component, data, type } = el
        let styleData: Style = {
          width: '',
          height: '',
          left: '',
          top: '',
          border: ''
        }

        for (const key in data.style) {
          if (Object.prototype.hasOwnProperty.call(data.style, key)) {
            let element = data.style[key];
            console.log(element);
            let copy: string = element
            if (typeof (element) == 'number') {
              copy = element + 'px'
            }
            styleData[key] = copy
          }
        }


        stateData.push({ component, data: { id: data.id, style: styleData, state: data.state }, type })
      })

      return stateData
    }
  },
  actions: {
    pushData(data: ComponentData): void {
      console.log(this.data);
      this.data.push(data)
    }
  },
  // persist: {
  //   storage: sessionStorage,
  // },
})