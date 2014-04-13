 jQuery(function() {
     /**
      * フォームアクションコントローラー。
      *
      * サーバーとの送受信はデータがテキストだけのときはajax.requestを使う。  
      * イメージデータを含むmultipart/form-dataはjQuery.uploadプラグインで送受信する。
      * 必ずsetAjaxを呼び出す。
      */
     var controller = App.namespace('formTransferController');

    // controllerの実装
    (function() {

        // Ajaxのオブジェクト
        var ajax;

        /**
         * App.namespace('ajax')で取得したオブジェクトを設定する。
         *
         * @param {Object} ajaxObject
         * App.namespace('ajax')で所得したオブジェクト。
         */
        function setAjax(ajaxObject) {
            ajax = ajaxObject;
        }

        // 「保存」クリックのアクション制御
        $('input.send').live('click', function() {

            form = $(this).closest('form');

            var type = $('input[name="form_type"]',form).val();

            if (type === 'textarea') {
               FormType['textarea'](form);
            }
            if (type === 'image') {
                FormType['image'](form);
            }

        });

        // 処理可能なFormタイプを定義する。
        function FormType() {}

        // テキストエリアが一つのフォーム
        FormType.textarea = function(form) {

            // クリックイベントに続いてsubmitイベントが発生する。
            // Ajaxを使うのでsubmitハンドラでページリロードを抑制する。
            form.submit(function() {
                return false;
            });
            var saveElements = $('textarea', form);
            var i, length = saveElements.length;

            // POSTデータ
            var data = {};
            data['form_type'] = $('input[name="form_type"]', form).val();
            data['created_order'] = $('input[name="created_order"]', form).val();
            saveElements.each(function(i) {
                data[$(saveElements.get(i)).attr('name')] = $(saveElements[i]).val();
            });
            var url = form.attr('action');
            var encodedata = App.getEncodedUri(data);
            // Ajaxを使った処理
            try {
                if (ajax && ajax.request) {
                    ajax.request(url, {
                        success: function(xhr) {
                            var jsonResponse = JSON.parse(xhr.responseText);
                            var key;
                            for (key in jsonResponse) {
                                $('textarea', form).val(jsonResponse[key]);
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

        };

        // 画像を1つ持つフォーム
        FormType.image = function(form) {
            // POSTデータ
            var data = {};
            data['form_type'] = $('input[name="form_type"]', form).val();
            data['created_order'] = $('input[name="created_order"]', form).val();
            var encodedata = App.getEncodedUri(data);
            // POSTデータの送信処理
            $('input:file', form).upload('ajax.php', encodedata, function(res) {
                $('img', form).attr('src', 'images/' + res[$('input:file', form).attr('name')]);
            }, 'json');
        };


        // 公開メソッド
        controller.setAjax = setAjax;
    }());
});
