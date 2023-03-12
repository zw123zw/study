import {
  ref,
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
import './Amap.scss'
import { onMounted } from 'vue-demi'

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
    const mapview = ref(null)

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

      AMapLoader.load({
        key: MapConfigure.amapKey,
        version: '2.0',
        plugins: ['AMap.MarkerCluster'],
      })
        .then(AMap => {
          // 创建地图实例
          map = new AMap.Map(mapview.value, options)

          //地图中添加地图操作ToolBar插件
          map.plugin(['AMap.ToolBar', 'AMap.MapType'], () => {
            map.addControl(new AMap.ToolBar())
            //地图类型切换
            map.addControl(
              new AMap.MapType({
                defaultType: 0,
              })
            )
          })

          MarkerCluster = new AMap.MarkerCluster(map, [], {
            // 聚合网格像素大小
            gridSize: 80,
            maxZoom: 14,
            renderMarker(ctx) {
              const { marker, data } = ctx
              if (Array.isArray(data) && data[0]) {
                const { driver, plateNumber, orientation } = data[0]
                const content = `<img style="transform: scale(1) rotate(${
                  360 - Number(orientation)
                }deg);" src='${car}' />`
                marker.setContent(content)
                marker.setLabel({
                  direction: 'bottom',
                  //设置文本标注偏移量
                  offset: new AMap.Pixel(-4, 0),
                  //设置文本标注内容
                  content: `<div> ${plateNumber}(${driver})</div>`,
                })
                marker.setOffset(new AMap.Pixel(-18, -10))
                marker.on('click', ({ lnglat }) => {
                  map.setZoom(13) //设置地图层级
                  map.setCenter(lnglat)
                })
              }
            },
          })
        })
        .catch(err => {
          console.log('err:', err)
        })
      complete()
    })

    onMounted(() => {
      // 获取模拟车辆信息
      const points: object = mapJson.map(v => {
        return {
          lnglat: [v.lng, v.lat],
          ...v,
        }
      })
      if (MarkerCluster) MarkerCluster.setData(points)
    })

    console.log(AMapLoader.load)

    onUnmounted(() => {
      if (map) {
        // 销毁地图实例
        map.destroy() && map.clearEvents('click')
      }
    })

    return () => (
      <>
        <div id="mapview" ref={mapview} v-loading={mapSet.loading} />
      </>
    )
  },
})
