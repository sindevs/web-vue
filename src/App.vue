<template>
    <div id="app">
        <Menu/>
        <vue-progress-bar/>
        <router-view/>
    </div>
</template>

<script>
	import Menu from "./components/menu/Menu";

	export default {
		components: {Menu}
	}

</script>

<style lang="scss">
    .multiselect--above.is-danger {
        border: 1px solid #ff3860;
        border-radius: 5px;
    }

    .multiselect--above.is-success {
        border: 1px solid #23d160 !important;
        border-radius: 5px;
    }
    html, body {
        height: 100%;
        min-height: 100%;
    }

    #app {
        height: 100%;
    }

    .print-only {
        /*visibility: hidden;*/
        display: none;
    }
    @media print {

        @page { margin: 0.2cm 1cm 0 1cm; size: A4 portrait }
        .section {
            margin-top: 5px !important;
        }
        html, body {
            background: white;
            margin: 0px;
        }

        .print-only {
            /*visibility: visible;*/
            display: inherit;

        }

        .no-print {
            /* visibility: hidden;
             height: 0 !important;
             width: 0 !important;*/
            display: none;
        }

        .no-print-hide {
            display: none;
        }
        .print-only-hide {
            display: block;
        }
        th, td {
            white-space: nowrap;
        }
    }
</style>
