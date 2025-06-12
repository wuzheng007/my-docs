# 表格封装

## 基础表格封装
以下是基础表格封装的代码，包含了表格头部插槽、表格底部插槽等功能。基于ElementUI表格组件和分页组件封装
```vue
<template>
  <div>
    <!-- 表格头部 支持插槽 headerLeft headerRight -->
    <div class="table-header">
      <div class="table-header__lf">
        <slot name="headerLeft" />
      </div>
      <div class="table-header__ri">
        <slot name="headerRight" />
      </div>
    </div>
    <!-- 表格主体 -->
    <div class="table-body">
      <el-table v-bind="$attrs" :border="border" v-on="$listeners">
        <!-- el-table的empty插槽， 表格空数据时显示的内容， -->
        <template slot="empty">
          <slot name="empty" />
        </template>
        <!-- el-table的append插槽， 表格底部追加的内容， -->
        <template slot="append">
          <slot name="append" />
        </template>

        <template v-for="(column, index) in columns">
          <el-table-column
            :key="`${column.prop || column.type || column.slotName}${index}`"
            v-bind="column"
            :align="column.align || 'center'"
          >
            <!-- 列 多级表头-->
            <template v-if="column.children">
              <el-table-column
                v-for="(child, i) in column.children"
                :key="`${child.prop || child.type || child.slotName}-${index}-${i}`"
                v-bind="child"
                :align="column.align || 'center'"
              >
                <template v-if="child.slotName || child.render" #default="scope">
                  <!-- 列 插槽-->
                  <slot v-if="child.slotName" :name="child.slotName" v-bind="scope"/>
                  <!-- 列 render函数 -->
                  <expand-dom v-if="child.render" :column="scope.column" :row="scope.row" :render="child.render" :index="scope.$index" />
                </template>
              </el-table-column>
            </template>
            <template v-if="column.slotName || column.render" #default="scope">
              <!-- 列 插槽-->
              <slot v-if="column.slotName" :name="column.slotName" v-bind="scope"/>
              <!-- 列 render函数 -->
              <expand-dom v-if="column.render" :column="scope.column" :row="scope.row" :render="column.render" :index="scope.$index"/>
            </template>
          </el-table-column>
        </template>
      </el-table>
    </div>
    <!-- 表格底部 分页 支持插槽 footer -->
    <div class="table-footer">
      <slot name="footer">
        <el-pagination
          v-if="pagination"
          :current-page="pageParams.pageNum"
          :page-size="pageParams.pageSize"
          :page-sizes="[10, 20, 30, 40, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    expandDom: {
      functional: true,
      props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
          type: Object,
          default: null,
        },
      },
      render: (h, ctx) => {
        const defaultParams = {
          row: ctx.props.row, // 行数据
          column: ctx.props.column, // 列数据
          index: ctx.props.index, // 行索引
        };
        return ctx.props.render(h, defaultParams);
      },
    },
  },
  props: {
    border: {
      type: Boolean,
      default: true,
    },
    /**
     * 表格列配置，列的每一项在el-table-column的基础上扩展了一些属性，具体如下：
     * const columns = [
     *   {
     *     ... // el-table-column的属性
     *     slotName: 插槽名称
     *     render: 自定义渲染函数
     *     children: 多级表头
     *   }
     * ]
     */
    columns: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
    /**
     * 是否开启分页
     */
    pagination: {
      type: Boolean,
      default: true,
    },
    /**
     * 分页参数，支持sync修饰符
     * pageNum: 当前页码
     * pageSize: 每页显示条数
     */
    pageParams: {
      type: Object,
      default: () => ({
        pageNum: 1,
        pageSize: 10,
      }),
    },
    /**
     * 表格数据总条数
     */
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    /**
     * 分页大小改变
     * @param {Number} pageSize 每页显示条
     */
    handleSizeChange(pageSize) {
      const data = {
        pageNum: 1,
        pageSize,
      };
      this.$emit("update:pageParams", data);
      // 分页变化时，触发事件
      this.$emit("paginationChange", data);
    },
    /**
     * 分页页码改变
     * @param {Number} pageNum 当前页码
     */
    handleCurrentChange(pageNum) {
      const data = {
        pageNum,
        pageSize: this.pageParams.pageSize,
      };
      this.$emit("update:pageParams", data);
      // 分页变化时，触发事件
      this.$emit("paginationChange", data);
    },
  },
};
</script>

<style lang="scss" scoped>
.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.table-body {
  margin-bottom: 8px;
}
</style>
```

## 表格合并工具函数
```js
// 返回合并的数据，如[2, 0, 2, 0]
const getSpanArr = (tableData, prop) => {
  const spanArr = [] // 控制合并的数组
  let index = 0 // 设置索引
  const values = tableData.map(v => v[prop])
  // 将 ['1001', '1001', '1002', '1002'] 转换为 [2, 0, 2, 0]
  values.reduce((old, cur, i) => {
    if (cur === old) {
      spanArr[index] += 1
      spanArr.push(0)
    } else {
      spanArr.push(1)
      index = i
    }
    return cur
  }, '')
  return spanArr
}

const separator = '****' // 分隔符
/*
  根据prop属性，合并内容相同的行
  入参：
    1. el-table span-method属性自带的{ row, column, rowIndex, columnIndex }
    2. 数据源
    3. 需要合并的列
*/
const mergeRowByProp = ({ row, column, rowIndex, columnIndex }, tableData, mergeList) => {
  // 如果合并的列数大于1，需要对数据进行改造，使后面的列依赖于前面的列
  if (mergeList.length > 1) {
    tableData = JSON.parse(JSON.stringify(tableData))
    tableData.forEach(item => {
      mergeList.forEach((m, i) => {
        const { prop } = m
        if (i) {
          // 当前列的内容拼接上前一列的内容，使用分隔符隔开
          // 分隔符的作用只是为了打印数据时看的方便点，加不加都行
          item[prop] = `${item[mergeList[i - 1].prop]}${separator}${item[mergeList[i].prop]}`
        }
      })
    })
  }
  for (const { column, prop } of mergeList) {
    if (columnIndex === column) {
      const spanArr = getSpanArr(tableData, prop)
      const rowspan = spanArr[rowIndex]
      const colspan = rowspan > 0 ? 1 : 0
      return { rowspan, colspan }
    }
  }
}
export { mergeRowByProp }
```

## 参考链接
1. [vue2 + Element-ui 二次封装 Table 组件，打造通用业务表格](https://juejin.cn/post/7434890408545304603)
2. [Element-ui](https://element.eleme.cn/#/zh-CN/component/table)
3. [el-table合并单元格，多列合并。封装mergeRowByProp方法](https://juejin.cn/post/7367292352274825255?searchId=20250612230732F43EC307955F29EA40EF)