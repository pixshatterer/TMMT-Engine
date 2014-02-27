(function(NS) {
    /**
     * TODO: REMOVE ALL JQUERY THINGS!!!!
     * @description microtemplating class
     * 
     */
    (NS.TemplateManager = function() {
        var DEFAULT_CHARSET = '?&=';
        /**
         * @description apply the transformation object to the template and returns a string
         * @param template {String} template to apply as base
         * @param hash {Object} replacements to apply
         * @param transformHash {Object} replacements function to apply in the values
         * 
         * @return {String}
         */

        function apply(template, hash, transformHash) {
            Object.keys(hash).forEach(function(key, index) {
                var value = hash[key];
                exp = new RegExp('\{' + index + '\}', 'g');
                template = template.replace(exp, (transformHash) ? (typeof transformHash[key] === 'function' ? transformHash[key](value) : value) : value);
            });

            return template;
        }

        /**
         * @description Transforms a hash into a querystring
         * @param hash {Object} hash to transform (just first two levels of introspection)
         * @param charset {String} characters to use as separators per level
         * 
         * @return {String}
         */

        function getHashSerialized(hash, charset) {
            var querystring = '';

            charset = charset || DEFAULT_CHARSET;
            Object.keys(hash).forEach(function(key, index) {
                var value = hash[key];
                querystring += ((querystring.length > 0) ? charset.charAt(1) : '') + key + charset.charAt(2) + value;
            });

            return querystring;
        }

        /**
         * @description Transforms querystring into a hash
         * @param query {String} string to transform in a hash (just first two levels of introspection)
         * @param charset {String} characters to use as separators per level
         * 
         * @return {Object}
         */

        function getHashFromQuery(query, charset) {
            var hash = {},
                queryElem, queryArray;

            charset = charset || DEFAULT_CHARSET;
            queryElem = query.split(charset.charAt(0)), queryArray = queryElem[queryElem.length - 1].split(charset.charAt(1));
            for (var i = 0; i < queryArray.length; i += 1) {
                queryElem = queryArray[i].split(charset.charAt(2));
                hash[queryElem[0]] = queryElem[1];
            }

            return hash;
        }

        return {
            apply: apply,
            getHashSerialized: getHashSerialized,
            getHashFromQuery: getHashFromQuery
        }
    }());
}((window.YourOwnNameSpace || window)));
