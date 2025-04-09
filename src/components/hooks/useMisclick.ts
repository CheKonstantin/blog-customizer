import { useEffect } from 'react';

type TUseMisclick = {
	isOpen: boolean;
	setClose: () => void;
	root: React.RefObject<HTMLElement>;
};
export function useMisclick({ isOpen, setClose, root }: TUseMisclick) {
	useEffect(() => {
		if (!isOpen) return;

        // ЗАКРЫВАЕМ ПО ЭСКЕЙПУ

        const closeEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setClose();
			}
		};

        // ЗАКРЫВАЕМ ПО МИСКЛИКУ

		function closeMisclick(event: MouseEvent) {
			const { target } = event;
			const isMisclick = target instanceof Node &&  root.current && !root.current.contains(target);
			if (isMisclick) {
				setClose();
			}
		}

		document.addEventListener('keydown', closeEscape);
		document.addEventListener('mousedown', closeMisclick);

		return () => {
			document.removeEventListener('keydown', closeEscape);
			document.removeEventListener('mousedown', closeMisclick);
		};
		
	}, [isOpen, setClose, root]);
}
