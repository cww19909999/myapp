<template>
  <div>
    <el-card>
      <!-- 搜索框 -->
      <el-form ref="searchProForm" :model="searchProForm" label-width="80px">
        <!-- 第一行 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称:" prop="pname">
                  <el-input v-model="searchProForm.pname" placeholder="商品名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="商品规格:" prop="pspec">
                  <el-input v-model="searchProForm.pspec" placeholder="商品规格"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标签:" prop="plabel">
              <el-select v-model="searchProForm.plabel" placeholder="请选择">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in tagList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 第二行 -->
        <el-row :gutter="20">
          <el-col :span="16">
            <el-row>
              <el-col>
                <el-form-item label="创建时间:">
                  <el-col :span="9">
                    <el-form-item prop="startTime">
                      <el-date-picker
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="请选择"
                        v-model="searchProForm.startTime"
                        prefix-icon="el-icon-date"
                        :picker-options="beginTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="9">
                    <el-form-item prop="endTime">
                      <el-date-picker
                        type="datetime"
                        format="yyyy-MM-dd HH:mm"
                        placeholder="请选择"
                        v-model="searchProForm.endTime"
                        prefix-icon="el-icon-date"
                        :picker-options="overTime"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="primary" @click="searchProducts">搜索</el-button>
                    <el-button type="primary" @click="resetSearchForm">重置</el-button>
                  </el-col>
                </el-form-item>
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" icon="el-icon-plus" @click="proAdd">新增商品</el-button>
          </el-col>
        </el-row>
      </el-form>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 商品列表 -->
      <el-table :data="productList" border style="width: 100%">
        <el-table-column prop="name" label="商品名称" align="center" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column prop="price" label="商品价格" align="center">
          <template v-slot="scope">
            <span>{{scope.row.price + '元'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rentNum" label="租赁量" align="center"></el-table-column>
        <el-table-column prop="purchases" label="购买量" align="center"></el-table-column>
        <el-table-column prop="uvNum" label="UV浏览量" align="center"></el-table-column>
        <el-table-column prop="tag" label="标签" align="center">
          <template v-slot="scope">
            <el-row v-for="item in scope.row.tag" :key="item">
              <el-col :span="24">{{item | tagFilter}}</el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.status"
              active-color="#13ce66"
              active-text="上架"
              inactive-text="下架"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="创建时间" width="103" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="更新时间" width="105" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150" align="center">
          <template v-slot="scope">
            <el-button @click="proDetail(scope.row.id)" type="text" size="small">详情</el-button>
            <el-button @click="proEdit(scope.row.id)" type="text" size="small">编辑</el-button>
            <el-button @click="proDelete(scope.row.id)" type="text" size="small" class="delbtn">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页条 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchProForm.pageNum"
        :page-sizes="[1, 2, 4, 8]"
        :page-size="searchProForm.pageSize"
        layout="prev, pager, next, jumper, -> , total, sizes"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 新增商品对话框 -->
    <el-dialog title="新增商品" :visible.sync="addDialogVisible" width="50%" modal>
      <el-form
        ref="editProFormRef"
        :model="editProForm"
        :rules="editProFormRules"
        label-width="80px"
      >
        <el-form-item label="商品编号">
          <el-input v-model="editProForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editProForm.name" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="editProForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="editProForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-checkbox-group v-model="editProForm.tag">
            <el-checkbox
              v-for="item in tagList"
              :key="item.value"
              :label="item.value"
            >{{ item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-radio-group v-model="editProForm.status">
            <el-radio :label="false">下架</el-radio>
            <el-radio :label="true">上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="editProFormHandler">提 交</el-button>
      </span>
    </el-dialog>
    <!-- 编辑对话框 -->
    <el-dialog title="编辑商品" :visible.sync="editDialogVisible" width="50%" modal>
      <el-form
        ref="editProFormRef"
        :model="editProForm"
        :rules="editProFormRules"
        label-width="80px"
      >
        <el-form-item label="商品编号">
          <el-input v-model="editProForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="editProForm.name" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="商品规格" prop="spec">
          <el-input v-model="editProForm.spec"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="editProForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品标签" prop="tag">
          <el-checkbox-group v-model="editProForm.tag">
            <el-checkbox
              v-for="item in tagList"
              :key="item.value"
              :label="item.value"
            >{{ item.label}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="商品状态" prop="status">
          <el-radio-group v-model="editProForm.status">
            <el-radio :label="false">下架</el-radio>
            <el-radio :label="true">上架</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="text" @click="editProFormHandler">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    // 验证价格
    let checkPrice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入价格"));
      }
      if (!/^\d+(\.\d{1,2})?$/.test(value)) {
        return callback(new Error("请输入整数或保留2位小数点的小数"));
      }
      callback();
    };
    return {
      tagList: [
        { label: "优惠", value: "discounts" },
        { label: "高档", value: "highclass" },
        { label: "推荐", value: "recommend" },
        { label: "热卖", value: "hotsale" }
      ],
      searchProForm: {
        pname: "",
        pspec: "",
        plabel: "",
        startTime: "",
        endTime: "",
        pageSize: 1,
        pageNum: 1
      },
      total: 11,
      beginTime: {
        disabledDate: time => {
          if (this.searchProForm.endTime) {
            return (
              time.getTime() > new Date(this.searchProForm.endTime).getTime()
            );
          } else {
          }
        }
      },
      overTime: {
        disabledDate: time => {
          if (this.searchProForm.startTime) {
            return (
              time.getTime() < new Date(this.searchProForm.startTime).getTime()
            );
          }
        }
      },
      productList0: [
        {
          id: 1,
          name: "苹果11456456456456456",
          spec: "a",
          price: "6799",
          rentNum: "12",
          purchases: "12",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 2,
          name: "苹果10",
          spec: "b",
          price: "1111",
          rentNum: "13",
          purchases: "6",
          uvNum: "2222",
          tag: ["recommend", "highclass"],
          status: false,
          startTime: "2019-9-6 14:48:33",
          updateTime: "2019-10-16 10:00:00"
        },
        {
          id: 3,
          name: "苹果9",
          spec: "c",
          price: "2222",
          rentNum: "22",
          purchases: "3",
          uvNum: "9999",
          tag: ["discounts", "hotsale"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2020-12-16 10:00:00"
        },
        {
          id: 4,
          name: "苹果8",
          spec: "d",
          price: "3333",
          rentNum: "33",
          purchases: "2",
          uvNum: "3333",
          tag: ["discounts", "highclass", "recommend", "hotsale"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 5,
          name: "苹果7",
          spec: "e",
          price: "4444",
          rentNum: "13",
          purchases: "12",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 6,
          name: "苹果6",
          spec: "a",
          price: "5555",
          rentNum: "32",
          purchases: "19",
          uvNum: "2222",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 7,
          name: "苹果5",
          spec: "b",
          price: "6666",
          rentNum: "654",
          purchases: "192",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 8,
          name: "苹果4",
          spec: "c",
          price: "7777",
          rentNum: "46",
          purchases: "12",
          uvNum: "1111",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 9,
          name: "苹果3",
          spec: "d",
          price: "88888",
          rentNum: "565",
          purchases: "126",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 10,
          name: "苹果2",
          spec: "abc",
          price: "9999",
          rentNum: "65",
          purchases: "125",
          uvNum: "123",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 11,
          name: "苹果1",
          spec: "abc",
          price: "8765",
          rentNum: "56",
          purchases: "121",
          uvNum: "321",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 12,
          name: "苹果12",
          spec: "abc",
          price: "4545",
          rentNum: "23",
          purchases: "102",
          uvNum: "333",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 13,
          name: "苹果11",
          spec: "a",
          price: "6799",
          rentNum: "12",
          purchases: "12",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 14,
          name: "苹果10",
          spec: "b",
          price: "1111",
          rentNum: "13",
          purchases: "6",
          uvNum: "2222",
          tag: ["recommend", "highclass"],
          status: false,
          startTime: "2019-9-6 14:48:33",
          updateTime: "2019-10-16 10:00:00"
        },
        {
          id: 15,
          name: "苹果9",
          spec: "c",
          price: "2222",
          rentNum: "22",
          purchases: "3",
          uvNum: "9999",
          tag: ["discounts", "hotsale"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2020-12-16 10:00:00"
        },
        {
          id: 16,
          name: "苹果8",
          spec: "d",
          price: "3333",
          rentNum: "33",
          purchases: "2",
          uvNum: "3333",
          tag: ["discounts", "highclass", "recommend", "hotsale"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 17,
          name: "苹果7",
          spec: "e",
          price: "4444",
          rentNum: "13",
          purchases: "12",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 18,
          name: "苹果6",
          spec: "a",
          price: "5555",
          rentNum: "32",
          purchases: "19",
          uvNum: "2222",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 19,
          name: "苹果5",
          spec: "b",
          price: "6666",
          rentNum: "654",
          purchases: "192",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 20,
          name: "苹果4",
          spec: "c",
          price: "7777",
          rentNum: "46",
          purchases: "12",
          uvNum: "1111",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 21,
          name: "苹果3",
          spec: "d",
          price: "88888",
          rentNum: "565",
          purchases: "126",
          uvNum: "9999",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 22,
          name: "苹果2",
          spec: "abc",
          price: "9999",
          rentNum: "65",
          purchases: "125",
          uvNum: "123",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 23,
          name: "苹果1",
          spec: "abc",
          price: "8765",
          rentNum: "56",
          purchases: "121",
          uvNum: "321",
          tag: ["discounts", "highclass"],
          status: false,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        },
        {
          id: 24,
          name: "苹果12",
          spec: "abc",
          price: "4545",
          rentNum: "23",
          purchases: "102",
          uvNum: "333",
          tag: ["discounts", "highclass"],
          status: true,
          startTime: "2019-12-6 14:48:33",
          updateTime: "2019-12-16 10:00:00"
        }
      ],
      productList: [],
      addDialogVisible: false,
      editDialogVisible: false,
      editProForm: {
        id: 0,
        name: "",
        spec: "",
        price: "",
        tag: [],
        status: false,
        updateTime: ""
      },
      editProFormRules: {
        name: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 1, max: 30, message: "长度在 1 到 30 个字符", trigger: "blur" }
        ],
        spec: [{ required: true, message: "请输入商品规格", trigger: "blur" }],
        price: [
          { validator: checkPrice, trigger: "blur" },
          { required: true, trigger: "blur" }
        ],
        tag: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {
    this.getProductList();
  },
  methods: {
    // 获取商品列表
    getProductList() {
      let { pname, pspec, plabel, startTime, endTime } = this.searchProForm;
      let proList1 = [];
      if (pname === "") proList1 = this.productList0;
      else {
        for (let product of this.productList0) {
          if (product.name.indexOf(pname) !== -1) proList1.push(product);
        }
      }
      let proList2 = [];
      if (pspec === "") proList2 = proList1;
      else {
        for (let product of proList1) {
          if (product.spec.indexOf(pspec) !== -1) proList2.push(product);
        }
      }
      let proList3 = [];
      if (plabel === "") proList3 = proList2;
      else {
        for (let product of proList2) {
          if (product.tag.indexOf(plabel) !== -1) proList3.push(product);
        }
      }
      let proList4 = [];
      if (startTime === "" || endTime === "") proList4 = proList3;
      else {
        for (let product of proList3) {
          if (
            new Date(startTime).getTime() <=
              new Date(product.startTime).getTime() &&
            new Date(endTime).getTime() >= new Date(product.startTime).getTime()
          )
            proList4.push(product);
        }
      }
      let result = [];
      let start, end;
      start = (this.searchProForm.pageNum - 1) * this.searchProForm.pageSize;
      end = start + this.searchProForm.pageSize;
      if (end > proList4.length) end = proList4.length;
      for (let i = start; i < end; i++) {
        result.push(proList4[i]);
      }
      this.productList = result;
      this.total = proList4.length;
    },
    // 点击搜索按钮搜索商品列表
    searchProducts() {
      this.getProductList();
    },
    // 重置搜索框
    resetSearchForm() {
      this.$refs.searchProForm.resetFields();
    },
    // 更改页大小
    handleSizeChange(newSize) {
      this.searchProForm.pageSize = newSize;
      this.getProductList();
    },
    // 更改页码
    handleCurrentChange(newNum) {
      this.searchProForm.pageNum = newNum;
      this.getProductList();
    },
    // 点击新增商品按钮
    proAdd(){
      this.addDialogVisible = true;
    },
    // 点击详情
    proDetail(id) {
      console.log(id, "详情");
    },
    // 点击编辑按钮弹出编辑商品对话框
    proEdit(id) {
      // 根据id获得商品参数显示在表单中
      this.productList0.forEach(item => {
        if (item.id === id) {
          let { id, name, spec, price, tag, status } = item;
          this.editProForm.id = id;
          this.editProForm.name = name;
          this.editProForm.spec = spec;
          this.editProForm.price = price;
          this.editProForm.tag = tag;
          this.editProForm.status = status;
          return false;
        }
      });
      this.editDialogVisible = true;
    },

    // 点击编辑商品对话框的提交按钮
    editProFormHandler() {
      this.$refs.editProFormRef.validate(valid => {
        if (valid) {
          let now = new Date();
          let y, M, d, h, m, s;
          y = now.getFullYear();
          M = now.getMonth() + 1;
          M < 10 && (M = "0" + M);
          d = now.getDate();
          d < 10 && (d = "0" + d);
          h = now.getHours();
          h < 10 && (h = "0" + h);
          m = now.getMinutes();
          m < 10 && (m = "0" + m);
          s = now.getSeconds();
          s < 10 && (s = "0" + s);
          let t = `${y}-${M}-${d} ${h}:${m}:${s}`;
          this.editProForm.updateTime = t;
          let {
            id,
            name,
            spec,
            price,
            tag,
            status,
            updateTime
          } = this.editProForm;
          for (let product of this.productList0) {
            if (product.id === id) {
              product.name = name;
              product.spec = spec;
              product.price = price;
              product.tag = tag;
              product.status = status;
              product.updateTime = updateTime;
            }
          }
          this.$message.success("编辑成功");
          this.getProductList();
          this.editDialogVisible = false;
        }
      });
    },
    // 删除商品
    proDelete(id) {
      //根据id重新发起请求获取商品名称
      this.productList0.forEach((item, i) => {
        if (item.id == id) {
          this.$confirm(`确认删除"${item.name}"`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          })
            .then(res => {
              this.productList0.splice(i, 1);
              this.getProductList();
              this.$message.success("删除成功");
            })
            .catch(err => this.$message.info("已取消删除"));
          return false; //退出循环
        }
      });
    }
  },
  filters: {
    tagFilter(val) {
      switch (val) {
        case "discounts":
          return "优惠";
          break;
        case "highclass":
          return "高档";
          break;
        case "recommend":
          return "推荐";
          break;
        default:
          return "热卖";
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.delbtn {
  color: red;
}
</style>