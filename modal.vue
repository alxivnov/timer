<template>
	<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="timer" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h1 class="modal-title font-weight-bold">Timer</h1>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<h1 id="timer"></h1>
					<h2 id="label"></h2>
				</div>
				<div class="modal-footer">
					<btn fas="stop" btn-style="secondary" data-dismiss="modal" onclick="stop()"></btn>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: [
	]
}
</script>