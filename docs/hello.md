---
hello: world
---

## Markdown Content

The count is: {{ count }}
<button :class="$style.button" @click="count++">Increment</button>
<VPTeamMembers size="small" :members="members" />
<script setup>
import { ref } from 'vue'
import { VPTeamMembers } from 'vitepress/theme'
const count = ref(0)
const members = [
  {
    avatar: 'https://www.github.com/yyx990803.png',
    name: 'Evan You',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/yyx990803' },
      { icon: 'twitter', link: 'https://twitter.com/youyuxi' }
    ]
  }
]
</script>
<style module>
.button {
  color: red;
  font-weight: bold;
}
</style>

::: v-pre
{{ This will be displayed as-is }}
:::

```js-vue
Hello {{ 1 + 1 }}
```

{{1+2}}

## Markdown Content1

<div>12311111</div>

### Title <Badge type="info" text="default" />
### Title <Badge type="tip" text="^1.9.0" />
### Title <Badge type="warning" text="beta" />
### Title <Badge type="danger" text="caution" />
### Title <Badge type="info">custom element</Badge>
