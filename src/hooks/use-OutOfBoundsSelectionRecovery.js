import { useLayoutEffect } from 'react';

const useOutOfBoundsSelectionRecovery = (inFocus) => {
  useLayoutEffect(() => {
    if (!inFocus) {
      return;
    }
    const handleOutsideMouseRelease = (e) => {
      const pos = document
        .getElementById('editorContainer')
        .getBoundingClientRect();

      const isOutOfBounds =
        !(e.pageX > pos.left && e.pageX < pos.right) ||
        !(e.pageY > pos.top && e.pageY < pos.bottom);

      if (isOutOfBounds) {
        const root = document.getElementById('root');
        const mouseEvent = new MouseEvent('mouseup', {
          clientX: pos.left,
          clientY: pos.top,
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
