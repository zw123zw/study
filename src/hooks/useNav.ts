import { computed } from 'vue'
import { useGlobal } from "@pureadmin/utils";

export function useNav() {
  const { $storage, $config } = useGlobal<GlobalPropertiesApi>();

  const title = computed(() => $config.Title)

  // 设置国际化后选中样式
  const getDropdownItemStyle = computed(() => {
    return (locale, t) => {
      return {
        background: locale === t ? 'rgb(64, 158, 255)' : '',
        color: locale === t ? '#f4f4f5' : '#000',
      }
    }
  })

  const getDropdownItemClass = computed(() => {
    return (locale, t) => {
      return locale === t ? "" : "dark:hover:!text-primary";
    };
  });

  return {
    title,
    getDropdownItemStyle,
    getDropdownItemClass
  }
}
