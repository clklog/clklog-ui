<template>
  <div>
    <FilterBar @setFilterBarParams="setFilterBarParams"></FilterBar>
    <equipmentTable
      ref="equipmentTable"
      @currentPage="currentPage"
    ></equipmentTable>
  </div>
</template>

<script>
import { FilterBar } from "@/layout/components";
import { getDeviceDetailApi } from "@/api/trackingapi/device";
import equipmentTable from "./chart-component/equipment-analysis-table";
import { copyObj } from "@/utils/copy";
import { percentage } from "@/utils/percent";
export default {
  components: {
    FilterBar,
    equipmentTable,
  },
  data() {
    return {
      filterBarParams: {},
      originData: null,
      pageNum: 1,
      pageSize: 10,
    };
  },
  computed: {
    project() {
      return this.$store.getters.project;
    },
    commonParams() {
      const { project } = this;
      return Object.assign({ project }, this.filterBarParams);
    },
  },
  watch: {
    commonParams() {
      this.getDeviceDetail();
    },
  },
  methods: {
    setFilterBarParams(val) {
      this.filterBarParams = copyObj(val);
    },
    getDeviceDetail(val) {
      this.pageNum = 1;
      let newvalue = copyObj(this.commonParams);
      if (val) {
        newvalue.pageNum = val.page;
        newvalue.pageSize = val.size;
        this.pageNum = val.page;
        this.pageSize = val.size;
      } else {
        newvalue.pageNum = this.pageNum;
        newvalue.pageSize = this.pageSize;
        this.$refs.equipmentTable.initCurrentPage()
      }
      getDeviceDetailApi(newvalue).then((res) => {
        if (res.code == 200) {
          this.$refs.equipmentTable.equipmentTableEvent(res.data);
        }
      });
    },
    currentPage(val) {
      this.getDeviceDetail(val);
    },
  },
};
</script>

<style lang="scss" scoped></style>
