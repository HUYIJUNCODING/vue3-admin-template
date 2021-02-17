// vuex.d.ts
import { Store } from "vuex";
import { State } from "@/store";
import { IMessage } from 'element-plus/lib/el-message/src/types';
declare module "@vue/runtime-core" {
    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<State>;
        $message: IMessage;
    }
}
