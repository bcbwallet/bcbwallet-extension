import { Popup, MessageBox } from 'mint-ui';
import { PopupAPI } from '@bcbconnect/lib/api';

import Loading from '../../components/loading';

export default {
    name: 'NetworkModal',
    components: { Loading, Popup },
    model: {
        prop: 'value',
        event: 'close'
    },
    props: {
        value: Boolean
    },
    data() {
        return {
            isLoading: false,
            isShow: this.value,
            name: '',
            url: '',
            chainId: ''
        };
    },
    methods: {
        // 关闭模态框
        close() {
            this.$emit('close', false);
            this.isShow = false;
        },
        // 提交数据
        async submit() {
            let { name, url, chainId } = this;
            if (!name) return MessageBox.alert(this.$t('lang.network.enterNetworkName'));
            if (!url) return MessageBox.alert(this.$t('lang.network.enterNodeUrl'));

            try {
                let data = { name, url, chainId };

                this.isLoading = true;
                let result = await PopupAPI.addNetwork(data);
                this.isLoading = false;
                // console.log('addNetwork result:', result);
                this.$emit('close', false);
                this.$emit('submit', result);
            } catch (error) {
                console.log('addNetwork error:', error);
                MessageBox.alert(error.message);
                this.isLoading = false;
            }
        }
    },
    watch: {
        value(value) {
            this.isShow = value;
        }
    }
};
