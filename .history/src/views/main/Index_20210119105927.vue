<template>
    <div class="control-panel-header">
        
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
