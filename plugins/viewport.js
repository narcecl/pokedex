import Vue from 'vue';

Vue.directive('viewport', {
	inserted: (el, binding, vnode) => {
		// Lista de eventos para ejecutar la función
		
		if( typeof binding.value !== 'function' && !el.className.includes('fade-child') ){
			el.classList.add('inanimate');
		}

		const events = ['DOMContentLoaded', 'resize', 'scroll'];
		const isInViewport = () => {
			// Obtenemos el elemento y lo comparamos con la posición de la ventana
			const { top, bottom } = el.getBoundingClientRect();
			const vHeight = (window.innerHeight || document.documentElement.clientHeight);
			const offset = 150;
			// Retornamos el resultado
			return ( (top > 0 || bottom > 0) && (top + offset) < vHeight);
		};

		const handleEvent = () => {
			if( isInViewport() ){
				// Si el elemento esta en el viewport continuamos

				const animation = el.dataset.animation; // Dataset para la animación
				const delay = ( el.dataset.delay ) ? parseInt(el.dataset.delay) : 0; // Dataset para el delay
				const childDelay = 300; // Delay de los elementos en cadena
				let ready = false;

				if( binding.value ){
					// Si tiene callback lo ejecutamos
					binding.value();
					ready = true;
				}

				if( animation ){
					// Si tiene definida una animacion
					setTimeout( () => {
						// Removemos la clase inactiva por defecto
						el.classList.remove('inanimate');
						// Asignamos la animaciones
						el.classList.add('animated');
						el.classList.add(`animate__${animation}`);
						// Eliminamos los dataset
						delete el.dataset.animation;
						delete el.dataset.delay;
						ready = true;
					}, delay);
				}

				if( el.className.includes('fade-child') ){
					// En caso de que el elemento tenga nodos hijos
					setTimeout(() => {
						// Obtenemos todos los hijos
						const children = el.querySelectorAll('.child');

						children.forEach((item, index) => {
							// Recorremos y con un delay mostramos uno por uno
							setTimeout(() => {
								item.classList.add('animated');

								if( index === children.length -1 ){
									// Si es el ultimo item agregamos las nuevas clases
									setTimeout(() => {
										el.classList.remove('fade-child');
										el.classList.add('faded-child');
										delete el.dataset.delay;
										ready = true;
									}, childDelay);
								}
								
							}, childDelay * index);
						});
					}, (delay || childDelay) );
				}

				const readyInterval = setInterval(() => {
					if( ready ){
						clearInterval(readyInterval);

						events.forEach((item) => {
							// Una vez que todo esté completo eliminamos los event listeners
							document.removeEventListener(item, handleEvent);
						});
					}
				}, 1);
			}
		};

		const init = () => {
			// Otorgamos los event listener al insertarse
			events.forEach((item) => {
				document.addEventListener(item, handleEvent);
			});

			// Iniciamos
			handleEvent();
		};

		const loaded = setInterval(() => {
			if( vnode.context.$store.state.loading ){
				// Esperamos a que el loader finalice para iniciar
				clearInterval(loaded);
				init();
			}
		}, 100);
	}
});