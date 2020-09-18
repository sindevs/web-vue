import sha256 from "js-sha256";
import store from "./store";
import _ from "lodash";
import moment from "moment";

export default {
  methods: {
    sha2: function(text) {
      let hash2 = sha256.create();
      hash2.update(text);
      return hash2.hex();
    },
    BcelDateFormatter(date, format = "DD/MM/YYYY") {
      return new moment(date).format(format);
    },
    BcelDateParser(date, format = "DD/MM/YYYY") {
      return new moment(date, format).toDate();
    },

    fieldTouched(fieldname) {
      const field = this.$validator.fields.find({ name: fieldname });
      //console.log(field)
      if (field == undefined) return false;
      return field.flags.touched;
    },
    ccRangeByCat(cat) {``
      const t = `${cat}`;
      switch (t) {
        case "101":
          return "< 110cc";
        case "102":
          return "111cc-150cc";
        case "103":
          return "151cc-200cc";
        case "104":
          return "> 200cc";
        case "201":
          return "< 1000cc";
        case "202":
          return "1.001cc-1.600cc";
        case "203":
          return "1.601cc-2.000cc";
        case "204":
          return "2.001cc-2.500cc";
        case "205":
          return "2.501cc-3.000cc";
        case "206":
          return "3.001cc-4.000cc";
        case "207":
          return "4.001cc-5.000cc";
        case "208":
          return "> 5.000cc";
        case "301":
          return "< 2.501cc";
        case "302":
          return "2.501cc-5.000cc";
        case "303":
          return "> 5.000cc";
        case "304":
          return "> 5.000cc";
        case "305":
          return "> 5.000cc";
        case "401":
          return "---";
        case "402":
          return "< 2.501cc";
        case "403":
          return "2.501c-5.000cc";
        case "404":
          return "> 5.000cc";
        default:
          return "***";
      }
    },
    seatRangeByCat(cat) {
      const t = `${cat}`;
      switch (t) {
        case "402":
          return "< 10 ບ່ອນນັ່ງ";
        case "403":
          return "10 - 35 ບ່ອນນັ່ງ";
        case "404":
          return "> 35 ບ່ອນນັ່ງ";
        default:
          return "***";
      }
    },
    weightRangeByCat(cat) {
      const t = `${cat}`;
      switch (t) {
        case "301":
          return "<= 3,5 ໂຕນ";
        case "302":
          return "3,5 - 15 ໂຕນ";
        case "303":
          return "15 - 30 ໂຕນ";
        case "304":
          return "30 - 50 ໂຕນ";
        case "305":
          return "> 50 ໂຕນ";
        default:
          return "***";
      }
    }
  },
  filters: {
    agentName(id) {
      switch (id) {
        case "BCEL":
          return "ທະນາຄານການຄ້າຕ່າງປະເທດລາວມະຫາຊົນ";
        case "LCN":
          return "ທະນາຄານ ລາວຈີນ";
        default:
          return id;
      }
    },
    formTypeName(typeid) {
      switch (typeid) {
        case "VEREG":
          return "ລົງທະບຽນ";
        case "CHANGELICENSE":
          return "ປ່ຽນປ້າຍ";
        case "PAYMENT":
          return "ຊຳລະ";
        case "CANCELPAYMENT":
          return "ຍົກເລີກການຊຳລະ";
        case "REPRINT":
          return "ຂໍພິມຄືນ";
        default:
          return typeid;
      }
    },
    provinceName(id) {
      const x = _.find(store.get("provinces"), o => o.provinceid === id);
      console.log(x);
      return x ? x.name : id;
    },
    formStatusName(id) {
      switch (id) {
        case 0:
          return "ລຶບ";
        case 1:
          return "ລໍຖ້າອະນຸມັດ";
        case 2:
          return "ລໍຖ້າອະນຸມັດ";
        case 3:
          return "ອະນຸມັດແລ້ວ";
        case 4:
          return "ປະຕິເສດ";
        default:
          return id;
      }
    },
    branchname(id) {
      const x = _.find(store.get("branches"), o => o.branchid === id);
      console.log(x);
      return x ? x.branchname : id;
    },
    unitname(id) {
      const x = _.find(store.get("units"), o => o.unitid === id);
      console.log(x);
      return x ? x.unitname : id;
    },
    vehicleTypeName(id) {
      const x = _.find(store.get("vehicleTypes"), o => o.vehicletype_id === id);
      return x ? x.vehicletype : id;
    },
    purposeName(id) {
      const x = _.find(store.get("vehiclePurposes"), o => o.platetypeid === id);
      return x ? x.name : id;
    },
    purposeDesc(id) {
      const x = _.find(store.get("vehiclePurposes"), o => o.platetypeid === id);
      return x ? x.narrative : id;
    },
    vehicleCategoryName(id) {
      const x = _.find(
        store.get("vehicleCategories"),
        o => o.category_id === id
      );
      return x ? x.category_name : id;
    },
    formatNumberLocal(number) {
      return isNaN(parseFloat(number))
        ? "0"
        : parseFloat(number).toLocaleString("de-DE");
    },
    laoNumberString(n) {
      // var leveltext = ['', 'ສິບ', 'ຮ້ອຍ', 'ພັນ', 'ໝື່ນ', 'ແສນ']
      let leveltext = ["", "ສິບ", "ຮ້ອຍ", "ພັນ", "ໝື່ນ", "ແສນ"];
      let numtext = [
        "",
        "ໜຶ່ງ",
        "ສອງ",
        "ສາມ",
        "ສີ່",
        "ຫ້າ",
        "ຫົກ",
        "ເຈັດ",
        "ແປດ",
        "ເກົ້າ"
      ];

      let res = "";

      let num = n + "";
      let et = false;
      for (let i = 0; i < num.length; i++) {
        let val = parseInt(num.substr(i, 1));
        let pos = num.length - i - 1;
        if (val > 0) {
          if (val === 1 && pos % leveltext.length === 1) {
            res += "ສິບ";
          } else if (val === 2 && pos % leveltext.length === 1) {
            res += "ຊາວ";
          } else if (val === 1 && pos % leveltext.length === 0 && et) {
            res += "ເອັດ";
          } else {
            res += numtext[val] + leveltext[pos % leveltext.length];
            et = false;
          }
        }
        if (pos % leveltext.length === 0 && pos > 0) {
          res += "ລ້ານ";
        }
        if (val !== 0 && pos % leveltext.length === 1) {
          et = true;
        }
      }
      return res ? res : "-";
    }
  }
};
