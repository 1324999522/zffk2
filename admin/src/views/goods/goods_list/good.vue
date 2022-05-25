<template>
  <div>
    <!-- 主体 -->
    <el-card>
      <!-- 搜索 添加 等功能区域-->
      <el-row :gutter="20" style="margin-bottom: 20px">

        <el-col :span="3">
          <el-select v-model="page.goodTypeId" placeholder="请选择分类" @change="getPage()">
            <el-option v-for="item in good_types" :key="item.id" :label="item.good_typename" :value="item.id"></el-option>
          </el-select>
        </el-col>
        <el-col :span="3">
          <el-select v-model="page.status" placeholder="请选择状态" @change="getPage()">
            <el-option v-for="item in ['销售中','已下架']" :key="item" :label="item" :value="item"></el-option>

          </el-select>
        </el-col>
        <el-col :span="4">
          <el-input v-model="page.str" placeholder="请输入商品名称" clearable> </el-input>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
        </el-col>
        <el-col :span="2.5">
          <el-button type="primary" @click="$router.push('/goods/good_update')" class="el-icon-plus">
            添加商品</el-button>
        </el-col>
        <el-col :span="2.5">
          <template>
            <el-popconfirm title="确认删除选中行吗?" @confirm='handleDelete_many()'>
              <el-button slot="reference" type="danger" class="el-icon-delete"> 批量删除</el-button>
            </el-popconfirm>
          </template>
        </el-col>
      </el-row>

      <div>
        <!-- 表格主体 区域-->
        <el-table :data="form" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"> </el-table-column>
          <!-- <el-table-column prop="id" label="id" width="70"> </el-table-column> -->
          <el-table-column prop="name" label="商品名称" min-width="180" align='center'>
            <template slot-scope="scope">
              {{scope.row.goodname}}
              <div v-if="scope.row.is_proxy_good === 1">
                <span style="color:var(--main_color);">
                  ( 代理商品 )
                </span>

              </div>
            </template>
          </el-table-column>
          <el-table-column prop="price" label="销售价格" min-width="90" align='center'>
            <template slot-scope="scope"> {{ scope.row.price}} 元 <div v-if="scope.row.is_proxy === 1">
              </div></template>
          </el-table-column>
          <el-table-column prop="noUse" label="库存" min-width="70" align='center'>
            <template slot-scope="scope">
              <el-tag v-if="scope.row.noUse > 0">{{ scope.row.noUse }}</el-tag>
              <el-tag type="danger" v-if="scope.row.noUse <= 0">{{scope.row.noUse}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="good_typename" label="商品分类" min-width="120" align='center'>
          </el-table-column>
          <el-table-column prop="use" label="已用" min-width="70" align='center'>
          </el-table-column>
          <el-table-column prop="count" label="总数" min-width="70" align='center'></el-table-column>
          <el-table-column prop="sort" label="排序" min-width="70" align='center'></el-table-column>
          <el-table-column prop="status" label="状态" width="90" align='center'>
            <template slot-scope="scope">

              <el-tag v-if="scope.row.status == '销售中'">{{scope.row.status}}</el-tag>
              <el-tag type="danger" v-if="scope.row.status == '已下架'">{{scope.row.status}}</el-tag>

            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态开关" width="80" align='center'>
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" :active-value='"销售中"' :inactive-value='"已下架"' active-color="#13ce66" @change='good_update(scope.row)'>
              </el-switch>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="createdAt" label="创建时间" min-width="120" :show-overflow-tooltip="true" align='center'>
            <template slot-scope="scope">{{ scope.row.createdAt.replace(new Date().getFullYear()+'-','') }} </template>
          </el-table-column> -->
          <!-- 表单操作区域 -->
          <el-table-column v-if="true" :fixed="!$isPhone?'right':false" label="操作" width="300">
            <template slot-scope="scope">
              <el-tag v-if="(scope.row.pr_id>0)" style="margin:0px 20px;" type="warning">代理商品 </el-tag>

              <el-button v-if="!(scope.row.pr_id>0)" @click="handleCardAdd(scope.$index, scope.row)" type="text" size="small" class="el-icon-edit">添加卡密</el-button>
              <el-button v-if="!(scope.row.pr_id>0)" @click="handleCardAdmin(scope.$index, scope.row)" type="text" size="small" class="el-icon-edit">卡密管理</el-button>

              <el-button @click="handleUpdate(scope.$index, scope.row)" v-if="!$isPhone" type="text" size="small" class="el-icon-edit">编辑</el-button>
              <template>
                <el-popconfirm style="margin-left:10px;" title="确认删除吗?" @confirm='handleDelete(scope.$index, scope.row)'>
                  <el-button slot="reference" type="text" size="small" class="el-icon-delete">删除</el-button>
                </el-popconfirm>
              </template>

            </template>
          </el-table-column>

          <!-- 表单操作区域 -->
          <el-table-column v-if="$isPhone" fixed="right" width="60">
            <template slot-scope="scope">
              <el-button @click="handleUpdate(scope.$index, scope.row)" type="text" size="small" class="el-icon-edit">编辑</el-button>
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

  </div>
</template>

<script>
import { request } from "@/network/request.js";
import goodUpdate from './good_update'
// import cardAdmin2 from '@/views/main/cardAdmin2.vue'

export default {
  components: {
    goodUpdate,
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
      },
      count: 20,
      selection_rows: [],
      good: {},
      good_types: [],
    };
  },
  created() {
    this.page.where = this.$route.params;
    this.getPage();
    this.get_good_types()
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
        url: "/merchant/good/page",
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

      this.$router.push({
        name: 'good_update',
        params: {
          id: row.id,
        }
      })

    },
    // 删
    async handleDelete(index, row) {
      let res = await request({
        url: "/merchant/good",
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
        url: "/merchant/good/many",
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
    async get_good_types() {
      let res = await request({
        url: '/merchant/good_type/all',
        method: 'get',
      })
      this.good_types = res.data.data
    },
    // 添加卡密方法
    handleCardAdd(index, row) {
      this.$router.push({
        name: 'cards_add',
        params: {
          good: row
        }
      })
    },
    // 打开卡密管理
    handleCardAdmin(index, row) {
      this.$router.push({
        name: 'cards',
        params: {
          good: row
        }
      })
    },
    // 商品状态开关
    async good_update(good) {
      let res = await request({
        url: "/merchant/good",
        method: "put",
        data: good,
      });
      if (res.data.code !== 0) {
        good.status = `已下架`
      }
    },
  },
  computed: {},
};
</script>

<style lang="less" >
</style>
