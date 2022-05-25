<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">
        <el-col :span="5">
          <el-input v-model="page.str" placeholder="请输入分类名称" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" @click="isCreate = true" class="el-icon-plus">
            添加分类</el-button>
        </el-col>
        <el-col :span="2.5">
          <template>
            <el-popconfirm title="确认删除选中行吗?" @confirm='handleDelete_many()'>
              <el-button slot="reference" type="danger" class="el-icon-delete" > 批量删除</el-button>
            </el-popconfirm>
          </template>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- <el-table-column prop="id" label="编号" width="70"> </el-table-column> -->
          <el-table-column prop="good_typename" label="分类名称" min-width="120" align='center'>
          </el-table-column>
          <el-table-column prop="goods_count" label="商品数量" min-width="80" align='center'>
          </el-table-column>
          <el-table-column prop="sort" label="显示顺序" min-width="80" align='center'>
          </el-table-column>
          <el-table-column prop="status" label="状态" min-width="80" align='center'>
            <template slot-scope="scope">
              <el-tag class="primary" v-if="scope.row.status == '销售中'">{{scope.row.status}}</el-tag>
              <el-tag type="danger" v-if="scope.row.status == '已下架'">{{scope.row.status}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态开关" min-width="80" align='center'>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :active-value='"销售中"' :inactive-value='"已下架"' active-color="#13ce66"  @change='type_update(scope.row)'>
              </el-switch>
            </template>
          </el-table-column>

          <!-- 表单操作区域 -->
          <el-table-column  label="操作" fixed="right" :width="$isPhone?'110':'150'">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.$index, scope.row)" type="text" size="small" class="el-icon-edit">编辑</el-button>
              <template>
                <el-popconfirm style="margin-left:10px;" title="确认删除吗?" @confirm='handleDelete(scope.$index, scope.row)'>
                  <el-button slot="reference" type="text" size="small" class="el-icon-delete">删除</el-button>
                </el-popconfirm>
              </template>

            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10, 20, 50, 100, 500]" :page-size="page.limit" layout="total, sizes,prev, pager, next,jumper" :total="count" style="margin-top: 20px">
          </el-pagination>
        </div>
      </div>
    </el-card>
    <!-- 弹出框【增】 -->
    <el-dialog title="添加分类" :visible.sync="isCreate" width="400px" :close-on-click-modal="false" @close="close()">
      <typeUpdate :id="0"> </typeUpdate>
    </el-dialog>
    <!-- 弹出框【改】 -->
    <el-dialog title="编辑分类" :visible.sync="isEdit" width="400px" :close-on-click-modal="false" @close="close()">
      <typeUpdate :id="id" :key="id"> </typeUpdate>
    </el-dialog>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import typeUpdate from './type_update'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    typeUpdate,
  },
  data() {
    return {
      id: null,
      form: [],
      //   必须的数据
      page: {
        // 分页查询的数据
        offset: 1,
        limit: 10,
        where: {},
      },
      count: 20,
      isCreate: false,
      isEdit: false,
      selection_rows: [],
    };
  },
  created() {
    this.page.where = this.$route.params;
    this.getPage();
  },
  methods: {
    // 分页查询方法
    handleSizeChange(val) {
      this.page.limit = val;
      this.getPage();
    },
    handleCurrentChange(val) {
      this.page.offset = val;
      this.getPage();
    },
    // 查
    async getPage() {
      let res = await request({
        url: "/merchant/good_type/page",
        method: 'get',
        params: this.page,
      });
      this.form = res.data.data.rows;
      this.count = res.data.data.count;
      return;
    },
    // 改
    handleUpdate(index, row) {
      this.id = row.id;
      this.isEdit = true;
    },
    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/merchant/good_type",
        method: 'delete',
        data: { id: row.id },
      });
      this.getPage();
    },
    // 多选
    handleSelectionChange(rows) {
      this.selection_rows = rows.map(i => i.id)
    },
    // 批量删除
    async handleDelete_many() {
      let res = await request({
        url: "/merchant/good_type/many",
        method: 'delete',
        data: {
          id: this.selection_rows,
        },
      })
      this.getPage();
    },
    // 关闭弹框 回调 重新请求数据
    close() {
      this.getPage();
    },
    //========================== 以上是必须的方法 ======================================
    // 商品分类状态开关
    async type_update(good_type) {
      let res = await request({
        url: "/merchant/good_type",
        method: "put",
        data: good_type,
      });
    }
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
