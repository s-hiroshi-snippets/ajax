jQuery(function() {
    /**
     * コントローラー。
     *
     * サーバーとテキストデータの送受信を管理する。
     */
    if ( typeof App === 'undefined' ) {
        App = {};
    }

    if ( typeof App.controller === 'undefined' ) {
        App.controller = {};
    }

    // controllerの実装
    (function() {

        // Ajaxのオブジェクト
        // 本ファイルより先に読み込む
        var ajax = App.ajax;

        // 「保存」クリックのアクション制御
        $('input.send').live('click', function() {

            var form = $('#myform');

            // クリックイベントに続いてsubmitイベントが発生する。
            // Ajaxを使用するためsubmitイベントは停止する。
            form.submit(function() {
                return false;
            });

            // 送信先
            var url = form.attr('action');
            // POSTデータ構築
            var data = [];
            data['mytextarea'] = $('textarea', form).val();
            // パーセントエンコーディング
            var encodedata = App.getEncodedUri(data);

            // Ajaxを使った処理
            try {
                if (ajax && ajax.request) {
                    ajax.request(url, {
                        success: function(xhr) {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            var key;
                            for (key in jsonResponse) {
                                $('#mytextarea').val(jsonResponse[key]);
                            }
                            $('.message', form).text('保存に成功しました。');
                        },
                        data: encodedata,
                        method: 'POST'
                    });
                } else {
                    $('.error', form).innerHTML = 'ajaxオブジェクトまたはajax.requestメソッドがありません。';
                }
            } catch (e) {
                $('.error', form).innerHTML = '保存できませんでした。';
            }

        });
        
        /**
         * 引数オブジェクトをパーセントエンコードして文字列として返す。
         *
         * <pre>
         * 引数のオブジェクト
         * {
         *     key1: value1,
         *     key2: value2
         * }
         * 戻り値の文字列
         * encodedKey1=encodedValue1&encodedkey2=encodedValue12
         * encodedKey/Valueはkey/Valueをパーセントエンコードした文字列
         * </pre>
         *
         * @param {Object} obj ポストデータのクエリ
         * @return {String} ポストデータをパーセントエンコードした文字列
         */
        App.getEncodedUri = function(obj) {
            var params = [],
                key,
                value,
                param;
            for (key in obj) {
                value = obj[key];
                // パーセントエンコーディングの半角スペース%20を+へ置換
                param = encodeURIComponent(key).replace(/%20/g, '+') + '=' + encodeURIComponent(value).replace(/%20/g, '+');
                params.push(param);
            }
            return params.join('&');
        };

    }());
});
