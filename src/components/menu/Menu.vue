<template>
    <div class="no-print">
        <div v-if="!hideMenu">
            <ComMakerMenu v-if="roleid == 'MAKER'"/>
			<ComAdminMenu v-if="roleid == 'ADMIN'"/>
            <ComCheckerMenu v-if="roleid == 'CHECKER'"/>
        </div>
    </div>
</template>

<script>
	import {get} from "vuex-pathify";
	import ComMakerMenu from "./ComMakerMenu";
	import ComCheckerMenu from "./ComCheckerMenu";
	import ComAdminMenu from "./ComAdminMenu";
	export default {
		name: "Menu",
		components: {ComAdminMenu, ComMakerMenu, ComCheckerMenu},
		computed: {
			roleid: get("session@roleid"),
			hideMenu() {
				let resolved = this.$router.resolve(this.$route.path)
				return resolved.route.name === '404'
			}
		}
	}
</script>

<style scoped>

</style>