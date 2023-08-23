<template>
  <div class="home_wrapper">
    <header class="header">
      <h1 class="header_title">可视化展板-ECharts</h1>
      <div class="show_time">当前时间：{{ timeText }}</div>
    </header>

    <section class="main_content">
      <!-- 左侧部分 -->
      <div class="content_left_item item">
        <div class="panel bar">
          <h2 class="title">柱状图-就业行业</h2>
          <div class="chart employment_industry1"></div>
          <div class="panel_footer"></div>
        </div>
        <div class="panel line">
          <h2 class="title">
            折线图-人员变化
            <span
              class="years"
              :class="{ active: lineActiveYear === '2020' }"
              @click="handleClickYears('2020')"
              >2020</span
            >
            <span
              class="years"
              :class="{ active: lineActiveYear === '2021' }"
              @click="handleClickYears('2021')"
              >2021</span
            >
          </h2>
          <div class="chart people_change"></div>
          <div class="panel_footer"></div>
        </div>
        <div class="panel pie">
          <h2 class="title">饼形图-年龄分布</h2>
          <div class="chart age_distribution"></div>
          <div class="panel_footer"></div>
        </div>
      </div>

      <!-- 中间部分 -->
      <div class="content_middle_item item">
        <!-- 数字模块 -->
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>125811</li>
              <li>104563</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>前端需求人数</li>
              <li>市场供应人数</li>
            </ul>
          </div>
        </div>

        <!-- 地图模块 -->
        <div class="map">
          <div class="earth"></div>
          <div class="spin1"></div>
          <div class="spin2"></div>
          <div class="chart hunan_map">地图模板</div>
        </div>
      </div>

      <!-- 右侧部分 -->
      <div class="content_right_item item">
        <div class="panel bar2">
          <h2 class="title">柱状图-就业行业2</h2>
          <div class="chart employment_industry2"></div>
          <div class="panel_footer"></div>
        </div>
        <div class="panel line">
          <h2 class="title">折线图-播放量</h2>
          <div class="chart play_amount"></div>
          <div class="panel_footer"></div>
        </div>
        <div class="panel pie">
          <h2 class="title">饼形图-地区分布</h2>
          <div class="chart district_distribution"></div>
          <div class="panel_footer"></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import echarts from 'echarts'
import config from '@/config'
import hunanMapJson from '@/assets/map/hunan.json'

export default {
  name: 'home',
  components: {},
  computed: {},
  data() {
    return {
      timeText: '',

      stopTimer: false, // 相当于定时器锁
      lineActiveYear: '2020', // 折线图当前激活的年份

      hospitalList: [
        {
          id: 1,
          color: '#fc41a8',
          size: 15,
          type: '区域诊疗中心',
          list: [
            {
              name: '长沙市第一医院',
              value: [112.988817, 28.210389, 1],
            },
          ],
        },
        {
          id: 2,
          color: '#2BC191',
          size: 15,
          type: '三级医院',
          list: [
            {
              name: '湖南省直中医医院',
              value: [113.151751, 27.853569, 2],
            },
          ],
        },

        {
          id: 3,
          color: '#7e6dff',
          size: 10,
          type: '二级医院',
          list: [
            {
              name: '长沙县中医院',
              value: [113.120881, 28.380714, 3],
            },
          ],
        },
      ],

    }
  },
  methods: {
    handleClickYears(year) {
      if (this.lineActiveYear !== year) {
        this.lineActiveYear = year
        let currentData = config.yearData.find((item) => item.year === year)
        // console.log(currentData)
        if (currentData) {
          this.line1.series[0].data = currentData.data[0]
          this.line1.series[1].data = currentData.data[1]

          let index = this.dataArr.findIndex(
            (item) => item.dom === '.people_change'
          )
          // console.log(index)
          if (index > -1) {
            this[`echartsInstance${index}`].setOption(this.line1)
          }
        }
      }
    },

    showRealTime() {
      let dt = new Date()
      let y = dt.getFullYear()
      let mt = dt.getMonth() + 1
      let day = dt.getDate()
      let h = dt.getHours() //获取时
      let m = dt.getMinutes() //获取分
      let s = dt.getSeconds() //获取秒
      this.timeText =
        y + '年' + mt + '月' + day + '-' + h + '时' + m + '分' + s + '秒'
    },

    // 显示实时时间
    polling() {
      if (this.stopTimer) return
      this.showRealTime()
      this.timerId = setTimeout(this.polling, 1000)
    },

    resiseMethod() {
      this.dataArr.forEach((item, index) => {
        this[`echartsInstance${index}`].resize()
      })
    },

    // 初始化 echarts 实例
    initEchartsInstance(data) {
      data.forEach((item, index) => {
        let domContainer
        if (typeof item.dom === 'string') {
          domContainer = document.querySelector(item.dom)
        } else if (typeof item.dom === 'object') {
          domContainer = item.dom
        }

        // console.log(domContainer);
        this[`echartsInstance${index}`] = echarts.init(domContainer)
        this[`echartsInstance${index}`].setOption(item.options)
      })
    },

    getMapOptions() {
      echarts.registerMap('hunan', hunanMapJson)

      // 地图配置项
      const option = {
        // 背景色，默认无
        // backgroundColor: '#020933',

        // 定义提示框
        tooltip: {
          trigger: 'item',
          formatter: function (params, ticket, callback) {
            // 指到 scatter 2d散点（气泡）图时的表现 
            if (params.seriesType == 'scatter') {
              let desc = ''
              if (params.data.value[3]) {
                params.data.value[3].forEach((item) => {
                  desc += `</br>  ${item.label}: ${item.value}`
                })
              }
              return params.marker + params.name + desc
              // 指到地图地区的表现 
            } else if (params.seriesType == 'map') {
              return params.name
            }
          },
          backgroundColor: 'rgba(50,50,50,0.7)',
          textStyle: {
            color: '#fff',
          },
          borderWidth: 0,
        },

        geo: {
          map: 'hunan', // 使用 registerMap 注册的地图名称
          aspectScale: 1, // 长宽比
          zoom: 0.8, // 地图放大 1.1 倍
          roam: true, // 开启后可以鼠标可以拖动和缩放
          scaleLimit: {
            // 滚轮缩放的极限控制，通过min, max最小和最大的缩放值，默认的缩放为1
            min: 0.5,
            // max: 20,
          },
          // left: '0%', // 组件离容器左侧的距离。
          // top: '0%',  // 组件离容器上侧的距离。
          // layoutCenter: ['50%', '50%'], // 需要将地图定位到容器中间且不超出容器时使用
          // layoutSize: 100,  // 需要将地图定位到容器中间且不超出容器时使用
          // 区域样式
          itemStyle: {
            areaColor: 'rgba(20,41,80,.6)', // 地图区域的颜色
            borderColor: '#0692a4', // 图形的描边颜色。
            borderWidth: 1, // 描边线宽。为 0 时无描边
            shadowColor: '#182f68', // 阴影颜色
            shadowOffsetX: 0, // 阴影水平方向上的偏移距离
            shadowOffsetY: 25, // 阴影垂直方向上的偏移距离
          },

          label: {
            show: true, // 是否显示标签
            textStyle: {
              color: '#fff', // 默认标签颜色
            },
          },
          // 指上去时的样式
          emphasis: {
            itemStyle: {
              areaColor: 'rgba(20,41,80,.6)', // 指上去时的区域背景色
              borderWidth: 1, // 指上去时的区域边框大小
            },

            label: {
              textStyle: {
                color: '#fff', // 指上去时的标签颜色
              },
            },
          },
        },

        series: [
          {
            // 如配置了 geo 时指定 geoIndex：0，就会和 geo 共用 geo 地图组件，当前 map 中的 label，itemStyle，emphasis等从 geo 中取，自身的则会失效,如果需要缩放，平移时适合设置它，否则缩放时会出现两个地图
            geoIndex: 0,
            type: 'map',
          },

          {
            type: 'scatter', // 2d散点（气泡）图
            coordinateSystem: 'geo', // 该系列使用的坐标系，可选：'cartesian2d'、'polar'、'geo'、'calendar'、
            // 标记的大小 如果需要每个数据的图形大小不一样，可以设置为如下格式的回调函数：
            symbolSize: (item) => {
              const current = this.hospitalList.find(
                (data) => data.id === item[2]
              )
              return current.size
            },
            // 图形样式
            itemStyle: {
              // 图形的颜色。 默认从全局调色盘 option.color 获取颜色。支持使用回调函数。回调函数格式如下：
              color: (item) => {
                // console.log(item)
                const current = this.hospitalList.find(
                  (data) => data.id === item.value[2]
                )
                if (current) {
                  return current.color
                }
              },
            },
            // 系列中的数据内容数组。数组项通常为具体的数据项。
            data: [
              // 格式如下：
              // {
              //   name: '长沙市第一医院',
              //   value: [
              //     112.988817,
              //     28.210389,
              //     1,
              //     [
              //       {
              //         label: '诊疗数',
              //         value: 666,
              //       },
              //       {
              //         label: '报告数',
              //         value: 666,
              //       },
              //     ],
              //   ],
              // },
              // ...
            ],
          },
        ],
      }

      // 生成模拟数据
      const arr = this.hospitalList
        .map((item) => {
          item.list.forEach((data) => {
            data.value[3] = [
              {
                label: '诊疗数',
                value: 666,
              },
              {
                label: '报告数',
                value: 666,
              },
            ]
          })
          return item.list
        })
        .flat()

      // 添加模拟数据
      option.series[1].data = arr
      return option
    },

    initEcharts() {
      const bar1 = config.bar1
      const bar2 = config.bar2
      const line1 = config.line1
      const line2 = config.line2
      const pie1 = config.pie1
      const pie2 = config.pie2
      const hunanMap = this.getMapOptions()

      // dom: 包含 echarts 实例的dom容器或 选择器值
      // options: 传入 echarts 实例的选项对象
      this.dataArr = [
        {
          dom: '.employment_industry1',
          options: bar1,
        },
        {
          dom: '.employment_industry2',
          options: bar2,
        },
        {
          dom: '.people_change',
          options: line1,
        },
        {
          dom: '.play_amount',
          options: line2,
        },
        {
          dom: '.age_distribution',
          options: pie1,
        },
        {
          dom: '.district_distribution',
          options: pie2,
        },
        {
          dom: '.hunan_map',
          options: hunanMap,
        },
      ]

      this.initEchartsInstance(this.dataArr)
    },
  },

  mounted() {
    this.polling()

    this.initEcharts()

    window.addEventListener('resize', this.resiseMethod)
  },

  beforeDestroy() {
    if (this.timerId) {
      clearTimeout(this.timerId)
    }

    window.removeEventListener('resize', this.resiseMethod)
  },
}
</script>

<style lang="scss" scoped>
.home_wrapper {
  width: 100%;
  height: 100%;
  .header {
    height: 1.25rem;
    background: url(./head_bg.png) no-repeat top center;
    background-size: 100% 100%;
    position: relative;
    .header_title {
      font-size: 0.475rem;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 80%;
    }
    .show_time {
      position: absolute;
      top: 0;
      right: 0.375rem;
      line-height: 0.9375rem;
      font-size: 0.25rem;
      color: rgba(255, 255, 255, 0.7);
    }
  }

  .main_content {
    // min-width: 1024px;
    // max-width: 1920px;
    // height: calc(1080px - 1.25rem - 0.25rem);
    height: calc(100% - 1.25rem);
    padding: 0.125rem 0.125rem 0;
    display: flex;
    .panel {
      position: relative;
      height: 3.875rem;
      border: 1px solid rgba(25, 186, 139, 0.17);
      background: rgba(255, 255, 255, 0.04) url(./line1.png);
      padding: 0 0.1875rem 0.5rem;
      // margin-bottom: 0.1875rem;
      margin-bottom: 0.16rem;
      &::before,
      &::after {
        position: absolute;
        top: 0;
        content: '';
        width: 10px;
        height: 10px;
        border-top: 2px solid #02a6b5;
      }
      &::before {
        border-left: 2px solid #02a6b5;
        left: 0;
      }
      &::after {
        right: 0;
        border-right: 2px solid #02a6b5;
      }
      .panel_footer::before,
      .panel_footer::after {
        position: absolute;
        bottom: 0;
        content: '';
        width: 10px;
        height: 10px;
        border-bottom: 2px solid #02a6b5;
      }
      .panel_footer::before {
        left: 0;
        border-left: 2px solid #02a6b5;
      }
      .panel_footer::after {
        right: 0;
        border-right: 2px solid #02a6b5;
      }
      .title {
        height: 0.6rem;
        line-height: 0.6rem;
        text-align: center;
        color: #fff;
        font-size: 0.25rem;
        font-weight: 400;
      }
      .chart {
        height: 3rem;
        // background-color: pink;
      }

      .years {
        &.active {
          color: #3d7cd3;
        }
        &:hover {
          cursor: pointer;
        }
        &:last-child {
          margin-left: 10px;
        }
      }
    }

    .content_left_item {
      flex: 3;
    }

    .content_middle_item {
      flex: 5;
      padding: 0 0.125rem 0.1875rem;
      // 数字模块
      .no {
        background: rgba(101, 132, 226, 0.1);
        padding: 0.1875rem;
        .no-hd {
          position: relative;
          border: 1px solid rgba(25, 186, 139, 0.17);
          // 左上和右下角小边框
          &::before {
            content: '';
            position: absolute;
            width: 30px;
            height: 10px;
            border-top: 2px solid #02a6b5;
            border-left: 2px solid #02a6b5;
            top: 0;
            left: 0;
          }
          &::after {
            content: '';
            position: absolute;
            width: 30px;
            height: 10px;
            border-bottom: 2px solid #02a6b5;
            border-right: 2px solid #02a6b5;
            right: 0;
            bottom: 0;
          }

          ul {
            display: flex;
            li {
              position: relative;
              flex: 1;
              text-align: center;
              height: 1rem;
              line-height: 1rem;
              font-size: 0.875rem;
              color: #ffeb7b;
              padding: 0.05rem 0;
              font-family: electronicFont;
              font-weight: bold;
              &:first-child::after {
                content: '';
                position: absolute;
                height: 50%;
                width: 1px;
                background: rgba(255, 255, 255, 0.2);
                right: 0;
                top: 25%;
              }
            }
          }
        }
        .no-bd ul {
          display: flex;
          li {
            flex: 1;
            height: 0.5rem;
            line-height: 0.5rem;
            text-align: center;
            font-size: 0.225rem;
            color: rgba(255, 255, 255, 0.7);
            padding-top: 0.125rem;
          }
        }
      }

      // 地图模块
      .map {
        position: relative;
        overflow: hidden;
        height: 10.125rem;
        // 地球
        .earth,
        .spin1,
        .spin2 {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background-size: 100% 100%;
        }
        .earth {
          width: 6.475rem;
          height: 6.475rem;
          background-image: url(./earth.png);
          background-repeat: no-repeat;
          opacity: 0.3;
        }
        .spin1 {
          width: 8.0375rem;
          height: 8.0375rem;
          background-image: url(./spin1.png);
          background-repeat: no-repeat;
          opacity: 0.6;
          animation: rotate1 15s linear infinite;
          // animation-play-state: running;
          // &:hover {
          //   animation-play-state: paused;
          // }
        }
        .spin2 {
          width: 7.075rem;
          height: 7.075rem;
          background-image: url(./spin2.png);
          background-repeat: no-repeat;
          opacity: 0.6;
          animation: rotate2 10s linear infinite;
        }
        .chart {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          // background-color: pink;
          // opacity: 0.3;
        }

        @keyframes rotate1 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        @keyframes rotate2 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }
      }
    }

    .content_right_item {
      flex: 3;
    }

    .bar {
    }
  }
}
</style>
