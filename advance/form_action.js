jQuery(function($) {

    /**
     * フォーム要素のイベントアクションを管理。
     */
    var formAction = App.namespace('formAction');
    
    // 実装の定義
    (function() {

        //セクションオブジェクト
        var section;

        /**
         * セクションオブジェクトを設定する。
         *
         * セクションオブジェクトはApp.namespace('formSection')で取得したオブジェクト。
         *
         * @param {Object} セクションオブジェクト
         */
        function setFormSection(formSection) {
            section = formSection;
        }

        // ファクトリーオブジェクト
        var factory;

        /**
         * ファクトリーオブジェクトを設定する。
         *
         * ファクトリーオブジェクトはApp.namespace('formFactory')で取得したオブジェクト。
         *
         * @param {Object} formFactory
         */
        function setFormFactory(formFactory) {
            factory = formFactory;
        }

        /**
         * form-section末尾にテキストエリアを１つだけ持つフォームを追加する。
         */
        function setAddTextArea() {
            $('#add-textarea').click(function() {
                factory.factory('textarea');
            });
        }

        /**
         * form-section末尾に画像アップロードを1つ持つフォームを追加する。
         */
        function setAddImage() {
            $('#add-image').click(function() {
                factory.factory('image');
            });
        }

        /**
         * form-section末尾に画像とテキストエリアを各1つずつ持つフォームをする。
         */
        function setAddGroup() {
            $('#add-group').click(function() {
                factory.factory('group');
            });
        }
                
        /**
         * a.upを持つフォームに「上へ」アクションを設定する。
         */
        function setUp() {

            $('a.up').live('click', function() {
                var closestForm = $(this).closest('form');
                var cloneForm;
                var sibling;
                var value;
                var id;
                if (closestForm.prev('form').length > 0) {
                    value = $('textarea', closestForm).val();
                    id = $('textarea', closestForm).attr('id');
                    cloneForm = closestForm.clone(true);
                    sibling = closestForm.prev('form');
                    sibling.before(cloneForm);
                    closestForm.remove();
                    $('#' + id).val(value);
                    section.setMetaOrder();

                }

                return false;
            });
        }

        /**
         * a.downを持つフォームに「下へ」アクションを設定する。
         */
        function setDown() {
            $('a.down').live('click', function() {
                var closestForm = $(this).closest('form');
                var cloneForm;
                var sibling;
                var value;
                var id;
                if (closestForm.next('form').length > 0) {
                    value = $('textarea', closestForm).val();
                    id = $('textarea', closestForm).attr('id');
                    cloneForm = closestForm.clone(true);
                    sibling = closestForm.next('form');
                    sibling.after(cloneForm);
                    closestForm.remove();
                    $('#' + id).val(value);
                    section.setMetaOrder();
                }

                return false;
            });
        }

        // 公開メソッド
        formAction.setFormSection = setFormSection;
        formAction.setFormFactory = setFormFactory;
        formAction.setAddTextArea = setAddTextArea;
        formAction.setAddImage = setAddImage;
        formAction.setAddGroup = setAddGroup;
        formAction.setUp = setUp;
        formAction.setDown = setDown;
    }());
});
