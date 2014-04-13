jQuery(function($) {
    /**
     * セクション管理。
     *
     * セクションはclass名にform-sectionを指定したdiv要素。
     */
    var formSection = App.namespace('formSection');

    // formSectionオブジェクト実装
    (function() {

        // セクションのjQueryオブジェクト
        var sectionjQuery;

        /**
         * セクションに対応したjQueryオブジェクトを返す。
         *
         * @return {jQuery} sectionjQueryを返す。
         */
        function getSectionjQuery() {
            return sectionjQuery;
        }

        /**
         * classにform-sectionを付けた要素をsectionjQueryに設定する。
         *
         * @param {String} idName classにform-sectionを指定した要素のid名。<br>
         *
         * @return オブジェクトチェーン用に自身を返す。
         *
         * @throws Error
         * 引数が無いまたは空文字で呼び出れたとき。
         * @throws Error
         * 引数に対応する要素が見つからない。
         */
        function setFormSection(idName) {
            if (typeof idName === 'undefined' || idName === '') {
                throw new Error('不正な引数で呼び出されました。')
            }
            if ($('#' + idName) === false) {
                throw new Error('指定された要素がありません。');
            }
            // form-sectionのjQueryオブジェクト
            sectionjQuery = $('#' + idName);

            formLength = $('form', sectionjQuery).length;
            return this;
        }

        // FORM要素数
        var formLength = 0;

        /**
         * セクション内のフォームの要素数の設定
         *
         * @param {Number} 現在のセクション内のフォーム要素の数。
         *
         * @throws Error セクションjQueryオブジェクトがないとき。
         */
        var setFormLength = function(currentLength) {
            if (typeof sectionjQuery === "undefined") {
                throw new Error('セクションjQueryオブジェクトがありません。');
            }
            formLength = currentLength;
        };

        /**
         * セクション内のフォーム要素数のを取得
         *
         * @return {Number} セクション内のフォーム要素の数
         *
         * @throws Error セクションjQueryオブジェクトがないとき。
         */
        var getFormLength = function() {
            if (typeof sectionjQuery == "undefined") {
                throw new Error('セクションjQueryオブジェクトがありません。');
            }

            return formLength;
        };

        /**
         * セクション内のすべてのフォームの順序を(再)設定する。
         * 
         * <input type="hidden" name="current_order">}に設定する。
         * current_orderはフォーム追加・並び替えのときに必ず呼び出して順序を(再)設定する。
         *
         */
        function setMetaOrder() {
            var formItems = $('form', sectionjQuery);
            formItems.each(function(i) {
                if ($('input[name="current_order"]', formItems[i]).length !== 0) {
                    $('input[name="current_order"]', formItems[i]).attr('value', i);
                } else {
                    $(formItems[i]).append('<input type="hidden" name="current_order" value="' + i + '">');
                }
            });
        }

        // 公開メソッド
        formSection.getFormLength = getFormLength;
        formSection.setFormLength = setFormLength;
        formSection.getSectionjQuery = getSectionjQuery;
        formSection.setMetaOrder = setMetaOrder;
        formSection.setFormSection = setFormSection;

    }());

});
