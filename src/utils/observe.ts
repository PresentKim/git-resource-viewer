export function observerResize(
  target: Element | null,
  callback: (e: ResizeObserverEntry, o: ResizeObserver) => void,
  options?: ResizeObserverOptions,
) {
  if (!target) return () => {}

  const observer = new ResizeObserver(([entry], observer) =>
    callback(entry, observer),
  )
  observer.observe(target, options)
  return () => {
    observer.disconnect()
  }
}

export function observeIntersection(
  target: Element | null,
  callback: (e: IntersectionObserverEntry, o: IntersectionObserver) => void,
  options?: IntersectionObserverInit,
) {
  if (!target) return () => {}

  const observer = new IntersectionObserver(
    ([entry], observer) => callback(entry, observer),
    options,
  )
  observer.observe(target)
  return () => {
    observer.disconnect()
  }
}
