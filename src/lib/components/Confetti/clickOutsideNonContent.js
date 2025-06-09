export function clickOutsideNonContent(node, callback) {
	function handleClick(event) {
		const target = event.target;

		// If target is an image or SVG
		if (target instanceof HTMLImageElement || target instanceof SVGElement) return;

		// If target has non-whitespace text content
		const textContent = target.textContent?.trim();
		if (textContent) return;

		// If it passed all conditions, call the callback
		callback(event);
	}

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
}