<template>
	<div id="proc_index" class="contentPart">
    <h1>Demo...</h1>
    <a-button @click="openDesigner()">页面设计器</a-button>
  </div>
</template>

<script>
export default {
	name: "ProcIndex",
	data() {
		return {
      testData: 0,
		};
	},
	methods: {
    openDesigner(){
      window.open('#/n/designer')
    }
	},
	mounted() {
	}
};
</script>

<style lang="scss" scope>
</style>
