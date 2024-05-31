const key = 'mouse-move';

export const setTargetEl = (el: HTMLElement) => useState<HTMLElement | undefined>(key, () => undefined).value = el
export const useTargetEl = () => useState<HTMLElement | null>(key, () => null)

export const useMouseTracking = () => {
  const target = ref<HTMLElement | null>(null)
  const mouse = reactive(useMouseInElement(target))

  const targetEl = useTargetEl()

  watch(targetEl, (el) => {
    target.value = el;
  })

  return {
    mouse
  }
}
