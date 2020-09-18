<template>
    <div class="is-fullwidth">
        <div v-if="showInputForm">
            <b-field grouped>
                <b-field label="ຊື່ ແລະ ນາມສະກຸນ" expanded
                         :type="{'is-danger': errors.has('inputFullName'), 'is-success': !errors.has('inputFullName') && fieldTouched('inputFullName')}"
                         :message="errors.first('inputFullName')">
                    <b-input v-model="inputFullName" v-validate="'required'" name="inputFullName"></b-input>
                </b-field>

                <b-field label="ເບີໂທຕິດຕໍ່" expanded
                         :type="{'is-danger': errors.has('inputContactNo'), 'is-success': !errors.has('inputContactNo') && fieldTouched('inputContactNo')}"
                         :message="errors.first('inputContactNo')">
                    <b-input v-model="inputContactNo" v-validate="'required'" type="number" name="inputContactNo"  placeholder="020xxxxxxxx"></b-input>
                </b-field>

                <b-field label="ເພດ" expanded
                         :type="{'is-danger': errors.has('inputGender'), 'is-success': !errors.has('inputGender') && fieldTouched('inputGender')}"
                         :message="errors.first('inputGender')">
                    <b-select :class="{'is-danger': errors.has('inputGender'), 'is-success': !errors.has('inputGender') && fieldTouched('inputGender')}"
                              placeholder="ເລືອກເພດ" expanded
                              v-model="inputGender"
                              :ref="inputGender"
                              name="inputGender"
                              v-validate="'required'">
                        <option value="M">ເພດຊາຍ</option>
                        <option value="F">ເພດຍິງ</option>
                    </b-select>
                </b-field>

            </b-field>

            <b-field grouped>

                <b-field label="ຊື່ເຂົ້າໃຊ້ລະບົບ" expanded
                         :type="{'is-danger': errors.has('inputUserName'), 'is-success': !errors.has('inputUserName') && fieldTouched('inputUserName')}"
                         :message="errors.first('inputUserName')">
                    <b-input v-model="inputUserName" v-validate="'required'" name="inputUserName"></b-input>
                </b-field>

                <b-field label="ລະຫັດຜ່ານ" expanded
                         :type="{'is-danger': errors.has('inputPassword'), 'is-success': !errors.has('inputPassword') && fieldTouched('inputPassword')}"
                         :message="errors.first('inputPassword')">
                    <b-input v-model="inputPassword" v-validate="'required'" type="password" name="inputPassword"></b-input>
                </b-field>

                <b-field label="ຢືນຢັນລະຫັດຜ່ານ" expanded
                         :type="{'is-danger': errors.has('inputRePassword'), 'is-success': !errors.has('inputRePassword') && fieldTouched('inputRePassword')}"
                         :message="errors.first('inputRePassword')">
                    <b-input v-model="inputRePassword" v-validate="'required'" type="password" name="inputRePassword"></b-input>
                </b-field>



            </b-field>

            <b-field grouped>

                <b-field label="ສິດນຳໃຊ້" expanded
                         :type="{'is-danger': errors.has('inputUserRole'), 'is-success': !errors.has('inputUserRole') && fieldTouched('inputUserRole')}"
                         :message="errors.first('inputUserRole')">
                    <multiselect
                            :class="{'is-danger': errors.has('inputUserRole'), 'is-success': !errors.has('inputUserRole') && fieldTouched('inputUserRole')}"
                            placeholder="ສິດນຳໃຊ້"
                            v-model="inputUserRole"
                            label="rolename"
                            :ref="inputUserRole"
                            :options="roles"
                            name="inputUserRole"
                            v-validate="'required'"
                    >

                    </multiselect>
                </b-field>

                <b-field label="ສາຂາ" expanded
                         :type="{'is-danger': errors.has('inputBranch'), 'is-success': !errors.has('inputBranch') && fieldTouched('inputBranch')}"
                         :message="errors.first('inputBranch')">
                    <multiselect
                            :class="{'is-danger': errors.has('inputBranch'), 'is-success': !errors.has('inputBranch') && fieldTouched('inputBranch')}"
                            placeholder="ເລືອກສາຂາ"
                            v-model="inputBranch"
                            label="branchname"
                            :ref="inputBranch"
                            :options="getBranches"
                            name="inputBranch"
                            v-validate="'required'"
                    >
                    </multiselect>
                </b-field>

                <b-field label="ໜ່ວຍບໍລິການ" expanded
                         :type="{'is-danger': errors.has('inputUnit'), 'is-success': !errors.has('inputUnit') && fieldTouched('inputUnit')}"
                         :message="errors.first('inputUnit')">
                    <multiselect
                            :class="{'is-danger': errors.has('inputUnit'), 'is-success': !errors.has('inputUnit') && fieldTouched('inputUnit')}"
                            placeholder="ເລືອກສາຂາ"
                            v-model="inputUnit"
                            label="unitname"
                            :ref="inputUnit"
                            :options="filteredUnits"
                            name="inputUnit"
                            v-validate="'required'"
                    >
                    </multiselect>
                </b-field>

            </b-field>

            <b-field grouped position="is-right">
                <p class="control">
                    <button class="button is-primary" @click="onSaveClicked">ລົງທະບຽນ</button>
                </p>

            </b-field>


        </div>
    </div>
</template>

<script>

    import RestAPI from "../../RestAPI";
    import Multiselect from 'vue-multiselect';
    import {get} from 'vuex-pathify';

    export default {
        name: "UserForm",
        components: {Multiselect},
        computed: {
            getBranches: get('branches'),
            getUnits: get('units'),
            filteredUnits () {
                return this._.filter(this.getUnits, o => { return o.branchid === this.inputBranch.branchid})
            }
        },
        data() {
            return {
                roles:[],
                showInputForm: false,
                inputFullName: '',
                inputContactNo: '',
                inputGender: '',
                inputUserName:'',
                inputPassword: '',
                inputRePassword: '',
                inputUserRole: '',
                inputBranch: '',
                inputUnit: '',
            }
        },
        methods: {
            async onSaveClicked() {
                const isvalid = await this.$validator.validate();
                console.log(this.errors)
                if (!isvalid || this.errors.any()) {
                    this.$swal({
                        text: 'ກະລຸນາ ປ້ອນຂໍ້ມູນໃຫ້ຄົບຖ້ວນ',
                        type: 'error'
                    })
                    return;
                }

                if (this.inputPassword != this.inputRePassword) {
                    this.$swal({
                        text: 'ກະລຸນາ ກວດສອບລະຫັດຜ່ານ, ລະຫັດຜ່ານບໍ່ຄືກັນ',
                        type: 'error'
                    })
                    return;
                }
                const ve = {
                    userid: this.inputUserName,
                    password: this.sha2(this.inputPassword),
                    fullname: this.inputFullName,
                    unitid: this.inputUnit.unitid,
                    branchid: this.inputBranch.branchid,
                    agentid: this.inputBranch.agentid,
                    roleid: this.inputUserRole.roleid,
                    contactno: this.inputContactNo,
                    gender: this.inputGender,
                }

                this.$emit('on-save-user', ve)
            },

        },
        mounted() {
            this.showInputForm = true;
            RestAPI.getRoles().then(res => {
                this.roles = res.data
            })
        }
    }
</script>

<style scoped>
    .multiselect__placeholder, .multiselect {
        white-space: nowrap !important;
    }
</style>