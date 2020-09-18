<template>
    <div>
        <table class="table is-striped is-narrow is-fullwidth is-bordered is-hoverable">
            <tbody>
            <tr>
                <td>ເລກ SN <strong>{{sticker.seq_no}}</strong></td>
                <td>ສົກປ <strong>{{sticker.tax_year}}</strong></td>
                <td>ວັນທີຊຳລະ <strong>{{sticker.payment_date}}</strong></td>


            </tr>
            <tr>
                <td>ຈຳນວນເງິນ</td>
                <td>{{sticker.tax_amt | formatNumberLocal}}</td>
                <td>ຄ່າປັບໄໝ</td>
                <td>{{sticker.fine_amt | formatNumberLocal}}</td>

                <td>ວິທີການຊຳລະ</td>
                <td>{{sticker.payment_type}}/{{sticker.payment_acc}}</td>
            </tr>
            <tr>
                <td>ພິມແລ້ວ?</td>
                <td>
                    <b-tag class="is-primary" v-if="sticker.is_printed === 0">ຍັງບໍ່ໄດ້ພິມ</b-tag>
                    <b-tag v-else>ພິມແລ້ວ</b-tag>
                </td>
                <td>ຍີ່ຫໍ້</td>
                <td>{{sticker.make}}</td>
                <td>ລຸ້ນ</td>
                <td>{{sticker.model}}</td>

            </tr>
            <tr>
                <td>ປະເພດລົດ</td>
                <td>{{sticker.vehicletype}}</td>
            </tr>
            <tr>
                <td>ເລກຈັກ</td>
                <td>{{sticker.engine_no}}</td>
                <td>ເລກຖັງ</td>
                <td>{{sticker.chassis_no}}</td>
                <td>ຄວາມແຮງ</td>
                <td>{{sticker.cc}}</td>

            </tr>
            <tr>
                <td>ການນຳໃຊ້</td>
                <td>{{sticker.category_id}}</td>
                <td>ນ້ຳໜັກ</td>
                <td>{{sticker.weight}}</td>
                <td>ບ່ອນນັ່ງ</td>
                <td>{{sticker.seats}}</td>

            </tr>
            <tr>
                <td>ຜູ້ຊຳລະ</td>
                <td colspan="2">{{sticker.narative}}</td>
                <td>ພະນັກງານ/ຊ່ອງທາງການຊຳລະ</td>
                <td colspan="2"><b-taglist><b-tag>{{sticker.user_id}}</b-tag><b-tag> {{sticker.payment_channel}} </b-tag><b-tag>{{sticker.agentid}}</b-tag></b-taglist> </td>
            </tr>
            </tbody>
        </table>

    </div>
</template>
<script>
    import BTaglist from "buefy/src/components/tag/Taglist";
    export default {
        name: 'StickerInfo',
        components: {BTaglist},
        props: {
            sticker:
                {
                    type: Object,
                    required: true
                }

        },
    }
</script>
<style scoped>
    td {
        white-space: nowrap;
    }
</style>
