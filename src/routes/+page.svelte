<script lang="ts">
	import backgroundImage from '$lib/landscape.webp';
	import tumbleweed from '$lib/tumbleweed.webp';
	import rocks from '$lib/rocksLandscape.webp';
	import { onMount } from 'svelte';

	let email: string = '';

	onMount(() => {
		email = 'hello@rebricksdigtal.com';
	});
</script>

<svelte:head>
	<title>Rebricks Digital</title>
</svelte:head>

<main class="relative h-[100dvh] w-full overflow-hidden">
	<img
		src={backgroundImage}
		alt="background"
		class="absolute inset-0 -z-50 h-full w-full object-cover object-bottom"
	/>
	<img
		src={rocks}
		alt="rocks overlay"
		class="absolute inset-0 z-50 h-full w-full object-cover object-bottom"
	/>
	<!-- Content -->
	<div class="absolute left-1/2 top-[12%] -translate-x-1/2">
		<!-- <img src={logo} alt="Rebricks Logo" /> -->

		<div class="mb-4 flex items-center justify-center gap-2 sm:gap-4 lg:gap-8">
			<svg
				class="aspect-square h-9 sm:h-12 lg:h-24"
				viewBox="0 0 100 100"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<mask id="path-1-inside-1_78_43" fill="white">
					<rect y="40" width="36" height="60" rx="5" />
				</mask>
				<!-- LEFT -->
				<rect
					y="40"
					width="36"
					height="60"
					rx="5"
					stroke="#000"
					stroke-width="18"
					mask="url(#path-1-inside-1_78_43)"
				/>
				<mask id="path-2-inside-2_78_43" fill="white">
					<rect width="100" height="36" rx="5" />
				</mask>
				<!-- TOP -->
				<rect
					width="100"
					height="36"
					rx="5"
					stroke="#000"
					stroke-width="18"
					mask="url(#path-2-inside-2_78_43)"
				/>
				<path
					d="M66.47 41.4681C68.4226 39.5155 71.5885 39.5155 73.5411 41.4682L98.5375 66.4646C100.49 68.4172 100.49 71.583 98.5375 73.5357L73.5411 98.5321C71.5884 100.485 68.4226 100.485 66.47 98.5321L41.4736 73.5357C39.5209 71.583 39.5209 68.4172 41.4736 66.4646L66.47 41.4681Z"
					fill="#000"
				/>
			</svg>

			<h1 class="whitespace-nowrap text-3xl font-semibold sm:text-5xl lg:text-8xl">
				Rebricks <span class="font-light">Digital</span>
			</h1>
		</div>
		<h2 class="mb-8 text-center text-xl font-semibold sm:text-2xl lg:text-4xl">
			Pardon the Dust—Magic in the Making
		</h2>
		<p class="text-center text-3xl">
			From custom websites to consulting, we build digital solutions that help you stand out and
			grow your business.
		</p>
	</div>

	<!-- Contact -->
	<p class="absolute bottom-8 right-8 z-50 text-2xl text-white">
		Say hi!

		<a href={'mailto:' + email} class="text-lime-500 font-bold">{email}</a>
	</p>

	<div>
		<img src={tumbleweed} alt="tumbleweed" class="tumbleweed" />
		<img src={tumbleweed} alt="tumbleweed" class="tumbleweed" />
		<img src={tumbleweed} alt="tumbleweed" class="tumbleweed" />

		<img src={tumbleweed} alt="tumbleweed" class="tumbleweed" />
		<img src={tumbleweed} alt="tumbleweed" class="tumbleweed" />
	</div>
</main>

<style>
	.b {
		background-color: red;
		opacity: 0.4;
		border-radius: 9999px;
	}
	.tumbleweed {
		position: absolute;
		bottom: 0;
		left: -5rem;
		width: 5rem;
		height: 5rem;
		background-size: cover;
		animation:
			jumping 1.5s infinite,
			rolling 5s linear infinite,
			rotating 2s linear infinite;
	}

	.tumbleweed:nth-child(2) {
		animation-delay: 1s;
		-webkit-animation-delay: 1s;
	}
	.tumbleweed:nth-child(3) {
		animation-delay: 3s;
		-webkit-animation-delay: 3s;
	}
	.tumbleweed:nth-child(4) {
		animation:
			jumping 3s infinite,
			rolling 10s linear infinite,
			rotating 1s linear infinite;
		animation-delay: 6s;
		-webkit-animation-delay: 6s;

		width: 2rem;
		height: 2rem;
		margin-bottom: 5rem;
	}
	.tumbleweed:nth-child(5) {
		animation:
			jumping 3s infinite,
			rolling 10s linear infinite,
			rotating 1s linear infinite;
		animation-delay: 8s;
		-webkit-animation-delay: 8s;

		width: 2rem;
		height: 2rem;
		margin-bottom: 5rem;
	}

	@keyframes jumping {
		0% {
			bottom: 0rem;
			animation-timing-function: ease-in;
		}
		25% {
			bottom: 3rem;
			animation-timing-function: ease-out;
		}
		50% {
			bottom: 1rem;
			animation-timing-function: ease-in;
		}
		75% {
			bottom: 3rem;
			animation-timing-function: ease-out;
		}
		100% {
			bottom: 0rem;
			animation-timing-function: ease-in;
		}
	}

	@keyframes rolling {
		0% {
			left: -5rem;
		}
		100% {
			left: 100%;
		}
	}

	@keyframes rotating {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
