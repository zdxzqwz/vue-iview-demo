<template>
  <div class="index">
    <!-- 上 -->
    <Row :gutter="16">
      <Col span="4">
        <Card :padding="0">
          <div class="content-con">
            <div class="left-area" style="background: rgb(45, 140, 240); width: 36%;">
              <i
                class="icon ivu-icon ivu-icon-md-person-add"
                style="font-size: 36px; color: rgb(255, 255, 255);"
              ></i>
            </div>
            <div class="right-area" style="width: 64%;">
              <div>
                <div class="count-to-wrapper">
                  <p class="content-outer">
                    <span id="count_to_301" class="count-to-count-text count-style">803</span>
                    <i class="count-to-unit-text"></i>
                  </p>
                </div>
                <p>新增会员</p>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="4">
        <Card :padding="0">
          <div class="content-con">
            <div class="left-area" style="background: rgb(25, 190, 107); width: 36%;">
              <i
                class="icon ivu-icon ivu-icon-md-locate"
                style="font-size: 36px; color: rgb(255, 255, 255);"
              ></i>
            </div>
            <div class="right-area" style="width: 64%;">
              <div>
                <div class="count-to-wrapper">
                  <p class="content-outer">
                    <span id="count_to_301" class="count-to-count-text count-style">803</span>
                    <i class="count-to-unit-text"></i>
                  </p>
                </div>
                <p>所有会员</p>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="4">
        <Card :padding="0">
          <div class="content-con">
            <div class="left-area" style="background: rgb(255, 153, 0); width: 36%;">
              <i
                class="icon ivu-icon ivu-icon-md-help-circle"
                style="font-size: 36px; color: rgb(255, 255, 255);"
              ></i>
            </div>
            <div class="right-area" style="width: 64%;">
              <div>
                <div class="count-to-wrapper">
                  <p class="content-outer">
                    <span id="count_to_301" class="count-to-count-text count-style">803</span>
                    <i class="count-to-unit-text"></i>
                  </p>
                </div>
                <p>新增用户</p>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="4">
        <Card :padding="0">
          <div class="content-con">
            <div class="left-area" style="background: rgb(237, 63, 20); width: 36%;">
              <i
                class="icon ivu-icon ivu-icon-md-share"
                style="font-size: 36px; color: rgb(255, 255, 255);"
              ></i>
            </div>
            <div class="right-area" style="width: 64%;">
              <div>
                <div class="count-to-wrapper">
                  <p class="content-outer">
                    <span id="count_to_301" class="count-to-count-text count-style">803</span>
                    <i class="count-to-unit-text"></i>
                  </p>
                </div>
                <p>新增用户</p>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="4">
        <Card :padding="0">
          <div class="content-con">
            <div class="left-area" style="background: rgb(228, 108, 187); width: 36%;">
              <i
                class="icon ivu-icon ivu-icon-md-chatbubbles"
                style="font-size: 36px; color: rgb(255, 255, 255);"
              ></i>
            </div>
            <div class="right-area" style="width: 64%;">
              <div>
                <div class="count-to-wrapper">
                  <p class="content-outer">
                    <span id="count_to_301" class="count-to-count-text count-style">803</span>
                    <i class="count-to-unit-text"></i>
                  </p>
                </div>
                <p>新增用户</p>
              </div>
            </div>
          </div>
        </Card>
      </Col>
      <Col span="4">
        <Card :padding="0">
          <div class="content-con">
            <div class="left-area" style="background: rgb(154, 102, 228); width: 36%;">
              <i
                class="icon ivu-icon ivu-icon-md-map"
                style="font-size: 36px; color: rgb(255, 255, 255);"
              ></i>
            </div>
            <div class="right-area" style="width: 64%;">
              <div>
                <div class="count-to-wrapper">
                  <p class="content-outer">
                    <span id="count_to_301" class="count-to-count-text count-style">803</span>
                    <i class="count-to-unit-text"></i>
                  </p>
                </div>
                <p>新增用户</p>
              </div>
            </div>
          </div>
        </Card>
      </Col>
    </Row>
    <br />
    <!-- 中 -->
    <Row :gutter="16">
      <Col span="8">
        <Card>
          <ve-pie :data="chartData1"></ve-pie>
        </Card>
      </Col>
      <Col span="16">
        <Card>
          <ve-histogram :data="chartData2" :settings="chartSettings2"></ve-histogram>
        </Card>
      </Col>
    </Row>
    <br />
    <!-- 下 -->
    <Row>
      <Col span="24">
        <Card>
          <ve-line :data="chartData3" :settings="chartSettings3"></ve-line>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "index",
  components: {},
  data() {
    this.chartSettings2 = {
      metrics: ["访问用户", "下单用户"],
      dimension: ["日期"]
    };
    this.chartSettings3 = {
      stack: { 用户: ["访问用户", "下单用户"] },
      area: true
    };
    return {
      chartData1: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 }
        ]
      },
      chartData2: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      },
      chartData3: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/7", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/8", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/9", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/10", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/11", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/12", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 }
        ]
      }
    };
  }
};
</script>
<style scoped>
.index .content-con {
  height: 110px;
  border-radius: 5px;
}
.index .content-con .left-area {
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.index .content-con .left-area > .icon {
  display: table-cell;
  vertical-align: middle;
}
.index .content-con .right-area {
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.index .content-con .right-area > div {
  display: table-cell;
  vertical-align: middle;
}
.index .content-outer {
  display: inline-block;
}
.count-style {
  font-size: 50px;
}
</style>
