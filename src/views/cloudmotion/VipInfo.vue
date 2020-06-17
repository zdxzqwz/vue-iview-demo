<template>
  <div class="vip-info">
    <Row>
      <Col span="12">
        <!-- 左侧查询条件区 -->
        <Row type="flex" align="middle">
          <Col span="24">
            <Input v-model="param.phone" placeholder="请输入电话号码查询" class="search-param" />
            <Divider type="vertical" />
            <Input v-model="param.name" placeholder="请输入姓名查询" class="search-param" />
            <Divider type="vertical" />
            <RadioGroup v-model="param.sex">
              <Radio label="1">
                <Icon type="md-male" />
              </Radio>
              <Radio label="0">
                <Icon type="md-female" />
              </Radio>
            </RadioGroup>
            <Divider type="vertical" />
            <Button type="primary" @click="refresh" icon="md-refresh">查询</Button>
          </Col>
        </Row>
      </Col>
      <Col span="12">
        <!-- 右侧操作区 -->
        <Row type="flex" align="middle">
          <Col span="24" class-name="search-right">
            <Button type="success" icon="md-add" @click="addVip">添加会员</Button>
            <Divider type="vertical" />
            <Button type="error" icon="md-trash" @click="removeVips">批量删除</Button>
          </Col>
        </Row>
      </Col>
    </Row>
    <div style="padding:5px;"></div>
    <!-- 列表 -->
    <Row>
      <Col span="24">
        <Table
          border
          stripe
          ref="selection"
          :columns="columns"
          :data="dataList"
          :loading="tableLoading"
          @on-selection-change="selectRow"
        ></Table>
      </Col>
    </Row>
    <br />
    <!-- 分页 -->
    <Row>
      <Col span="24">
        <div style="float:right;">
          <Page
            :total="_.size(dataList)"
            show-total
            show-sizer
            @on-change="changePageNum"
            @on-page-size-change="changePageSize"
          />
        </div>
      </Col>
    </Row>
    <!-- 添加会员 和 修改会员-->
    <Modal
      v-model="vipWin"
      title="Common Modal dialog box title"
      :footer-hide="true"
      @on-ok="saveVip"
      @on-cancel="closeWin"
    >
      <Form ref="formValidate" :model="vipModel" :rules="ruleValidate" :label-width="80">
        <FormItem label="名称" prop="name">
          <Input v-model="vipModel.name" placeholder="请输入会员名称"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="mail">
          <Input v-model="vipModel.mail" placeholder="请输入邮箱"></Input>
        </FormItem>
        <FormItem label="城市" prop="city">
          <Select v-model="vipModel.city" placeholder="请选择城市">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="日期">
          <Row>
            <Col span="11">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="请选择日期" v-model="vipModel.date"></DatePicker>
              </FormItem>
            </Col>
            <Col span="2" style="text-align: center">-</Col>
            <Col span="11">
              <FormItem prop="时间">
                <TimePicker type="time" placeholder="请选择时间" v-model="vipModel.time"></TimePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="Gender" prop="gender">
          <RadioGroup v-model="vipModel.gender">
            <Radio label="male">Male</Radio>
            <Radio label="female">Female</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Hobby" prop="interest">
          <CheckboxGroup v-model="vipModel.interest">
            <Checkbox label="Eat"></Checkbox>
            <Checkbox label="Sleep"></Checkbox>
            <Checkbox label="Run"></Checkbox>
            <Checkbox label="Movie"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="Desc" prop="desc">
          <Input
            v-model="vipModel.desc"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="Enter something..."
          ></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="saveVip">确定</Button>
          <Divider type="vertical" />
          <Button @click="closeWin">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
export default {
  name: "vip",
  components: {},
  data() {
    let _this = this;
    return {
      vipWin: false,
      tableLoading: false,
      selectRows: [], //当前选择的数据集合
      columns: [
        {
          type: "index",
          title: "序号",
          width: 80,
          align: "center"
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "user_name"
        },
        {
          title: "年龄",
          key: "age"
        },
        {
          title: "电话号码",
          key: "phone_number"
        },
        {
          title: "会员类别",
          key: "memberTypeName"
        },
        {
          title: "充值时间",
          key: "start_time"
        },
        {
          title: "到期时间",
          key: "due_time"
        },
        {
          title: "余额",
          key: "member_balance"
        },
        {
          title: "运动次数",
          key: "sprots_motion_num"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.update(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h("Button", { props: { type: "error", size: "small" } }, [
                h(
                  "Poptip",
                  {
                    props: {
                      confirm: true,
                      title: "确定要删除该会员吗？",
                      placement: "top-end",
                      width: 200,
                      type: "error",
                      transfer: true,
                      size: "small"
                    },
                    on: {
                      "on-ok": () => {
                        this.remove(params.row);
                      },
                      "on-cancel": () => {
                        this.$Message.info("取消删除");
                      }
                    }
                  },
                  "删除"
                )
              ])
            ]);
          }
        }
      ],
      dataList: [],
      param: {
        pageNum: 1,
        pageSize: 10
      },
      vipModel: {
        name: "",
        mail: "",
        city: "",
        gender: "",
        interest: [],
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "名称必填！",
            trigger: "blur"
          }
        ],
        mail: [
          {
            required: true,
            message: "邮箱必填！",
            trigger: "blur"
          },
          { type: "email", message: "请输入正确的邮箱格式！", trigger: "blur" }
        ],
        city: [
          {
            required: true,
            message: "请选择一个城市！",
            trigger: "change"
          }
        ],
        gender: [
          { required: true, message: "Please select gender", trigger: "change" }
        ],
        interest: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          },
          {
            type: "array",
            max: 2,
            message: "Choose two hobbies at best",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "Please select the date",
            trigger: "change"
          }
        ],
        time: [
          {
            required: true,
            type: "string",
            message: "Please select time",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please enter a personal introduction",
            trigger: "blur"
          },
          {
            type: "string",
            min: 20,
            message: "Introduce no less than 20 words",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.refresh();
    },
    refresh() {
      this.tableLoading = true;
      console.log(this.param, "请求前的数据");
      this.axios
        .get("/sprotsUser/userForSports", { params: this.param })
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.data.records;
        })
        .catch(() => {
          this.tableLoading = false;
        });
    },
    /**
     * 分页改变刷新数据
     */
    changePageNum(pageNum) {
      this.param.pageNum = pageNum;
      this.refresh();
    },
    /**
     * 每页显示数量刷新数据
     */
    changePageSize(pageSize) {
      this.param.pageSize = pageSize;
      this.refresh();
    },
    update(row) {
      console.log(row, "row");
      this.vipWin = true;
    },
    /**
     * 勾选表格的选择框时触发
     */
    selectRow(selection, row) {
      this.selectRows = selection;
    },
    /**
     * 删除单个vip信息
     */
    remove(row) {
      console.log(row, "row");
      //调用接口删除该vip信息
      this.$Message.success("删除会员成功");
      this.refresh();
    },
    /**
     * 批量删除vip信息
     */
    removeVips() {
      if (_.isEmpty(this.selectRows)) {
        this.$Message.warning("请至少选择一条数据！");
        return;
      }
      let ids = _.map(this.selectRows, o => o.user_id);
      this.$Modal.confirm({
        title: "提示",
        content: "您确认删除这" + ids.length + "条数据吗？",
        loading: true,
        onOk: () => {
          // 这里请求批量删除接口，下面只是演示
          setTimeout(() => {
            this.$Modal.remove();
            this.$Message.success("删除会员成功");
            this.refresh();
          }, 2000);
        }
      });
    },
    /**
     * 打开添加会员窗口
     */
    addVip() {
      this.vipWin = true;
    },
    /**
     * 真正的保存会员
     */
    saveVip() {
      this.$refs["formValidate"].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    /**
     * 关闭窗口
     */
    closeWin() {
      this.$refs["formValidate"].resetFields();
      this.vipWin = false;
    }
  }
};
</script>
<style scoped>
.search-param {
  width: 145px;
}
.search-right {
  text-align: right;
}
</style>
