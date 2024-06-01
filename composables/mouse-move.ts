const key = 'mouse-move';

export const setTargetEl = (el: HTMLElement) => useState<HTMLElement | undefined>(key, () => undefined).value = el
export const useTargetEl = () => useState<HTMLElement | null>(key, () => null)

export const useMouseTracking = () => {
  const mouse = reactive(useMouseInElement(useTargetEl()))

  return {
    mouse
  }
}
