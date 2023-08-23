import echarts from 'echarts'

export default {
  yearData: [
    {
      year: '2020', // 年份
      data: [
        // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      ],
    },
    {
      year: '2021', // 年份
      data: [
        // 两个数组是因为有两条线
        [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
        [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34],
      ],
    },
  ],

  bar1: {
    // 图形颜色
    color: ['#2f89cf'],

    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //   // 坐标轴指示器，坐标轴触发有效
      //   type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      // },
    },
    // backgroundColor: '#fff',

    // legend: {
    // data: ['直接访问']
    // },
    // 网格区域设置
    grid: {
      left: '0%',
      top: '10px',
      right: '0%',
      bottom: '4%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        // type: 'value',
        data: [
          '旅游行业',
          '教育培训',
          '游戏行业',
          '医疗行业',
          '电商行业',
          '社交行业',
          '金融行业',
        ],
        // 坐标轴刻度相关设置
        axisTick: {
          alignWithLabel: true,
        },
        // x轴的文字颜色和大小
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: 12,
        },
        // 坐标轴 轴线样式
        axisLine: {
          show: false
        },
      },
    ],

    yAxis: [
      {
        type: 'value',
        // y轴的文字颜色和大小
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: 12,
        },
        // 坐标轴 轴线样式
        axisLine: {
          // 如果想要设置单独的线条样式
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
            width: 2,
            type: 'solid',
          },
        },
        // y 轴分隔线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
      },
    ],

    series: [
      {
        // barCategoryGap: '50%',
        name: '直接访问',
        type: 'bar',
        barWidth: '35%',
        // label: {
        //   show: true,
        //   position: 'inside',
        //   color: '#fff',
        //   fontSize: 16,
        // },
        data: [
          20,
          52,
          200,
          334,
          390,
          330,
          220,
        ],
        itemStyle: {
          // 修改柱子圆角
          barBorderRadius: 5,
        },
      },
    ],
  },

  bar2: {
    grid: {
      // top: "10%",
      // left: "22%",
      // bottom: "10%",
      left: '10%',
      right: '8%',
      bottom: '3%',
      top: 10,
      containLabel: true,
    },

    // 不显示x轴
    xAxis: {
      show: false,
    },

    yAxis: [
      // 左侧 y 轴
      {
        type: 'category',
        inverse: true,
        data: ['HTML5', 'CSS3', 'javascript', 'VUE', 'NODE'],
        axisLabel: {
          color: '#fff',
          fontSize: 12,
        },
        // 不显示y轴线条
        axisLine: {
          show: false,
        },
        // 不显示y轴刻度
        axisTick: {
          show: false,
        },
      },

      // 右侧 y 轴
      {
        type: 'category',
        inverse: true,
        data: [702, 350, 610, 793, 664],

        axisLabel: {
          color: '#fff',
          fontSize: 12,
        },
        // 不显示y轴线条
        axisLine: {
          show: false,
        },
        // 不显示y轴刻度
        axisTick: {
          show: false,
        },
      },
    ],

    series: [
      // 第一个系列：内部条
      {
        name: '内部条',
        type: 'bar',
        barWidth: 10,
        barCategoryGap: 50,
        yAxisIndex: 0,
        itemStyle: {
          barBorderRadius: 20,
          color: (params) => {
            const colorList = [
              '#1089E7',
              '#F57474',
              '#56D0E3',
              '#F8B448',
              '#8B78F6',
            ]
            return colorList[params.dataIndex]
          },
        },
        label: {
          show: true,
          position: 'inside',
          color: '#fff',

          formatter: '{c}%',
        },
        data: [70, 34, 60, 78, 69],
      },

      // 第二个系列：外框
      {
        name: '外框',
        type: 'bar',
        barCategoryGap: 50,
        barWidth: 15,
        yAxisIndex: 1,
        itemStyle: {
          color: 'none',
          borderColor: '#00c1de',
          borderWidth: 3,
          barBorderRadius: 15,
        },
        data: [100, 100, 100, 100, 100],
      },
    ],
  },

  line1: {
    // stack: 'samesign',
    color: ['#00DDE0', '#DB3B36'],
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      textStyle: {
        color: '#3D7CD3',
      },
      right: '10%', // 距离右边10%
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true, // 显示边框
      borderColor: '#012f4a', // 边框颜色
      containLabel: true,
    },

    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      axisLabel: {
        color: '#3D7CD3',
        fontSize: '12',
      },
      data: [
        '1月',
        '2月',
        '3月',
        '4月',
        '5月',
        '6月',
        '7月',
        '8月',
        '9月',
        '10月',
        '11月',
        '12月',
      ],
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#3D7CD3',
        fontSize: '12',
      },
      axisLine: {
        lineStyle: {
          color: '#012f4a',
        },
      },
      splitLine: {
        lineStyle: {
          color: '#012f4a',
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        name: '新增粉丝',
        type: 'line',
        // 折线修饰为圆滑
        smooth: true,
        data: [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
      },
      {
        name: '新增游客',
        type: 'line',
        // 折线修饰为圆滑
        smooth: true,
        data: [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79],
      },
    ],
  },

  line2: {
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      top: '0%',
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },

    grid: {
      left: '10',
      top: '30',
      right: '10',
      bottom: '10',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // x轴 刻度标签数据
        data: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '26',
          '28',
          '29',
          '30',
        ],
        // x轴的文字颜色和大小
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: '12',
        },
        // 坐标轴 轴线样式
        axisLine: {
          // 如果想要设置单独的线条样式
          lineStyle: {
            color: 'rgba(255,255,255,.2)',
          },
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
        // y轴的文字颜色和大小
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: '12',
        },
        // 坐标轴 轴线样式
        axisLine: {
          // 如果想要设置单独的线条样式
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
        // y 轴分隔线样式
        splitLine: {
          lineStyle: {
            color: 'rgba(255,255,255,.1)',
          },
        },
        // 隐藏 y 轴刻度
        axisTick: {
          show: false,
        },
      },
    ],

    series: [
      // 邮件营销 系列
      {
        name: '邮件营销',
        type: 'line',
        smooth: true,
        // 单独修改线的样式
        lineStyle: {
          color: '#0184d5',
          // color: 'red',
          width: 2,
        },

        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        // 设置拐点 小圆点
        symbol: 'circle',
        // 拐点大小
        symbolSize: 8,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: '#0184d5',
          // color: 'red',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12,
        },

        areaStyle: {
          // 渐变色，只需要复制即可
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(1, 132, 213, 0.4)', // 渐变色的起始颜色
              },
              {
                offset: 0.8,
                color: 'rgba(1, 132, 213, 0.1)', // 渐变线的结束颜色
              },
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
        // 邮件营销系列中的数据
        data: [
          30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30,
          60, 20, 40, 30, 40, 30, 40, 30, 40, 20, 60, 50, 40,
        ],
      },

      // 联盟广告 系列
      {
        name: '联盟广告',
        type: 'line',
        smooth: true,
        lineStyle: {
          normal: {
            color: '#00d887',
            width: 2,
          },
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: 'rgba(0, 216, 135, 0.4)',
              },
              {
                offset: 0.8,
                color: 'rgba(0, 216, 135, 0.1)',
              },
            ],
            false
          ),
          shadowColor: 'rgba(0, 0, 0, 0.1)',
        },
        // 设置拐点 小圆点
        symbol: 'circle',
        // 拐点大小
        symbolSize: 5,
        // 设置拐点颜色以及边框
        itemStyle: {
          color: '#00d887',
          borderColor: 'rgba(221, 220, 107, .1)',
          borderWidth: 12,
        },
        // 开始不显示拐点， 鼠标经过显示
        showSymbol: false,
        // 联盟广告系列中的数据
        data: [
          130, 10, 20, 40, 30, 40, 80, 60, 20, 40, 90, 40, 20, 140, 30, 40, 130,
          20, 20, 40, 80, 70, 30, 40, 30, 120, 20, 99, 50, 20,
        ],
      },
    ],
  },

  pie1: {
    color: ['#065aab', '#066eab', '#0682ab', '#0696ab', '#06a0ab'],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      // 距离底部为0%
      bottom: 0,
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        // 设置饼形图在容器中的位置
        center: ['50%', '50%'],
        //  修改内圆半径和外圆半径为，百分比相对于容器大小
        radius: ['40%', '60%'],
        // 不显示标签文字
        label: {
          show: true,
          position: 'outside',
        },
        // 不显示标签连接线
        labelLine: {
          show: true,
        },
        data: [
          { value: 1, name: '0岁以下' },
          { value: 4, name: '20-29岁' },
          { value: 2, name: '30-39岁' },
          { value: 2, name: '40-49岁' },
          { value: 1, name: '50岁以上' },
        ],
      },
    ],
  },

  pie2: {
    color: [
      '#006cff',
      '#60cda0',
      '#ed8884',
      '#ff9f7f',
      '#0096ff',
      '#9fe6b8',
      '#32c5e9',
      '#1d9dff',
    ],

    tooltip: {
      trigger: 'item',
      // formatter: '{a} <br/>{b} : {c} ({d}%)',
      formatter: function (params) {
        return `${params.seriesName} <br/>${params.name} : ${params.value} (${params.percent}%)`
      },
    },

    legend: {
      // 距离底部为0%
      bottom: 0,
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      // 修改图例组件的文字为 12px
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: '12',
      },
    },

    series: [
      {
        emphasis: {
          // scale: false
          disabled: false,
        },
        name: '面积模式',
        type: 'pie',
        // 设置饼形图在容器中的位置
        center: ['50%', '50%'],
        //  修改内圆半径和外圆半径为，百分比相对于容器大小
        radius: ['10%', '70%'],
        roseType: 'area',
        // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
        label: {
          fontSize: 10,
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长
          length: 6,
          // 连接文字线长
          length2: 8,
        },
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '江苏' },
          { value: 25, name: '浙江' },
          { value: 30, name: '四川' },
          { value: 42, name: '湖北' },
        ],
      },
    ],
  },
}
