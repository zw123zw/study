import {
  reactive,
  getCurrentInstance,
  onBeforeMount,
  onUnmounted,
  defineComponent,
} from 'vue'
import { deviceDetection } from '@pureadmin/utils'
import AMapLoader from '@amap/amap-jsapi-loader'
import car from '@/assets/car.png'
import mapJson from './mapJson.json'

export interface MapConfigureInter {
  on: Fn
  destroy?: Fn
  clearEvents?: Fn
  addControl?: Fn
  setCenter?: Fn
  setZoom?: Fn
  plugin?: Fn
}

export default defineComponent({
  emits: [],
  props: {},
  setup(props, { emit }) {
    let MarkerCluster
    let map: MapConfigureInter

    const instance = getCurrentInstance()

    const mapSet = reactive({
      loading: deviceDetection() ? false : true,
    })

    // 地图创建完成(动画关闭)
    const complete = (): void => {
      if (map) {
        map.on('complete', () => {
          mapSet.loading = false
        })
      }
    }

    onBeforeMount(() => {
      if (!instance) return
      const { MapConfigure } =
        instance.appContext.config.globalProperties.$config
      const { options } = MapConfigure
    })

    console.log(AMapLoader.load)

    return () => <>地图</>
  },
})
