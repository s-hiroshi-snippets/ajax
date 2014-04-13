jQuery(function() {
    /**
     * Ajaxを使いテキストデータの送受信を行う。
     */

    // controllerの実装
    (function() {

        // 「保存」クリックのアクション制御
        $("input.send").click(function() {

            // クリックイベントに続いてsubmitイベントが発生する。
            // Ajaxを使用するためsubmitイベントは停止する。
            var form = $("#myform");
            form.submit(function() {
                return false;
            });

            // POSTデータ構築
            
            var data = {
               "mytextarea": $("#mytextarea").val()
            };
            console.log(data);
            // パーセントエンコーディング
            var encodeddata = getEncodedUri(data);

            // Ajaxを使った処理
            try {
                $.ajax({
                    type: "POST",
                    url: "ajax.php",
                    data: encodeddata
                }).done(function( response ) {
                    response = JSON.parse( response );
                    var key;
                    for ( key in response ) {
                        $( "#mytextarea" ).val( response[ key ] );
                    }
                    $( "#message" ).text( "保存に成功しました。" );
                });
            } catch (e) {
                $( "#error" ).innerHTML = "保存できませんでした。";
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
        function getEncodedUri(obj) {
            var params = [],
                key,
                value,
                param;
            for (key in obj) {
                value = obj[key];
                // パーセントエンコーディングの半角スペース%20を+へ置換
                param = encodeURIComponent(key).replace(/%20/g, "+") + "=" + encodeURIComponent(value).replace(/%20/g, "+");
                params.push(param);
            }
            return params.join("&");
        }

    }());
});
