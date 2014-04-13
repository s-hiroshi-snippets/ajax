jQuery(function($) {

    // オブジェクト名はファイルから_を除いたローワーキャメルケース。

    // オブジェクト取得と必須処理
    var formSection = App.namespace('formSection');
    formSection.setFormSection('form-section-example');

    var formFactory = App.namespace('formFactory');
    formFactory.setFormSection(formSection);

    var formAction = App.namespace('formAction');
    formAction.setFormSection(formSection);
    formAction.setFormFactory(formFactory);

    var ajax = App.namespace('ajax');
    var formTransferController = App.namespace('formTransferController');
    formTransferController.setAjax(ajax);

    // 利用するインターフェースの設定
    formAction.setUp();
    formAction.setDown();
    formAction.setAddTextArea();
    formAction.setAddImage();
    formAction.setAddGroup();
});
