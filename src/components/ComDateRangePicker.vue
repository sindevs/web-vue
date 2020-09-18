<template>
    <b-field grouped>
        <b-field>
            <div class="control">
                <button class="button">ຈາກວັນທີ</button>
            </div>
            <b-datepicker
                    :date-formatter="BcelDateFormatter"
                    :date-parser="BcelDateParser"
                    @input="onStartDateChanged"
                    v-model="mystartdate"
                    editable
                    placeholder="ຈາກວັນທີ"
            >
            </b-datepicker>
        </b-field>
        <b-field>
            <div class="control">
                <button class="button">ເຖິງວັນທີ</button>
            </div>
            <b-datepicker
                    :date-formatter="BcelDateFormatter"
                    :date-parser="BcelDateParser"
                    @input="onEndDateChanged"
                    v-model="myenddate"
                    editable
                    placeholder="ເຖິງວັນທີ"
            >
            </b-datepicker>
        </b-field>
        <b-field>
            <div class="buttons">
                <button @click="buttonClick" class="button is-primary is-block">
                    <font-awesome-icon icon="search"></font-awesome-icon>
                    {{buttonText}}
                </button>
                <button @click="print()" class="button is-warning is-block" v-if="isshowprint">
                    <font-awesome-icon icon="print"></font-awesome-icon>
                    ພິມ
                </button>
            </div>
        </b-field>
    </b-field>
</template>

<script>

    export default {
        name: "ComDateRangePicker",
        props: {
            startdate: Date,
            enddate: Date,
            buttonText: String,
            buttonClick: Function,
            isshowprint: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                mystartdate: new Date(),
                myenddate: new Date()
            }
        },
        methods: {
            onStartDateChanged(date) {
                this.$emit('input-startdate', date)
            },
            onEndDateChanged(date) {
                this.$emit('input-enddate', date)
            },
            print() {
                window.print();
            }
        },
        mounted() {
            this.mystartdate = this.startdate;
            this.myenddate = this.enddate
        }
    };
</script>

<style scoped>
</style>
