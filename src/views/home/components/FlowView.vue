<template>
  <div class="FlowView block-main public-hoverItem">
    <div class="block-head" style="margin-bottom: 0px">
      <div class="block-title">流量概览</div>
    </div>
    <div class="bid-list-page">
      <originView ref="originView" byFlowView></originView>
      <div class="bid-list-record">
        <div class="bid-list-item1 w157">
          <!-- <p>今日</p> -->
          <p v-if="timeType == 'day'">今日</p>
          <p v-if="timeType == 'week'">本周</p>
          <p v-if="timeType == 'month'">本月</p>
          <p v-if="timeType == 'year'">本年</p>
        </div>
        <div class="bid-list-item w158">
          <p>{{ current.pv || "--" }}</p>
        </div>
        <div class="bid-list-item w158">
          <p>{{ current.visitCount || "--" }}</p>
        </div>
        <div class="bid-list-item w158">
          <p>{{ current.uv || "--" }}</p>
        </div>
        <div class="bid-list-item w158">
          <p>{{ current.ipCount || "--" }}</p>
        </div>
        <div class="bid-list-item w158">
          <p>{{ averageRulesEvent(current.avgPv) || "--" }}</p>
        </div>
        <div class="bid-list-item w158">
          <p>{{ formatTimeFun(current.avgVisitTime) || "--" }}</p>
        </div>
        <div class="bid-list-item w158">
          <p v-if="current.bounceRate">
            {{ percentageFun(current.bounceRate) }}
          </p>
          <p v-else>--</p>
        </div>
      </div>
<!-- 昨日 -->
      <div class="bid-list-record">
        <div class="bid-list-item1 w157">
          <p v-if="timeType == 'day'">昨日</p>
          <p v-if="timeType == 'week'">上周</p>
          <p v-if="timeType == 'month'">上月</p>
          <p v-if="timeType == 'year'">去年</p>
        </div>
        <div class="bid-list-item w157">
          <p>{{ previous.pv || "--" }}</p>
          <!-- <img
            v-if="previous.pv && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.pv, previous.pv)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>
        <div class="bid-list-item w157">
          <p>{{ previous.visitCount || "--" }}</p>
          <!-- <img
            v-if="previous.visitCount && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.visitCount, previous.visitCount)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>

        <div class="bid-list-item w157">
          <p>{{ previous.uv || "--" }}</p>
          <!-- <img
            v-if="previous.uv && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.uv, previous.uv)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>
        <div class="bid-list-item w157">
          <p>{{ previous.ipCount || "--" }}</p>
          <!-- <img
            v-if="previous.ipCount && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.ipCount, previous.ipCount)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>
        <div class="bid-list-item w157">
          <p>{{ averageRulesEvent(previous.avgPv) || "--" }}</p>
          <!-- <img
            v-if="previous.avgPv && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.avgPv, previous.avgPv)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>
        <div class="bid-list-item w157">
          <p>{{ formatTimeFun(previous.avgVisitTime) || "--" }}</p>
          <!-- <img
            v-if="previous.avgVisitTime && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.avgVisitTime, previous.avgVisitTime)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>
        <div class="bid-list-item w157">
          <p>
            {{ percentageFun(previous.bounceRate) || "--" }}
          </p>
          <!-- <img
            v-if="previous.bounceRate && currentPrediction"
            class="riseImg"
            :src="
              handleCompare(currentPrediction.bounceRate, previous.bounceRate)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          /> -->
        </div>
      </div>

      <!-- 今日预测 -->
      <div class="bid-list-record" v-if="currentPrediction">
        <div class="bid-list-item1 w157">
          <p v-if="timeType == 'day'">今日预测</p>
        </div>
        <div class="bid-list-item w157">
          <p>{{ currentPrediction.pv || "--" }}</p>
          <img
            v-if="currentPrediction.pv"
            class="riseImg"
            :src="
              handleCompare(previous.pv, currentPrediction.pv)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ currentPrediction.visitCount || "--" }}</p>
          <img
            v-if="currentPrediction.visitCount"
            class="riseImg"
            :src="
              handleCompare(previous.visitCount, currentPrediction.visitCount)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ currentPrediction.uv || "--" }}</p>
          <img
            v-if="currentPrediction.uv"
            class="riseImg"
            :src="
              handleCompare(previous.uv, currentPrediction.uv)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>

        <div class="bid-list-item w157">
          <p>{{ currentPrediction.ipCount || "--" }}</p>
          <img
            v-if="currentPrediction.ipCount"
            class="riseImg"
            :src="
              handleCompare(previous.ipCount, currentPrediction.ipCount)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ averageRulesEvent(currentPrediction.avgPv) || "--" }}</p>
          <img
            v-if="currentPrediction.avgPv"
            class="riseImg"
            :src="
              handleCompare(previous.avgPv, currentPrediction.avgPv)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ formatTimeFun(currentPrediction.avgVisitTime) || "--" }}</p>
          <img
            v-if="currentPrediction.avgVisitTime"
            class="riseImg"
            :src="
              handleCompare(
                previous.avgVisitTime,
                currentPrediction.avgVisitTime
              )
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>
        <div class="bid-list-item w157">
          <p>
            {{ percentageFun(currentPrediction.bounceRate) || "--" }}
          </p>
          <img
            v-if="currentPrediction.bounceRate"
            class="riseImg"
            :src="
              handleCompare(previous.bounceRate, currentPrediction.bounceRate)
                ? require('@/assets/images/decline.png')
                : require('@/assets/images/rise.png')
            "
          />
        </div>
      </div>

      <div style="width: 100%; border-bottom:1px solid #E7EFF9 ;margin: 2px 0px 13px 0;"></div>

      <div class="bid-list-record">
        <div class="bid-list-item1 w157">
          <p v-if="timeType == 'day'">环比（今日与昨日）</p>
          <p v-if="timeType == 'week'">环比（本周与上周）</p>
          <p v-if="timeType == 'month'">环比（本月与上月）</p>
          <p v-if="timeType == 'year'">环比（本年与上年）</p>
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.pv, previous.pv) }}</p>
          <p v-if="huanbi(current.pv, previous.pv) != '--'">%</p>
          <img
            v-if="
              huanbi(current.pv, previous.pv) != '--' &&
              huanbi(current.pv, previous.pv) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.pv, previous.pv) != '--' &&
              huanbi(current.pv, previous.pv) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.visitCount, previous.visitCount) }}</p>
          <p v-if="huanbi(current.visitCount, previous.visitCount) != '--'">
            %
          </p>
          <img
            v-if="
              huanbi(current.visitCount, previous.visitCount) != '--' &&
              huanbi(current.visitCount, previous.visitCount) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.visitCount, previous.visitCount) != '--' &&
              huanbi(current.visitCount, previous.visitCount) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.uv, previous.uv) }}</p>
          <p v-if="huanbi(current.uv, previous.uv) != '--'">%</p>
          <img
            v-if="
              huanbi(current.uv, previous.uv) != '--' &&
              huanbi(current.uv, previous.uv) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.uv, previous.uv) != '--' &&
              huanbi(current.uv, previous.uv) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.ipCount, previous.ipCount) }}</p>
          <p v-if="huanbi(current.ipCount, previous.ipCount) != '--'">%</p>
          <img
            v-if="
              huanbi(current.ipCount, previous.ipCount) != '--' &&
              huanbi(current.ipCount, previous.ipCount) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.ipCount, previous.ipCount) != '--' &&
              huanbi(current.ipCount, previous.ipCount) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.avgPv, previous.avgPv) }}</p>
          <p v-if="huanbi(current.avgPv, previous.avgPv) != '--'">%</p>
          <img
            v-if="
              huanbi(current.avgPv, previous.avgPv) != '--' &&
              huanbi(current.avgPv, previous.avgPv) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.avgPv, previous.avgPv) != '--' &&
              huanbi(current.avgPv, previous.avgPv) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.avgVisitTime, previous.avgVisitTime) }}</p>
          <p v-if="huanbi(current.avgVisitTime, previous.avgVisitTime) != '--'">
            %
          </p>
          <img
            v-if="
              huanbi(current.avgVisitTime, previous.avgVisitTime) != '--' &&
              huanbi(current.avgVisitTime, previous.avgVisitTime) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.avgVisitTime, previous.avgVisitTime) != '--' &&
              huanbi(current.avgVisitTime, previous.avgVisitTime) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ huanbi(current.bounceRate, previous.bounceRate) }}</p>
          <p v-if="huanbi(current.bounceRate, previous.bounceRate) != '--'">
            %
          </p>
          <img
            v-if="
              huanbi(current.bounceRate, previous.bounceRate) != '--' &&
              huanbi(current.bounceRate, previous.bounceRate) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              huanbi(current.bounceRate, previous.bounceRate) != '--' &&
              huanbi(current.bounceRate, previous.bounceRate) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
      </div>
      <div class="bid-list-record" style="margin-bottom: 0">
        <div class="bid-list-item1 w157">
          <p v-if="timeType == 'day'">同比（今日与上周同期）</p>
          <p v-if="timeType == 'week'">同比（本周与上年同期）</p>
          <p v-if="timeType == 'month'">同比（本月与上年同期）</p>
          <p v-if="timeType == 'year'">同比（本年与上年同期）</p>
        </div>
        <div class="bid-list-item w157">
          <p>{{ tongbi(current.pv, samePeriod.pv) }}</p>
          <p v-if="tongbi(current.pv, samePeriod.pv) != '--'">%</p>
          <img
            v-if="
              tongbi(current.pv, samePeriod.pv) != '--' &&
              tongbi(current.pv, samePeriod.pv) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.pv, samePeriod.pv) != '--' &&
              tongbi(current.pv, samePeriod.pv) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>

        <div class="bid-list-item w157">
          <p>{{ tongbi(current.visitCount, samePeriod.visitCount) }}</p>
          <p v-if="tongbi(current.visitCount, samePeriod.visitCount) != '--'">
            %
          </p>
          <img
            v-if="
              tongbi(current.visitCount, samePeriod.visitCount) != '--' &&
              tongbi(current.visitCount, samePeriod.visitCount) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.visitCount, samePeriod.visitCount) != '--' &&
              tongbi(current.visitCount, samePeriod.visitCount) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ tongbi(current.uv, samePeriod.uv) }}</p>
          <p v-if="tongbi(current.uv, samePeriod.uv) != '--'">%</p>
          <img
            v-if="
              tongbi(current.uv, samePeriod.uv) != '--' &&
              tongbi(current.uv, samePeriod.uv) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.uv, samePeriod.uv) != '--' &&
              tongbi(current.uv, samePeriod.uv) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ tongbi(current.ipCount, samePeriod.ipCount) }}</p>
          <p v-if="tongbi(current.ipCount, samePeriod.ipCount) != '--'">%</p>
          <img
            v-if="
              tongbi(current.ipCount, samePeriod.ipCount) != '--' &&
              tongbi(current.ipCount, samePeriod.ipCount) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.ipCount, samePeriod.ipCount) != '--' &&
              tongbi(current.ipCount, samePeriod.ipCount) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ tongbi(current.avgPv, samePeriod.avgPv) }}</p>
          <p v-if="tongbi(current.avgPv, samePeriod.avgPv) != '--'">%</p>
          <img
            v-if="
              tongbi(current.avgPv, samePeriod.avgPv) != '--' &&
              tongbi(current.avgPv, samePeriod.avgPv) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.avgPv, samePeriod.avgPv) != '--' &&
              tongbi(current.avgPv, samePeriod.avgPv) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ tongbi(current.avgVisitTime, samePeriod.avgVisitTime) }}</p>
          <p
            v-if="tongbi(current.avgVisitTime, samePeriod.avgVisitTime) != '--'"
          >
            %
          </p>
          <img
            v-if="
              tongbi(current.avgVisitTime, samePeriod.avgVisitTime) != '--' &&
              tongbi(current.avgVisitTime, samePeriod.avgVisitTime) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.avgVisitTime, samePeriod.avgVisitTime) != '--' &&
              tongbi(current.avgVisitTime, samePeriod.avgVisitTime) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
        <div class="bid-list-item w157">
          <p>{{ tongbi(current.bounceRate, samePeriod.bounceRate) }}</p>
          <p v-if="tongbi(current.bounceRate, samePeriod.bounceRate) != '--'">
            %
          </p>
          <img
            v-if="
              tongbi(current.bounceRate, samePeriod.bounceRate) != '--' &&
              tongbi(current.bounceRate, samePeriod.bounceRate) < 0
            "
            class="declineIcon"
            src="@/assets/images/decline.png"
            alt=""
          />
          <img
            v-if="
              tongbi(current.bounceRate, samePeriod.bounceRate) != '--' &&
              tongbi(current.bounceRate, samePeriod.bounceRate) > 0
            "
            class="riseImg"
            src="@/assets/images/rise.png"
            alt=""
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import originView from "@/components/origin-view/index";
import { getFlowApi } from "@/api/trackingapi/flow";
import { percentage, averageRules } from "@/utils/percent";
import { formatTime } from "@/utils/format";
export default {
  name: "FlowView",
  components: { originView },
  props: {
    commonParams: {},
    timeTypeFlag: {},
  },
  data() {
    return {
      iconShow: true,
      flowData: null, //流量概览
      timeType: "",
    };
  },
  computed: {
    params() {
      return Object.assign({}, this.commonParams);
    },
    previous() {
      return this.flowData && this.flowData.previous
        ? this.flowData.previous
        : {};
    },
    current() {
      return this.flowData && this.flowData.current
        ? this.flowData.current
        : {};
    },
    currentPrediction() {
      return this.flowData && this.flowData.currentPrediction
        ? this.flowData.currentPrediction
        : null;
    },
    samePeriod() {
      return this.flowData && this.flowData.samePeriod
        ? this.flowData.samePeriod
        : {};
    },
  },
  watch: {},
  methods: {
    handleCompare(x, y) {
      // if (y) {
      return x > y ? true : false;
      // }
      // return;
    },
    averageRulesEvent(num) {
      return averageRules(num);
    },
    formatTimeFun(val) {
      val = Math.floor(val);
      return formatTime(val);
    },
    percentageFun(val) {
      return percentage(val);
    },
    getFlow() {
      this.timeType = this.timeTypeFlag;
      getFlowApi(this.params).then((res) => {
        this.flowData = res.data;
      });
    },
    huanbi(c, p) {
      if (c && p) {
        return (((c - p) / p) * 100).toFixed(2);
      }
      return "--";
    },
    tongbi(c, s) {
      if (c && s) {
        return (((c - s) / s) * 100).toFixed(2);
      }
      return "--";
    },
  },
};
</script>

<style lang="scss" scoped>
.FlowView {
  min-height: 215px;
  background-color: #fff;
  .bid-list-page {
    width: clas(100% -20px);
    display: flex;
    flex-direction: column;
    .bid-list-header {
      display: flex;
      margin-bottom: 21px;
      .header-name {
        width: 12.5%;
        // width: 10%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .icon-question {
          width: 11.44px;
          height: 11.44px;
          margin-left: 12px;
          cursor: pointer;
          position: absolute;
          transform: translate(0, -50%);
        }
      }
      .w156 {
        font-size: 13px;
        font-weight: 400;
        line-height: 14px;
        color: #4d4d4d;
      }
    }
    .bid-list-record {
      display: flex;
      margin-bottom: 11px;
      .bid-list-item1 {
        width: 12.5%;
        justify-content: flex-start;
        height: 30px;
        display: flex;
        align-items: center;
      }
      .bid-list-item {
        width: 12.5%;
        justify-content: center;
        height: 30px;
        display: flex;
        align-items: center;
      }
      .declineIcon {
        width: 9px;
        height: 11.24px;
        margin-left: 7px;
      }
      .riseImg {
        width: 9px;
        height: 11.24px;
        margin-left: 7px;
      }
      .w157 {
        font-size: 13px;
        font-weight: 400;
        line-height: 14px;
        color: #4d4d4d;
      }
      .w158 {
        font-size: 16px;
        font-weight: bold;
        color: #2c7be5;
        line-height: 17px;
      }
    }
  }
}
</style>
