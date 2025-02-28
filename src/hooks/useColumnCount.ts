function useColumnCount(
  targetRef: React.RefObject<HTMLElement | null>,
): number {
  if (!targetRef?.current?.children?.length) {
    return 0
  }

  const items = Array.from(targetRef.current.childNodes) as HTMLElement[]
  const firstItemTop = items[0].offsetTop
  let count = 0
  for (const item of items) {
    if (item.offsetTop !== firstItemTop) break
    count++
  }

  return count
}

export {useColumnCount}
