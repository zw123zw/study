import { ref } from 'vue'

export function useDataThemeChange() {
  const dataTheme = ref(false)

  function dataThemeChange() {
    if (dataTheme.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return {
    dataTheme,
    dataThemeChange
  }
}
