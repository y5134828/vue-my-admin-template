<template>
  <div class="more-container">
    <el-date-picker
      v-model="searchForm.date"
      value-format="yyyy-MM-dd"
      type="date"
      placeholder="选择日期"
      @change="doChangeDate()"
    ></el-date-picker>
    <el-table
      v-loading="currentDayDataLoading"
      :data="currentDayData"
      border
      class="current-table"
      style="width: 100%"
    >
      <el-table-column
        prop="newUser"
        label="新用户数"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="pcRegister"
        label="PC端注册数"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="mobileRegister"
        label="移动端注册数"
      ></el-table-column>
      <el-table-column
        prop="inviteRegister"
        label="推广大使"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="loginUSer"
        label="登录用户"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="pcLoginUSer"
        label="pc登录用户"
        align="center"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="mobileLoginUSer"
        label="移动端登录用户"
      ></el-table-column>
      <el-table-column
        prop="dowmloadNum"
        label="下载总数"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="uploadApp"
        label="上传APP"
        align="center"
      ></el-table-column>
    </el-table>
    <div class="echart-wrp">
      <div class="echarts-date-wrap">
        <el-date-picker
          v-model="echartsDate"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
          @change="doChangeEchartDate()"
        ></el-date-picker>
      </div>
      <el-row v-loading="echartLoading" :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover">
            <div id="lineEchaert" style="height: 360px"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-card shadow="hover">
            <div id="mapEchaert" style="height: 360px"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import * as echarts from "echarts";
  require("echarts/extension/bmap/bmap");

  import { getDateTime, getTimeQuantum } from "@/utils/date";
  import {
    mapData,
    geoCoordMap,
    convertData,
    loadBMap,
  } from "@/utils/mapEacharts";
  const currentData = [
    {
      newUser: 10,
      pcRegister: 7,
      mobileRegister: 3,
      inviteRegister: 1,
      loginUSer: 111,
      pcLoginUSer: 99,
      mobileLoginUSer: 12,
      dowmloadNum: 11952,
      uploadApp: 122,
    },
  ];

  const lineDate = {
    date: { startDate: "2020-11-04", endDate: "2020-11-10" },
    info: [
      {
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        data: [220, 132, 201, 434, 290, 230, 120],
      },
      {
        data: [320, 432, 501, 634, 590, 330, 120],
      },
      {
        data: [320, 332, 301, 334, 390, 330, 320],
      },
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
      },
    ],
  };

  export default {
    name: "More",
    components: {},
    data() {
      return {
        nodeEnv: process.env.NODE_ENV,
        searchForm: { date: getDateTime() }, // 搜索form
        currentDayDataLoading: true, // 当日数据loading
        currentDayData: [], // 当日数据
        pickerOptions: {
          // echart查询日期
          shortcuts: [
            {
              text: "最近三天",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 3);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一周",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近十五天",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 15);
                picker.$emit("pick", [start, end]);
              },
            },
            {
              text: "最近一个月",
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit("pick", [start, end]);
              },
            },
          ],
        },
        echartsDate: "", // 图表查询日期
        echartLoading: true,
        lineOption: {
          title: {
            text: "统计",
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["新用户数", "推广大使", "登录用户", "下载总数", "上传APP"],
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
          },
          yAxis: {
            type: "value",
          },
          series: [
            {
              name: "新用户数",
              type: "line",
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: "推广大使",
              type: "line",
              data: [220, 132, 201, 434, 290, 230, 120],
            },
            {
              name: "登录用户",
              type: "line",
              data: [320, 432, 501, 634, 590, 330, 120],
            },
            {
              name: "下载总数",
              type: "line",
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: "上传APP",
              type: "line",
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        },
        mapOption: {
          title: {
            text: "新增人数分布",
            left: "center",
          },
          tooltip: {
            trigger: "item",
          },
          bmap: {
            center: [104.114129, 37.550339],
            zoom: 4,
            roam: true,
            mapStyle: {
              styleJson: [
                {
                  featureType: "water",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "land",
                  elementType: "all",
                  stylers: {
                    color: "#f3f3f3",
                  },
                },
                {
                  featureType: "railway",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "highway",
                  elementType: "all",
                  stylers: {
                    color: "#fdfdfd",
                  },
                },
                {
                  featureType: "highway",
                  elementType: "labels",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "geometry",
                  stylers: {
                    color: "#fefefe",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "geometry.fill",
                  stylers: {
                    color: "#fefefe",
                  },
                },
                {
                  featureType: "poi",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "green",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "subway",
                  elementType: "all",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "manmade",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "local",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "arterial",
                  elementType: "labels",
                  stylers: {
                    visibility: "off",
                  },
                },
                {
                  featureType: "boundary",
                  elementType: "all",
                  stylers: {
                    color: "#fefefe",
                  },
                },
                {
                  featureType: "building",
                  elementType: "all",
                  stylers: {
                    color: "#d1d1d1",
                  },
                },
                {
                  featureType: "label",
                  elementType: "labels.text.fill",
                  stylers: {
                    color: "#999999",
                  },
                },
              ],
            },
          },
          series: [
            {
              name: "新增人数",
              type: "scatter",
              coordinateSystem: "bmap",
              data: convertData(mapData),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              encode: {
                value: 2,
              },
              label: {
                formatter: "{b}",
                position: "right",
                show: false,
              },
              itemStyle: {
                color: "purple",
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            {
              name: "Top 5",
              type: "effectScatter",
              coordinateSystem: "bmap",
              data: convertData(
                mapData
                  .sort(function (a, b) {
                    return b.value - a.value;
                  })
                  .slice(0, 6)
              ),
              symbolSize: function (val) {
                return val[2] / 10;
              },
              encode: {
                value: 2,
              },
              showEffectOn: "render",
              rippleEffect: {
                brushType: "stroke",
              },
              hoverAnimation: true,
              label: {
                formatter: "{b}",
                position: "right",
                show: true,
              },
              itemStyle: {
                color: "purple",
                shadowBlur: 10,
                shadowColor: "#333",
              },
              zlevel: 1,
            },
          ],
        },
      };
    },
    computed: {
      tabHeight() {
        return this.$baseTableHeight();
      },
    },
    created() {
      this._getCurrentDaydata();
    },
    mounted() {
      this._getEchartsInfo();
      //设置echarts对象的option属性
    },
    methods: {
      // 加载当天数据
      _getCurrentDaydata() {
        setTimeout(() => {
          this.currentDayData = currentData;
          this.$nextTick(() => (this.currentDayDataLoading = false));
        }, 1000);
      },
      // 请求echart数据
      _getEchartsInfo(startDate, endDate) {
        if (!startDate || !endDate) {
          endDate = getDateTime(new Date(), "YYYY-mm-dd");
          startDate = getDateTime(
            new Date(new Date(endDate).getTime() - 3600 * 1000 * 24 * 6),
            "YYYY-mm-dd"
          );
        }
        let lineChart = echarts.init(document.getElementById("lineEchaert"));
        let mapChart = echarts.init(document.getElementById("mapEchaert"));
        setTimeout(() => {
          lineDate["info"].forEach((item, index) => {
            item.type = "line";
            item.name = this.lineOption.legend.data[index];
          });
          this.lineOption.xAxis.data = getTimeQuantum(startDate, endDate);
          this.lineOption.series = lineDate["info"];
          lineChart.setOption(this.lineOption);
          loadBMap("BiHGaIp7r0qnAbI0mO8G0MsRzxxxnFtS").then(() => {
            mapChart.setOption(this.mapOption);
          });

          this.$nextTick(() => (this.echartLoading = false));
        }, 1000);
      },
      // 时间改变
      doChangeDate() {
        this.currentDayDataLoading = true;
        this._getCurrentDaydata();
      },
      // 日期选择
      doChangeEchartDate() {
        let startDate = getDateTime(this.echartsDate[0], "YYYY-mm-dd");
        let endDate = getDateTime(this.echartsDate[1], "YYYY-mm-dd");
        this.echartLoading = true;
        this._getEchartsInfo(startDate, endDate);
      },
    },
  };
</script>
<style lang="scss" scoped>
  $mTop: 20px;
  .current-table {
    margin-top: $mTop;
  }
  .echart-wrp {
    margin-top: $mTop;
    .echarts-date-wrap {
      margin-bottom: $mTop;
    }
  }
</style>
