function filterVisible(elems) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var visibleElems = [];
    $.each(elems, function(i, elem) {
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        if ((elemBottom >= docViewTop) && (elemTop <= docViewBottom)) {
            visibleElems.push(elem);
        }
    });
    return visibleElems;
}

function highlightVisibleFiles() {
    var visibleSelector = $.map(filterVisible($('.file')), function(elem) {
        return 'li:has(a[href=#' + $(elem).attr('id') + '])';
    }).join(',');
    var toc = $('#toc ol');
    toc.children('li').removeClass('visible');
    if (visibleSelector) {
        toc.children(visibleSelector).addClass('visible');
    }
}

$(function() {
    // show diff stats by default
    $('#toc').addClass('open');

    // highlight files as the user scrolls
    $(window).scroll(highlightVisibleFiles);
    highlightVisibleFiles();
});
