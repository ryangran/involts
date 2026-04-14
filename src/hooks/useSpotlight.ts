import { useCallback } from 'react';

/**
 * Retorna um onMouseMove que atualiza --mouse-x e --mouse-y no elemento,
 * ativando o efeito spotlight via CSS.
 */
export const useSpotlight = () => {
  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mouse-x', `${x}%`);
    el.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  return { onMouseMove };
};
