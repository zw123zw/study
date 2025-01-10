---
hello: world
---

## Markdown Content

The count is: {{ count }}

<button :class="$style.button" @click="count++">Increment</button>

::: v-pre
{{ This will be displayed as-is }}
:::

```js-vue
Hello {{ 1 + 1 }}
```

<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>