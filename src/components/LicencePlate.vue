<template>
  <div class="license-plate-container">
    <div v-if="type_id == 0">
      <table class="vlicense vlicense-police no-print">
        <tbody>
          <tr>
            <td style="text-align: center;padding: 0 0.5em">
              <div style="font-size: 2em;margin: 0.3em">
                <u style="font-size: 60%;vertical-align: top;padding-right: 2px">
                  {{license_no.replace(/^([ກ-ຮ]+)(.*)$/gi,
                  '$1')}}
                </u>
                <span class="license-army">{{ license_no.substr(3) }}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="getPlate" class="has-text-centered no-print">{{getPlate.name}}</p>
    </div>
    <div v-if="type_id == 9">
      <table class="vlicense vlicense-army no-print">
        <tbody>
          <tr>
            <td style="text-align: center;padding: 0 0.5em">
              <div style="font-size: 2em;margin: 0.3em">
                <u style="font-size: 60%;vertical-align: top;padding-right: 2px">
                  {{license_no.replace(/^([ກ-ຮ]+)(.*)$/gi,
                  '$1')}}
                </u>
                <span class="license-army">{{license_no.substr(2)}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="getPlate" class="has-text-centered no-print">{{getPlate.name}}</p>
    </div>
    <div v-if="type_id == 8">
      <table class="vlicense vlicense-company100 no-print">
        <tbody>
          <tr>
            <td style="text-align: center;padding: 0 0.5em">
              <div class="province">{{ getProvince.name }}</div>
              <div class="license" style="font-size: 2em;">{{fmt_licence_no}}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="getPlate" class="has-text-centered no-print">{{getPlate.name}}</p>
    </div>
    <div v-if="type_id != 0 && type_id != 8 && type_id != 9">
      <table class="vlicense no-print" :class="'vlicense-' + getPlate.class ">
        <tbody>
          <tr>
            <td style="text-align: center;padding: 0 0.5em">
              <div class="province">{{ getProvince.name }}</div>
              <div class="license" style="font-size: 2em;">{{fmt_licence_no}}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-if="getPlate" class="has-text-centered no-print">{{getPlate.name}}</p>
    </div>

    <div class="print-only">
      <b-tag>{{ getProvince.name }}</b-tag>
      <b-tag>{{license_no.replace(/^([ກ-ຮ]+)(.*)$/gi, '$1')}} {{ license_no.substr(2) }}</b-tag>
      <b-tag>{{getPlate.name}}</b-tag>
    </div>
  </div>
</template>
<script>
import { get } from "vuex-pathify";
import BTag from "buefy/src/components/tag/Tag";

export default {
  name: "LicencePlate",
  components: { BTag },
  props: {
    province_id: {
      type: Number,
      required: true
    },
    license_no: {
      type: String,
      required: true
    },
    type_id: {
      type: Number,
      required: true
    }
  },
  computed: {
    provinces: get("provinces"),
    purposeTypes: get("vehiclePurposes"),
    fmt_licence_no() {
      return this.license_no.replace(/^([ກ-ຮ]+)(.*)$/gi, "$1 $2");
    },
    getPlate() {
      let inputCode = this.type_id;
      let plate = this._.find(this.purposeTypes, o => {
        return o.platetypeid === inputCode;
      });
      return plate;
    },
    getProvince() {
      let inputCode = this.province_id;
      let pro = this._.find(this.provinces, o => {
        return o.provinceid === inputCode;
      });
      return pro;
    }
  }
};
</script>
<style scoped>
.vlicense {
  border: 2px solid;
  width: 150px !important;
  margin: 0 auto;
  font-weight: bold;
  border-radius: 5px;
  margin-top: 1em;
  white-space: nowrap;
}

.vlicense tbody {
  cursor: pointer;
}

.vlicense tbody:hover {
  cursor: pointer;
}

.vlicense-army,
.vlicense-police {
  border-color: #ffffff;
  background-color: #d50703;
}

.vlicense-army td,
.vlicense-police td {
  color: #ffffff;
  background-color: #d50703;
  border-radius: 2px;
}

.vlicense-goverment {
  border-color: #2222ff;
  background-color: #ffffff;
}

.vlicense-goverment td {
  color: #ffffff;
  background-color: #2222ff;
  border-radius: 2px;
}

.vlicense-foreigner {
  border-color: #10a2ff;
  background-color: #fcba0b;
}

.vlicense-foreigner td {
  background-color: #fcba0b;
  color: #10a2ff;
  border-radius: 2px;
}

.vlicense-company100 {
  border-color: #000000;
  background-color: #ffffff;
  color: #000000;
}

.vlicense-company1 {
  border-color: #10a2ff;
  background-color: #ffffff;
  color: #10a2ff;
}

.vlicense-private {
  border-color: #000000;
  background-color: #fcba0b;
  border-radius: 2px;
}

.print-only {
  display: none;
}

@media print {
  .print-only {
    display: inline-block;
  }

  .no-print {
    display: none !important;
  }
}
</style>
