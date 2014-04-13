/*
 * Appのトップレベルオブジェクト(jQueryのトップレベル)
 *
 * <p>Christian Johansen(著),長尾高弘(翻訳)『テスト駆動JavaScript』ASCII
 * 下記サイトで配布されているスクリプトを変更。</p>
 * <p>http://tddjs.com/</p>
*/
function App() {}
/**
 *  名前空間を設定・管理する。
 *
 *  <p>引数に対応する既存のオブジェクトが存在するときは
 *  そのオブジェクトを返す。存在しないときは空のオブジェクト作成・登録してして返す。</p>
 *
 *  @param {String} name オブジェクト名
 *  @return {Object} 引数にマップされたオブジェクト
 */
App.namespace = function() {
    var objectList = {};
    return function(name) {
        if (typeof objectList[name] == "undefined") {
            objectList[name] = {};
        }

        return objectList[name];
    };
}();

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
