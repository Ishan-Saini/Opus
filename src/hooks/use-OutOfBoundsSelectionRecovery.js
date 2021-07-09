import { useLayoutEffect } from 'react';

const useOutOfBoundsSelectionRecovery = (inFocus) => {
  useLayoutEffect(() => {
    if (!inFocus) {
      return;
    }
    const handleOutsideMouseRelease = (e) => {
      const vw = document.getElementById('editorContainer').clientWidth || 0;
      const vh = document.getElementById('editorContainer').clientHeight || 0;
      const pos = document
        .getElementById('editorContainer')
        .getBoundingClientRect();

      const isOutOfBounds =
        !(e.pageX > pos.left && e.pageX < pos.right) ||
        !(e.pageY > pos.top && e.pageY < pos.bottom);

      if (isOutOfBounds) {
        console.log(pos.left, pos.top, pos.right, pos.bottom);
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
