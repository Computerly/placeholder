<script module>
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import Button from "./ButtonStore.svelte";
	import { fn } from "storybook/test";

	// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
	// const variants = [
	//   "primary",
	//   "warning",
	//   "danger",
	//   "success",
	//   "solid",
	//   "outline",
	//   "ghost",
	//   "icon",
	//   "neutral",
	// ];
	const { Story } = defineMeta({
		title: "BricksUI/Button",
		component: Button,
		tags: ["autodocs"],
		argTypes: {
			disabled: {
				control: "boolean",
			},
		},
		args: {
			onclick: fn(),
		},
	});
</script>

<!-- More on writing stories with args: https://storybook.js.org/docs/writing-stories/args -->
<!-- <Story name={"solid"} args={{ label: "Button", variant: "solid" }} />
<Story name={"outline"} args={{ label: "Button", variant: "outline" }} />
<Story name={"ghost"} args={{ label: "Button", variant: "ghost" }} />
<Story name={"icon"} args={{ label: "Button", variant: "icon" }} />
<Story name={"fill"} args={{ label: "Button", variant: "fill" }} />
<Story name={"primary"} args={{ label: "Button", intent: "primary" }} />
<Story name={"warning"} args={{ label: "Button", intent: "warning" }} />
<Story name={"danger"} args={{ label: "Button", intent: "danger" }} />
<Story name={"success"} args={{ label: "Button", intent: "success" }} />
<Story name={"default"} args={{ label: "Button", intent: "default" }} /> -->

<Story name={"default"} args={{ label: "Button" }} />

<Story name={"solid-primary"} args={{ label: "Button", variant: "solid", intent: "primary" }} />
<Story name={"solid-warning"} args={{ label: "Button", variant: "solid", intent: "warning" }} />
<Story name={"solid-danger"} args={{ label: "Button", variant: "solid", intent: "danger" }} />
<Story name={"solid-success"} args={{ label: "Button", variant: "solid", intent: "success" }} />
<Story name={"solid-default"} args={{ label: "Button", variant: "solid", intent: "default" }} />

<Story name={"outline-primary"} args={{ label: "Button", variant: "outline", intent: "primary" }} />
<Story name={"outline-warning"} args={{ label: "Button", variant: "outline", intent: "warning" }} />
<Story name={"outline-danger"} args={{ label: "Button", variant: "outline", intent: "danger" }} />
<Story name={"outline-success"} args={{ label: "Button", variant: "outline", intent: "success" }} />
<Story name={"outline-default"} args={{ label: "Button", variant: "outline", intent: "default" }} />

<Story name={"ghost-primary"} args={{ label: "Button", variant: "ghost", intent: "primary" }} />
<Story name={"ghost-warning"} args={{ label: "Button", variant: "ghost", intent: "warning" }} />
<Story name={"ghost-danger"} args={{ label: "Button", variant: "ghost", intent: "danger" }} />
<Story name={"ghost-success"} args={{ label: "Button", variant: "ghost", intent: "success" }} />
<Story name={"ghost-default"} args={{ label: "Button", variant: "ghost", intent: "default" }} />

<Story name={"icon-primary"} args={{ label: "Button", variant: "icon", intent: "primary" }} />
<Story name={"icon-warning"} args={{ label: "Button", variant: "icon", intent: "warning" }} />
<Story name={"icon-danger"} args={{ label: "Button", variant: "icon", intent: "danger" }} />
<Story name={"icon-success"} args={{ label: "Button", variant: "icon", intent: "success" }} />
<Story name={"icon-default"} args={{ label: "Button", variant: "icon", intent: "default" }} />

<Story name={"fill-primary"} args={{ label: "Button", variant: "fill", intent: "primary" }} />
<Story name={"fill-warning"} args={{ label: "Button", variant: "fill", intent: "warning" }} />
<Story name={"fill-danger"} args={{ label: "Button", variant: "fill", intent: "danger" }} />
<Story name={"fill-success"} args={{ label: "Button", variant: "fill", intent: "success" }} />
<Story name={"fill-default"} args={{ label: "Button", variant: "fill", intent: "default" }} />
