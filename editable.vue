<template functional>
	<p
		contenteditable="true"
		class="w-100"
		style="outline: 0px solid transparent; white-space: pre-wrap;"

		v-bind="data.attrs"

		:id="data.attrs && data.attrs.id || data.model && data.model.expression"
		:name="data.attrs && data.attrs.name || data.model && data.model.expression"
	>{{ props.value }}</p>
</template>

<script>
export default {
	props: [
		'value'
	]
}
</script>