<template>
  <div>
    <div class="search_wrappy public-hoverItem">
      <div class="search_table">
        <span class="public-firstHead">用户列表</span>
        <div class="setTable">
          <el-table
            border
            :data="userListData"
            :header-cell-style="{
              textAlign: 'center',
              background: '#f7fafe  ',
            }"
            class="public-radius"
            :cell-style="{ textAlign: 'center' }"
            style="width: 100%; margin-top: 12px; height: 98%"
            @sort-change="sortChange($event)"
          >
            <el-table-column
              :show-overflow-tooltip="true"
              style="cursor: pointer !important"
              prop="distinctId"
              label="访客ID"
              width="450"
            >
              <template slot-scope="scope">
                <div
                  style="
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    cursor: pointer;
                  "
                  @click="handleCellClick(scope.row.distinctId)"
                >
                  <div style="overflow: hidden; text-overflow: ellipsis">
                    {{ scope.row.distinctId }}
                  </div>
                  <div class="el-icon-view" style="color: #2c7be5"></div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="visitorType"
              label="访客类型"
              sortable="custom"
            >
              <template slot-scope="scope">
                <div
                  @click="handleCellClick(scope.row.distinctId)"
                  style="
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ scope.row.visitorType }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="pv" label="浏览量" sortable="custom">
              <template slot-scope="scope">
                <div
                  @click="handleCellClick(scope.row.distinctId)"
                  style="
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ scope.row.pv }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="visitCount"
              label="访问次数"
              sortable="custom"
            >
              <template slot-scope="scope">
                <div
                  @click="handleCellClick(scope.row.distinctId)"
                  style="
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ scope.row.visitCount }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="avgPv"
              label="平均访问页数"
              sortable="custom"
            >
              <template slot-scope="scope">
                <div
                  @click="handleCellClick(scope.row.distinctId)"
                  style="
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ averageRulesEvent(scope.row.avgPv) }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="visitTime"
              label="停留时长"
              sortable="custom"
            >
              <template slot-scope="scope">
                <div
                  @click="handleCellClick(scope.row.distinctId)"
                  style="
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ scope.row.visitTime }}
                </div>
              </template>
            </el-table-column>

            <el-table-column
              prop="latestTime"
              label="上次访问时间"
              sortable="custom"
            >
              <template slot-scope="scope">
                <div
                  @click="handleCellClick(scope.row.distinctId)"
                  style="
                    cursor: pointer;
                    overflow: hidden;
                    text-overflow: ellipsis;
                  "
                >
                  {{ scope.row.latestTime }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="block">
        <el-pagination
          next-text="下一页"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout=" total,sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <dialogs ref="child" />
  </div>
</template>

<script>
import dialogs from "@/layout/components/dialog/index";
import { averageRules } from "@/utils/percent";
import { formatTime } from "@/utils/format";
export default {
  components: {
    dialogs,
  },
  data() {
    return {
      pointValue: ["访客数", "访问次数"],
      chart: null,
      emptyList: "",
      options: [
        {
          value: "浏览量",
          label: "浏览量",
        },
        {
          value: "访客数",
          label: "访客数",
        },
        {
          value: "访问次数",
          label: "访问次数",
        },
        {
          value: "IP数",
          label: "IP数",
        },
        {
          value: "跳出率",
          label: "跳出率",
        },
      ],
      xData: [],
      yData: [],
      myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
      pv: [],
      uv: [],
      visitCount: [],
      ipCount: [],
      bounceRate: [],
      time: [],
      headLege: [],
      pointValue: ["浏览量", "访客数", "IP数"],
      disabledSelect: [],
      seriesdata: [],
      userListData: [],
      current: {
        size: 20,
        page: 1,
        sortName: null,
        sortOrder: null,
      },
      total: 0,
      pageSize: 20,
      currentPage: 1,
      cologStyle: this.$store.state.settings.cologStyle,
    };
  },
  mounted() {},
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    averageRulesEvent(num) {
      return averageRules(num);
    },
    sortChange(e) {
      if (e.order && e.order == "ascending") {
        // 降序
        this.current.sortName = e.prop;
        this.current.sortOrder = "asc";
        this.$emit("currentPage", this.current);
      } else if (e.order && e.order == "descending") {
        // 升序
        this.current.sortName = e.prop;
        this.current.sortOrder = "desc";
        this.$emit("currentPage", this.current);
      } else {
        this.current.sortName = null;
        this.current.sortOrder = null;
        this.$emit("currentPage", this.current);
      }
    },
    initCurrentPage() {
      this.currentPage = 1;
    },
    getChannelList(val) {
      this.pv = [];
      this.uv = [];
      this.visitCount = [];
      this.ipCount = [];
      this.bounceRate = [];
      this.xData = [];
      this.sourceChartList = val;
      this.sourceChartList.map((item) => {
        if (item.channel) {
          this.xData.push(item.channel);
        } else {
          this.xData.push(0);
        }
      });
      this.filterData(this.pointValue);
    },
    getUserListEvent(val) {
      this.userListData = val.rows;
      val.rows.map((item) => {
        if (item.visitTime || item.visitTime == 0) {
          item.visitTime = formatTime(Math.floor(item.visitTime));
        }
      });
      this.total = val.total;
    },
    handleCellClick(val) {
      this.$refs.child.callMethod(val);
    },

    // 切换事件
    changeChartValue(e) {
      this.pv = [];
      this.uv = [];
      this.visitCount = [];
      this.ipCount = [];
      this.bounceRate = [];
      let result = [];
      for (let i = 0; i < this.options.length; i++) {
        result.push(this.options[i].label);

        if (e.length > 2) {
          this.disabledSelect = result.filter((item) => {
            return e.indexOf(item) == -1;
          });
        } else {
          this.disabledSelect = [];
        }
      }
      this.filterData(this.pointValue);
    },
    initChartValue() {
      let result = [];
      for (let i = 0; i < this.options.length; i++) {
        result.push(this.options[i].label);
        if (this.pointValue.length > 2) {
          this.disabledSelect = result.filter((item) => {
            return this.pointValue.indexOf(item) == -1;
          });
        } else {
          this.disabledSelect = [];
        }
      }
    },
    filterData(val) {
      const { pv, uv, visitCount, ipCount, bounceRate } = this;
      if (val.includes("浏览量")) {
        this.sourceChartList.map((item) => {
          if (item.visitorChannel.pv) {
            return pv.push(item.visitorChannel.pv);
          } else {
            pv.push(0);
          }
        });
      } else {
        this.pv = [];
      }
      if (val.includes("访客数")) {
        this.sourceChartList.map((item) => {
          if (item.visitorChannel.uv) {
            return uv.push(item.visitorChannel.uv);
          } else {
            uv.push(0);
          }
        });
      } else {
        this.uv = [];
      }
      if (val.includes("IP数")) {
        this.sourceChartList.map((item) => {
          if (item.visitorChannel.ipCount) {
            return ipCount.push(item.visitorChannel.ipCount);
          } else {
            ipCount.push(0);
          }
        });
      } else {
        this.ipCount = [];
      }
      if (val.includes("访问次数")) {
        this.sourceChartList.map((item) => {
          if (item.visitorChannel.visitCount) {
            return visitCount.push(item.visitorChannel.visitCount);
          } else {
            visitCount.push(0);
          }
        });
      } else {
        this.visitCount = [];
      }

      if (val.includes("跳出率")) {
        this.sourceChartList.map((item) => {
          if (item.visitorChannel.bounceRate) {
            return bounceRate.push(item.visitorChannel.bounceRate);
          } else {
            bounceRate.push(0);
          }
        });
      } else {
        this.bounceRate = [];
      }
      let seriesdata = [
        {
          type: "bar",
          data: this.pv,
          barWidth: 20,
          barGap: "100%", //柱图间距
          name: "浏览量",
          label: {
            show: true,
            position: "top",
          },
          itemStyle: {
            color: this.cologStyle.$pv,
          },
        },
        {
          type: "bar",
          data: this.uv,
          barWidth: 20,
          name: "访客数",
          label: {
            show: true,
            position: "top",
          },
          itemStyle: {
            color: this.cologStyle.$uv,
          },
        },
        {
          type: "bar",
          data: this.visitCount,
          barWidth: 20,
          name: "访问次数",
          label: {
            show: true,
            position: "top",
          },
          itemStyle: {
            color: this.cologStyle.$visitCount,
          },
        },
        {
          type: "bar",
          data: this.ipCount,
          barWidth: 20,
          name: "IP数",
          label: {
            show: true,
            position: "top",
          },
          itemStyle: {
            color: this.cologStyle.$ipCount,
          },
        },
        {
          type: "bar",
          data: this.bounceRate,
          barWidth: 20,
          name: "跳出率",
          label: {
            show: true,
            position: "top",
          },
          itemStyle: {
            color: this.cologStyle.$bounceRate,
          },
        },
      ];
      for (let i = 0; i < seriesdata.length; i++) {
        if (!this.pointValue.includes(seriesdata[i].name)) {
          seriesdata.splice(i--, 1);
        }
      }
    },
    handleSizeChange(val) {
      this.current.size = val;
      this.$emit("currentPage", this.current);
    },
    handleCurrentChange(val) {
      this.current.page = val;
      this.$emit("currentPage", this.current);
    },
  },
};
</script>
<style lang="scss" scoped>
@import "~@/styles/components/custom-select.scss";
::v-deep {
  @import "~@/styles/components/el-pagination.scss";
  .el-table__header {
    // 使表格兼容safari，不错位,表头宽度较小
    width: 100%;
    table-layout: fixed !important;
  }
  .el-table__body {
    width: 100%;
    // 使表格兼容safari，不错位
    table-layout: fixed !important;
  }
}
.trafficHead {
  font-size: 16px;
  font-weight: 600;
  color: #4d4d4d;
  padding: 0px 30px 20px;
}
img {
  width: 11.44px;
  height: 11.44px;
  margin-left: 12px;
  cursor: pointer;
}
.trendHead {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 33px;
  color: #4d4d4d;
  .iconFlag {
    position: absolute;
    right: 13px;
    top: 19px;
    color: #acaaaa;
    font-size: 16px;
    cursor: pointer;
  }
}
.chartsIcon {
  margin: 20px;
  // width: calc(100% -20px);
  min-height: 300px;
  display: flex;
  justify-content: space-between;
  .chartLeft {
    border-radius: 6px;
    background-color: #fff;
    padding: 15px;
    width: 100%;
    min-height: 400px;
    .point {
      padding-right: 10px;
    }
  }
}

// table表格
.search_wrappy {
  border-radius: 6px;
  position: relative;
  margin: 20px;
  background-color: #fff;
  min-height: 530px;
  padding: 22px;
}
.search_table {
  height: 100%;
  // padding: 18px 22px;
}
</style>
