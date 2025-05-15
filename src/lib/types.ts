export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string
	description: string
	author: string
	slug: string
	image: string
	date: string
	tags: string[]
	categories: Categories[]
	published: boolean
}
