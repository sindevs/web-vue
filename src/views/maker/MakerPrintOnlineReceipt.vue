<template>
  <section class="section">
    <div class="container">
      <h1 class="title no-print">ພິມໃບຮັບຊໍາລະໃຫ້ ຊ່ອງທາງ Online</h1>
      <div class="no-print">
        <div class="columns">
          <div class="column">
            <div class="box">
              <b-field>
                <b-input
                  v-model.number="sn"
                  expanded
                  placeholder="ປ້ອນເລກ SN"
                  @keyup.enter.native="search()"
                />
                <div class="control">
                  <button
                    class="button is-primary"
                    :disabled="!sn || sn.length === 0"
                    @click="search()"
                  >ຄົ້ນຫາ</button>
                </div>
                <div class="control" v-if="sn && form">
                  <button class="button is-info" @click="print()">
                    <font-awesome-icon icon="print"></font-awesome-icon>ພິມ
                  </button>
                </div>
              </b-field>
            </div>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column">
          <Receipt :form="form"/>
        </div>
      </div>
      <div class="print-only">
        <div class="columns">
          <div class="column">            
            <div style="height: 3px; border-bottom: 2px dashed black; margin-bottom: 5px"></div>
            <Receipt :form="form"/>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import RestAPI from "../../RestAPI";
import Receipt from "../../components/Receipt";
export default {
  components: { Receipt },
  data() {
    return {
      sn: null,
      form: null
    };
  },
  methods: {
    search() {
      if (this.sn) {
        RestAPI.getFormBySn(this.sn).then(res => {
          this.form = res["data"]["form"];
        });
      }
    },
    print() {
      window.print();
    }
  }
};
</script>
