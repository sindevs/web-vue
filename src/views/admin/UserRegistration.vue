<template>
    <section class="section">
        <div class="container">
            <h1 class="title">ລົງທະບຽນ ຜູ້ໃຊ້ລະບົບ</h1>
            <UserForm @on-save-user="saveUser"/>
        </div>

    </section>
</template>

<script>
    import UserForm from "../../components/admin/UserForm";
    import RestAPI from "../../RestAPI";

    export default {
        name: "UserRegistration",
        components: {UserForm},
        data() {
            return {

            }
        },
        mounted() {
            console.log('user reg mounted')
            //this.vehicle =
        },
        methods: {
            saveUser(user) {
                //console.log(user)

                RestAPI.userRegistration(user)
                    .then(res => {
                        this.$swal({
                            text: 'ລົງທະບຽນສຳເລັດ',
                            type: 'success'
                        }).then(() => {
                            //location.reload()
                            this.$router.replace('/admin/users');
                        })
                    }).catch(err => {
                    var msg = "ມີຂໍ້ຜິດພາດ";
                    if(err.response) {
                        msg = err.response.data
                    }
                    this.$swal({
                        text: msg,
                        type: 'error'
                    })
                })


            }
        }
    }
</script>

<style scoped>

</style>