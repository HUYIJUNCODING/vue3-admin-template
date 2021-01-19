<template>
    <div class="control-panel-header">
        <el-row>
            <el-col :span="12" class="row-flex row-flex-start row-flex-middle">
                <span class="label">选择日期:</span>
                <el-date-picker
                    v-model="filterKeys.dateRange"
                    type="daterange"
                    size="small"
                    align="center"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :disabledDate="handleDisabledDate"
                    @change="handleDateChange"
                >
                </el-date-picker>
            </el-col>
            <el-col :span="12" class="row-flex row-flex-end">
                <el-select
                    v-model="filterKeys.prefix"
                    clearable
                    filterable
                    size="samll"
                    placeholder="请输入报警名称"
                >
                    <el-option
                        v-for="item in database.prefixList"
                        :key="item"
                        :value="item"
                        @change="handlePrefixChange"
                    >
                        {{ item }}
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="error-type-box row-flex row-flex-start">
            <el-col :span="24" class="row-flex row-flex-start row-flex-middle">
                <span class="label">错误类型:</span>
                <el-select
                    v-model="filterKeys.selectedErrorNameList"
                    multiple
                    filterable
                    size="large"
                    placeholder="请选择错误类型"
                    @change="handleSelectErrorNameChange"
                >
                    <el-option
                        v-for="item in database.errorDistributionList"
                        :value="item.error_name"
                        :key="item.error_name"
                    >
                        ({{ item.error_count }})
                        {{ item.error_name.slice(0, 30) }}
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
    </div>
    <div class="control-panel-body"></div>
</template>

<script lang="ts">
import _ from 'lodash';
import moment from "moment";
import * as ErrorApi from '../../api/error';
import DATE_FORMAT from '../../constants/date_format';
import DataSet from '@antv/data-set'

import { defineComponent, ref, reactive, computed, watchEffect } from "vue";

export default defineComponent({
    setup() {
        const data = reactive({
            filterKeys: {
                dateRange: [
                    moment()
                        .subtract(7, "days")
                        .format("YYYY-MM-DD"),
                    moment()
                        .subtract(1, "days")
                        .format("YYYY-MM-DD")
                ],
                prefix: "",
                selectedErrorNameList: []
            },
            database: {
                prefixList: [],
                errorDistributionList: []
            }
        });
        //设置日期禁用状态，参数为当前日期，要求返回 Boolean
        const handleDisabledDate = (date: any) => {
            return true;
        };
        const handlePrefixChange = (str: any) => {
            return "";
        };
        const handleSelectErrorNameChange = () => {
            return "";
        };

        return {
            filterKeys: data.filterKeys,
            database: data.database,
            handleDisabledDate,
            handlePrefixChange,
            handleSelectErrorNameChange
        };
    }
});
</script>

<style lang="scss">
.control-panel-header {
    padding: 15px;
    background-color: $box-bg;
    
    .label {
        padding-right: 10px;
    }
    .error-type-box {
        padding-top: 30px;
    }
}
</style>
