const key = 'mouse-move';

export const setTargetEl = (value: HTMLElement) => {
  const state = useState<HTMLElement | undefined>(key, () => undefined);
  state.value = value;
};

export const useTargetEl = () => {
  return useState<HTMLElement | undefined>(key, () => undefined);
};

export const useMouseTracking = () => {
  const target = ref<HTMLElement | null>(null);
  const mouse = reactive(useMouseInElement(target));

  const targetEl = useTargetEl();

  watch(targetEl, (el) => {
    target.value = el;
  });

  return {
    mouse
  };
};
