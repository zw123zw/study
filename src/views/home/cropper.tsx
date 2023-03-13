import { defineComponent, ref, onMounted } from 'vue'
import './cropper.scss'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'

export default defineComponent({
  emits: [],
  props: {},
  setup(props, { emit }) {
    const imgUrl = new URL('./picture.jpeg', import.meta.url).href

    const imageEl = ref(null)

    onMounted(() => {
      const cropper = new Cropper(imageEl.value, {
        crop(event) {
          console.log(event.detail.x)
          console.log(event.detail.y)
          console.log(event.detail.width)
          console.log(event.detail.height)
          console.log(event.detail.rotate)
          console.log(event.detail.scaleX)
          console.log(event.detail.scaleY)
        },
      })
    })

    return () => (
      <>
        <div class="cropper-wrap">
          <img id="image" src={imgUrl} ref={imageEl} />
        </div>
      </>
    )
  },
})
