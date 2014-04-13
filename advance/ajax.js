// 下記を参考にしてサイトで配布されているスクリプトを変更。
// Christian Johansen (著), 長尾高弘 (翻訳) 『テスト駆動JavaScript』 ASCII
// http://tddjs.com/
jQuery(function($) {
    /**
     * Appで非同期通信を行うajaxオブジェクト
     */
    var ajax = App.namespace('ajax');

    (function() {

        // ajaxオブジェクトを取得。

        // クロスブラウザ対策
        var xhrType = [
            function() {
                return new ActiveXObject('Microsoft.XMLHTTP');
            }, function() {
                return new XMLHttpRequest();
            }
        ];

        // 機能検出でクロスブラウザに対応する
        // option[i]()でXMLHttpRequestの生成に成功したらajax.createに設定
        var i, l, xhr;
        for (i = 0, l = xhrType.length; i < l; i++) {
            try {
                xhr = xhrType[i]();
                ajax.create = xhrType[i];
                break;
            } catch(e) {
                // nothing
            }
        }

        // onreadystatechangeの成功(レスポンスコード200)用ハンドラ
        function requestComplete(transport, options) {
            if (transport.status === 200) {
                options.success(transport);
            }
        }

        /** 
         * 非同期通信処理の公開メソッド
         *
         * @param {String} url 送信先アドレス
         * @param {Object} options リクエストオブジェクト  
         * <p>リクエストオブジェクトは下記のプロパティを持つオブジェクト。</p>
         * <li>success 成功時のハンドラ</li>
         * <li>data ポストデータ(key1=value1&key2=value2...をパーセントエンコードした文字列)</li>
         * <li>method フォームのmethod。AppはPOSTのみを使う</li>
         */
        function request(url, options) {
            if (typeof url !== 'string') {
                throw new TypeError('URL should be string');
            }
            if (options.method !== 'POST') {
                throw new TypeError('method is only post');
            }
            var transport = ajax.create();
            transport.open(options.method, url, true);
            transport.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            transport.setRequestHeader('Content-Length', options.data.length);
            transport.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            // onreadystatechangeにイベントハンドラ登録
            transport.onreadystatechange = function() {
                if (transport.readyState === 4) {
                    requestComplete(transport, options);
                }
            };
            // リクエスト実行
            transport.send(options.data);
        }
        ajax.request = request;

    }());

});
