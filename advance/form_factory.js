jQuery(function($) {
    /**
     * FORM要素作成メソッドfactoryを提供する。
     *
     * factoryを呼び出す前に必ずsetFormSectionでセクションを設定する。
     */
    var formFactory = App.namespace('formFactory');

    // formFactory実装
    (function() { 

        // セクション
        var section;

        /**
         * セクションを設定する。
         *
         * セクションはApp.namespace('formSection')で取得したオブジェクト。
         *
         * @param {Object} formSection セクション。
         * App.namespace('formSection')で取得したオブジェクト。
         */
        function setFormSection(formSection) {
            section = formSection;
        }

        /**
         * FORM要素を作成する。
         *
         * 引数で指定されたFORM要素を作成しクションの末尾に追加する。
         *
         * @param {String} type 作成するFORMのタイプを指定する。
         * 引数に可能な文字列 'textarea', 'image'。
         */
        function factory(type) {
            if (typeof FormType[type] !== "function") {
                throw new Error('指定されたタイプがありません。')
               // throw new NotTypeException();
            }
            // タイプに応じて作成する。
            FormType[type]();
        }

        // 作成可能なFORMのタイプを定義する静的クラス
        function FormType() {}

        // textareaを１つだけ持つフォーム
        FormType.textarea = function() {

            // 要素の作成
            var form = $('<form>');

            var fields = $('<div class="fields">');
            var hiddenFormType = $('<input>');
            var hiddenCreatedOrder = $('<input>');
            var hiddenMetaOrder = $('<input>');
            var textarea = $('<textarea>');
            var submit = $('<input>');

            var message = $('<div class="message">');

            var updown = $('<div class="updown">');
            var up = $('<a class="up" href="#">上へ</a>');
            var down = $('<a class="down" href="#">下へ</a>');

            // 属性設定
            var formLength = section.getFormLength();
            var formIdName = 'form' + formLength;
            form.attr('id', formIdName);
            form.attr('method', 'POST');
            form.attr('action', 'ajax.php');

            textarea.attr('name', formIdName + '_textarea');

            hiddenFormType.attr('type', 'hidden');
            hiddenFormType.attr('name', 'form_type');
            hiddenFormType.attr('value', 'textarea');
            
            hiddenCreatedOrder.attr('type', 'hidden');
            hiddenCreatedOrder.attr('name', 'created_order');
            hiddenCreatedOrder.attr('value', formLength);

            hiddenMetaOrder.attr('type', 'hidden');
            hiddenMetaOrder.attr('name', 'current_order');
            hiddenMetaOrder.attr('value', formLength);

            submit.attr('type', 'submit');
            submit.attr('name', 'save');
            submit.addClass('send');
            submit.attr('value', '保存');

            // フォームへの追加
            fields.append(hiddenFormType);
            fields.append(hiddenCreatedOrder);
            fields.append(hiddenMetaOrder);
            fields.append(textarea);
            fields.append(submit);
            form.append(fields);

            form.append(message);

            updown.append(up);
            updown.append('&nbsp;');
            updown.append(down);
            form.append(updown);

            // フォームの順序処理
            section.setFormLength(formLength + 1);
            section.getSectionjQuery().append(form);

        };

        // 画像1つ持つフォーム。
        FormType.image = function() {

            // 要素の作成
            var form = $('<form>');

            var image_view = $('<div class="image-view">');
            var thumb = $('<img src="images/default.png">');

            var fields = $('<div class="fields">')
            var hiddenFormType = $('<input>');
            var hiddenCreatedOrder = $('<input>');
            var hiddenMetaOrder = $('<input>');
            var file = $('<input>');
            var submit = $('<input>');

            var message = $('<div class="message">');

            var updown = $('<div class="updown">');
            var up = $('<a class="up" href="#">上へ</a>');
            var down = $('<a class="down" href="#">下へ</a>');

            // 属性設定
            var formLength = section.getFormLength();
            var formIdName = 'form' + formLength;
            form.attr('id', formIdName);
            form.attr('method', 'POST');
            form.attr('action', '#');
            form.attr('enctype', 'multipart/form-data');

            hiddenFormType.attr('type', 'hidden');
            hiddenFormType.attr('name', 'form_type');
            hiddenFormType.attr('value', 'image');

            hiddenCreatedOrder.attr('type', 'hidden');
            hiddenCreatedOrder.attr('name', 'created_order');
            hiddenCreatedOrder.attr('value', formLength);

            hiddenMetaOrder.attr('type', 'hidden');
            hiddenMetaOrder.attr('name', 'current_order');
            hiddenMetaOrder.attr('value', formLength);

            file.attr('type', 'file');
            file.attr('name', formIdName + '_image');

            submit.attr('type', 'button');
            submit.attr('name', 'save');
            submit.addClass('send');
            submit.attr('value', '保存');

            // フォームへの追加
            image_view.append(thumb);
            form.append(image_view);

            fields.append(hiddenFormType);
            fields.append(hiddenCreatedOrder);
            fields.append(hiddenMetaOrder);
            fields.append(file);
            fields.append(submit);
            form.append(fields);

            form.append(message);

            updown.append(up);
            updown.append('&nbsp;');
            updown.append(down);
            form.append(updown);

            // フォームの順序処理
            section.setFormLength(formLength + 1);
            section.getSectionjQuery().append(form);

        };

        // パブリックメソッド
        formFactory.setFormSection = setFormSection;
        formFactory.factory = factory;

    }());

});
