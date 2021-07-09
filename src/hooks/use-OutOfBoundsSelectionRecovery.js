import { useLayoutEffect } from 'react';

const useOutOfBoundsSelectionRecovery = (inFocus) => {
  useLayoutEffect(() => {
    if (!inFocus) {
      return;
    }
    const handleOutsideMouseRelease = (e) => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0
      );
      const isOutOfBounds =
        Math.min(e.offsetX, e.offsetY) < 0 || e.offsetX > vw || e.offsetY > vh;
      if (isOutOfBounds) {
        const root = document.getElementById('root');
        const mouseEvent = new MouseEvent('mouseup', {
          clientX: Math.min(vw, Math.max(0, e.clientX)),
          clientY: Math.min(vh, Math.max(0, e.clientY)),
        });
        root.dispatchEvent(mouseEvent);
      }
    };
    document.addEventListener('mouseup', handleOutsideMouseRelease);

    return () => {
      document.removeEventListener('mouseup', handleOutsideMouseRelease);
    };
  }, [inFocus]);
};

export default useOutOfBoundsSelectionRecovery;
