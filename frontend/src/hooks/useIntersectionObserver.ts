import { RefObject, useEffect, useState } from "react";

const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  freezeOnceVisible: boolean
): IntersectionObserverEntry | undefined => {
  const [entry, setEntry] = useState<IntersectionObserverEntry>();
  const frozen = entry?.isIntersecting && freezeOnceVisible;
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    setEntry(entry);
  };

  useEffect(() => {
    const element = elementRef?.current;
    if (frozen || !element) return;
    const observer = new IntersectionObserver(updateEntry);
    observer.observe(element);
    return () => observer.disconnect();
  }, [elementRef, frozen]);

  return entry;
};

export default useIntersectionObserver;
