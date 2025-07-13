# 表格封装

## 基础表格封装

以下是基础表格封装的代码，包含了表格工具栏插槽、表格底部插槽等功能。基于 ElementUI 表格组件和分页组件封装

### 表格组件源码

[gitee 传送门](https://gitee.com/zheng1657955621/vue2-components-demo/blob/master/src/components/CustomTable/index.vue)

```vue
<template>
  <div>
    <!-- 工具栏 支持插槽 toolbarLeft toolbarRight -->
    <section class="table__toolbar">
      <div class="toolbar__left">
        <slot name="toolbarLeft" />
      </div>
      <div class="toolbar__right">
        <slot name="toolbarRight" />
      </div>
    </section>
    <!-- 表格主体 -->
    <section class="table__body">
      <el-table v-bind="$attrs" v-on="$listeners" :border="border">
        <!-- el-table的empty插槽， 表格空数据时显示的内容， -->
        <template #empty>
          <slot name="empty" />
        </template>
        <!-- el-table的append插槽， 表格底部追加的内容， -->
        <template #append>
          <slot name="append" />
        </template>
        <!-- 递归组件：table-column -->
        <table-column
          v-for="(col, index) in columns"
          :key="col.key || `table-column-${col.prop || index}`"
          :column="col"
          :scopedSlots="$scopedSlots"
        >
        </table-column>
      </el-table>
    </section>
    <!-- 表格底部 分页 支持插槽 footer -->
    <section class="table__footer">
      <slot name="footer">
        <el-pagination
          v-if="pagination"
          :current-page="pageNumber"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </section>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  components: {
    TableColumn: () => import("./components/TableColumn.vue"),
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
     *     key?: 唯一标识
     *     slot?: 插槽名称
     *     headerSlot?: 表头插槽名称
     *     render?: 自定义渲染函数
     *     children?: 多级表头
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
      default: false,
    },
    /**
     * 分页大小, 支持 .sync 修饰符
     */
    pageSize: {
      type: Number,
      default: 10,
    },
    /**
     * 分页页码, 支持 .sync 修饰符
     */
    pageNumber: {
      type: Number,
      default: 1,
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
      this.$emit("update:pageSize", pageSize);
      // 重置页码为 1
      this.$emit("update:pageNumber", 1);
      this.$emit("page-change", { pageNumber: 1, pageSize });
    },
    /**
     * 分页页码改变
     * @param {Number} pageNumber 当前页码
     */
    handleCurrentChange(pageNumber) {
      this.$emit("update:pageNumber", pageNumber);
      this.$emit("page-change", { pageNumber });
    },
  },
};
</script>

<style lang="scss" scoped>
.table__toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}
.table__body {
  margin-bottom: 8px;
}
</style>
```

### 表格列组件源码

[gitee 传送门](https://gitee.com/zheng1657955621/vue2-components-demo/blob/master/src/components/CustomTable/components/TableColumn.vue)

```vue
<script>
export default {
  name: "TableColumn",
  inheritAttrs: false,
  props: {
    // 列配置
    column: {
      type: Object,
      required: true,
    },
    // 插槽
    scopedSlots: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    /**
     * 渲染多级表头列
     * @param h
     */
    renderMultiHeaderColumn(h) {
      const { column, scopedSlots } = this;
      return h(
        "el-table-column",
        {
          props: { align: "center", ...column },
          scopedSlots: {
            header: (scope) => this.renderHeader(column, scope),
          },
        },
        column.children.map((child, i) =>
          h("TableColumn", {
            key: child.key || `table-column-${child.prop || i}`,
            props: { column: child, scopedSlots },
          })
        )
      );
    },
    /**
     * 渲染单列
     * @param h
     */
    renderSingleColumn(h) {
      const { column } = this;
      return ["index", "selection"].includes(column.type)
        ? this.renderSpecialColumn(h)
        : this.renderNormalColumn(h);
    },
    /**
     * 渲染特殊列
     * @param h
     */
    renderSpecialColumn(h) {
      return h("el-table-column", {
        props: { align: "center", ...this.column },
      });
    },
    /**
     * 渲染普通列
     * @param h
     */
    renderNormalColumn(h) {
      return h("el-table-column", {
        props: { align: "center", ...this.column },
        scopedSlots: {
          header: (scope) => this.renderHeader(this.column, scope),
          default: (scope) => this.renderCell(h, scope),
        },
      });
    },
    /**
     * 渲染表头
     * @param {Object} col 列配置
     * @param {Object} scope 表头作用域
     */
    renderHeader(col, { column, $index }) {
      const name = col.headerSlot;
      if (name) {
        // 使用表头插槽
        return this.scopedSlots[name]?.({ column, $index }) || column.label;
      } else {
        // 默认表头渲染
        return column.label;
      }
    },
    /**
     * 渲染单元格
     * @param h
     * @param scope
     */
    renderCell(h, scope) {
      const { row, column, $index } = scope;
      if (this.column.render) {
        // 使用render函数渲染
        return this.column.render(h, { row, column, $index });
      } else if (this.column.slot) {
        // 使用插槽渲染
        return this.scopedSlots[this.column.slot]?.({
          row,
          column,
          $index,
        });
      } else {
        if (this.column.formatter) {
          // 使用formatter函数格式化
          return this.column.formatter(
            row,
            column,
            row[this.column.prop],
            $index
          );
        } else {
          // 默认渲染
          return row[this.column.prop] ?? "-";
        }
      }
    },
  },
  render(h) {
    const col = this.column;
    if (col.children?.length) {
      return this.renderMultiHeaderColumn(h);
    } else {
      return this.renderSingleColumn(h);
    }
  },
};
</script>
```

## 使用示例

[gitee-传送门](https://gitee.com/zheng1657955621/vue2-components-demo/blob/master/src/views/table/index.vue)

```vue
<template>
  <div>
    <CustomTable
      :pageNumber.sync="tableProps.pageNumber"
      :pageSize.sync="tableProps.pageSize"
      v-bind="tableProps"
      @page-change="onPageChange"
    >
      <template #nameHeader="{ column }">
        <span>{{ column.label }}-自定义表头</span>
      </template>
      <template #jobHeader="{ column }">
        <span>{{ column.label }}-多级表头自定义</span>
      </template>
      <template #companyName="{ row, column, $index }">
        <span>{{ `${row[column.property]}-${$index}` }}</span>
      </template>
    </CustomTable>
  </div>
</template>

<script>
export default {
  name: "Table",
  components: {
    CustomTable: () => import("@/components/CustomTable"),
  },
  data() {
    return {
      tableProps: {
        loading: false,
        pagination: true, // 开启分页
        pageNumber: 1,
        pageSize: 10,
        total: 0, // 表格数组总数
        maxHeight: "600px",
        data: [],
        columns: [
          {
            label: "序号",
            type: "index",
            width: "60px",
          },
          {
            type: "selection",
            width: "44px",
          },
          {
            label: "姓名",
            prop: "name",
            headerSlot: "nameHeader", // 表头插槽
          },
          {
            label: "性别",
            prop: "gender",
            // 列 render函数写法
            render: (h, { row }) => {
              return h(
                "el-tag",
                {
                  props: {
                    type: row.gender === "男" ? "" : "danger",
                  },
                },
                row.gender
              );
            },
          },
          {
            label: "工作信息",
            minWidth: "200px",
            // 多级表头
            children: [
              {
                label: "公司名称",
                prop: "companyName",
                slot: "companyName", // 列插槽名称
              },
              {
                label: "职位",
                prop: "job",
                headerSlot: "jobHeader", // 表头插槽名称
              },
              {
                label: "入职时间",
                prop: "entryTime",
                // 表头格式化
                formatter: (row, column, cellValue) => {
                  return `【${cellValue}】`;
                },
              },
            ],
          },
          {
            label: "操作",
            prop: "action",
            render: (h, { row, column, $index }) => {
              return h("span", [
                h(
                  "el-button",
                  {
                    props: { type: "text" },
                    on: {
                      click: () => {
                        console.log("编辑", row, column, $index);
                      },
                    },
                  },
                  "编辑"
                ),
                h(
                  "el-button",
                  {
                    props: { type: "text", link: true },
                    on: {
                      click: () => {
                        console.log("删除", row, column, $index);
                      },
                    },
                  },
                  "删除"
                ),
              ]);
            },
          },
        ],
      },
    };
  },
  created() {
    this.fetchTableData();
  },
  methods: {
    /**
     * 表格分页变化
     */
    onPageChange() {
      this.fetchTableData();
    },
    /**
     * 获取表格数据
     */
    async fetchTableData() {
      try {
        this.tableProps.loading = true;
        const { pageNumber, pageSize } = this.tableProps;
        const reqData = {
          pageNumber,
          pageSize,
        };
        const { total, rows } = await this.getList(reqData);
        this.tableProps.data = rows;
        this.tableProps.total = total;
      } catch (err) {
        console.error(err);
      } finally {
        this.tableProps.loading = false;
      }
    },
    /**
     * 模拟接口请求
     * @param data 请求参数
     */
    getList(data) {
      console.log("请求参数", data);
      const { pageSize } = data;
      const temp = Array.from({ length: pageSize }).map((item, index) => {
        return {
          name: `姓名${index + 1}`,
          age: 20 + index,
          gender: index % 2 === 0 ? "男" : "女",
          companyName: `公司${String.fromCharCode(65 + (index % 4))}`,
          job: ["开发", "设计", "测试", "产品"][index % 4],
          entryTime: `202${index % 3}-0${(index % 3) + 1}-01`,
        };
      });
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            total: 100,
            rows: temp,
          });
        }, 1200);
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
```

## 效果展示

![An image](/images/notes/component-table.gif)

## 表格合并工具函数

```js
// 返回合并的数据，如[2, 0, 2, 0]
const getSpanArr = (tableData, prop) => {
  const spanArr = []; // 控制合并的数组
  let index = 0; // 设置索引
  const values = tableData.map((v) => v[prop]);
  // 将 ['1001', '1001', '1002', '1002'] 转换为 [2, 0, 2, 0]
  values.reduce((old, cur, i) => {
    if (cur === old) {
      spanArr[index] += 1;
      spanArr.push(0);
    } else {
      spanArr.push(1);
      index = i;
    }
    return cur;
  }, "");
  return spanArr;
};

const separator = "****"; // 分隔符
/*
  根据prop属性，合并内容相同的行
  入参：
    1. el-table span-method属性自带的{ row, column, rowIndex, columnIndex }
    2. 数据源
    3. 需要合并的列
*/
const mergeRowByProp = (
  { row, column, rowIndex, columnIndex },
  tableData,
  mergeList
) => {
  // 如果合并的列数大于1，需要对数据进行改造，使后面的列依赖于前面的列
  if (mergeList.length > 1) {
    tableData = JSON.parse(JSON.stringify(tableData));
    tableData.forEach((item) => {
      mergeList.forEach((m, i) => {
        const { prop } = m;
        if (i) {
          // 当前列的内容拼接上前一列的内容，使用分隔符隔开
          // 分隔符的作用只是为了打印数据时看的方便点，加不加都行
          item[prop] = `${item[mergeList[i - 1].prop]}${separator}${
            item[mergeList[i].prop]
          }`;
        }
      });
    });
  }
  for (const { column, prop } of mergeList) {
    if (columnIndex === column) {
      const spanArr = getSpanArr(tableData, prop);
      const rowspan = spanArr[rowIndex];
      const colspan = rowspan > 0 ? 1 : 0;
      return { rowspan, colspan };
    }
  }
};
export { mergeRowByProp };
```

## 推荐文章

1. [vue2 + Element-ui 二次封装 Table 组件，打造通用业务表格](https://juejin.cn/post/7434890408545304603)
2. [封装 element-ui 表格，我是这样做的](https://juejin.cn/post/6854573219890872328#heading-6)
3. [Element-ui](https://element.eleme.cn/#/zh-CN/component/table)
4. [el-table 合并单元格，多列合并。封装 mergeRowByProp 方法](https://juejin.cn/post/7367292352274825255?searchId=20250612230732F43EC307955F29EA40EF)
