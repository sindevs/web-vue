<template>
    <div class="section">
        <div class="container">
            <h1 class="title">Road Tax, ຍິນດີຕ້ອນຮັບ</h1>
            <h1 class="title is-5">{{fullname}}</h1>
            <h1 class="title is-5">{{branchid}} - {{branchid | branchname}}</h1>
         </div>
    </div>
</template>

<script>
	import {get} from 'vuex-pathify'


	export default {
		name: "home",
		components: {},
		computed: {
			branchid: get('session@branchid'),
			fullname: get('session@fullname'),
		},
		data() {
			return {

			}
		}
	};
</script>
