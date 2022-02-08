/*-----------------------------------------------------------------------------/
/ Custom Theme JS
/-----------------------------------------------------------------------------*/
var Shopify = Shopify || {};
// ---------------------------------------------------------------------------
// Money format handler
// ---------------------------------------------------------------------------
Shopify.money_format = "${{amount}}";
Shopify.formatMoney = function(cents, format) {
    if (typeof cents == 'string') {
        cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || this.money_format);

    function defaultOption(opt, def) {
        return (typeof opt == 'undefined' ? def : opt);
    }

    function formatWithDelimiters(number, precision, thousands, decimal) {
        precision = defaultOption(precision, 2);
        thousands = defaultOption(thousands, ',');
        decimal = defaultOption(decimal, '.');
        if (isNaN(number) || number == null) {
            return 0;
        }
        number = (number / 100.0).toFixed(precision);
        var parts = number.split('.'),
            dollars = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands),
            cents = parts[1] ? (decimal + parts[1]) : '';
        return dollars + cents;
    }
    switch (formatString.match(placeholderRegex)[1]) {
        case 'amount':
            value = formatWithDelimiters(cents, 2);
            break;
        case 'amount_no_decimals':
            value = formatWithDelimiters(cents, 0);
            break;
        case 'amount_with_comma_separator':
            value = formatWithDelimiters(cents, 2, '.', ',');
            break;
        case 'amount_no_decimals_with_comma_separator':
            value = formatWithDelimiters(cents, 0, '.', ',');
            break;
    }
    return formatString.replace(placeholderRegex, value);
};
// Insert any custom theme js here...
$(document).ready(function() {
    $('.product-form__quantity-selector').click(function(event) {
        event.stopPropagation();
        event.preventDefault();
    });
    $('.product-card-addtocart').click(function(event) {
        refreshCart();
        $(document).on('drawer_open_start', function() {
            $('.product-form>.btn').addClass('btn--primary');
            $('.product-form>.btn').removeClass('btn--secondary');
            $('.product-form>.btn').removeClass('btn--to-secondary-transitioned');
            $('.product-form>p').removeClass('product__notification--success')
            $('.product-form>.btn').removeClass("ajax-cart__toggle");
        });
        $('.cart-drawer__checkout').prop("disabled", false);
    });
});