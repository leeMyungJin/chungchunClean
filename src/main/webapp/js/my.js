$(document).ready(function() {

    // 퀵 바
    $('.quick_trigger').click(function() {
        $('.quick_trigger').toggleClass('active');
        $('.quick_bar_wrap').toggleClass('active');
    });


    // 로딩바
    function loadingBarStart() {
        $('.loading_bar_wrap').addClass('active');
    }

    function loadingBarEnd() {
        $('.loading_bar_wrap').removeClass('active');
    }


    // 서브 탭 메뉴
    $('.sub_tabs li.sub_tab').click(function() {
        var tab_id = $(this).attr('data-tab');
        $('.sub_tabs li.sub_tab').removeClass('current');
        $('.sub_tab_cont').removeClass('current');
        $(this).addClass('current');
        $('#' + tab_id).addClass('current');

    });

    // 화면 확대 축소
    $('.expand_right_btn').click(function() {
        if (!$('.expand_board').hasClass('.expand_left')) {
            $('.expand_board').removeClass('expand_right');
            $('.expand_board').addClass('expand_left');

            var new_prodColSize = AUIGrid.getFitColumnSizeList(prodGrid);
            new_prodColSize[0] = '10%';
            new_prodColSize[1] = '6%';
            new_prodColSize[2] = '8%';
            new_prodColSize[3] = '8%';
            new_prodColSize[4] = '8%';
            new_prodColSize[5] = '30%';
            new_prodColSize[6] = '10%';
            new_prodColSize[7] = '10%';
            new_prodColSize[8] = '10%';

            AUIGrid.setColumnSizeList(prodGrid, new_prodColSize);
            AUIGrid.setColumnSizeList(prodGrid1, new_prodColSize);
            AUIGrid.setColumnSizeList(prodGrid2, new_prodColSize);

            var origin_orderColSize = AUIGrid.getFitColumnSizeList(orderGrid);
            origin_orderColSize[0] = '10%';
            origin_orderColSize[1] = '10%';
            origin_orderColSize[2] = '15%';
            origin_orderColSize[3] = '15%';
            origin_orderColSize[4] = '10%';
            origin_orderColSize[5] = '35%';
            origin_orderColSize[6] = '10%';
            origin_orderColSize[7] = '15%';
            origin_orderColSize[8] = '15%';
            origin_orderColSize[9] = '10%';
            origin_orderColSize[10] = '10%';
            origin_orderColSize[11] = '10%';
            origin_orderColSize[12] = '20%';
            origin_orderColSize[13] = '0%';
            origin_orderColSize[14] = '0%';

            AUIGrid.setColumnSizeList(orderGrid, origin_orderColSize);
            AUIGrid.setColumnSizeList(orderGrid1, origin_orderColSize);
            AUIGrid.setColumnSizeList(orderGrid2, origin_orderColSize);

            AUIGrid.resize(prodGrid);
            AUIGrid.resize(prodGrid1);
            AUIGrid.resize(prodGrid2);
            AUIGrid.resize(orderGrid);
            AUIGrid.resize(orderGrid1);
            AUIGrid.resize(orderGrid2);

        }
    });
    $('.expand_left_btn').click(function() {
        if (!$('.expand_board').hasClass('.expand_right')) {
            $('.expand_board').removeClass('expand_left');
            $('.expand_board').addClass('expand_right');
            var origin_prodColSize = AUIGrid.getFitColumnSizeList(prodGrid);

            origin_prodColSize[0] = '13%';
            origin_prodColSize[1] = '10%';
            origin_prodColSize[2] = '15%';
            origin_prodColSize[3] = '15%';
            origin_prodColSize[4] = '10%';
            origin_prodColSize[5] = '35%';
            origin_prodColSize[6] = '10%';
            origin_prodColSize[7] = '15%';
            origin_prodColSize[8] = '10%';


            AUIGrid.setColumnSizeList(prodGrid, origin_prodColSize);
            AUIGrid.setColumnSizeList(prodGrid1, origin_prodColSize);
            AUIGrid.setColumnSizeList(prodGrid2, origin_prodColSize);

            var new_orderColSize = AUIGrid.getFitColumnSizeList(orderGrid);
            new_orderColSize[0] = '4%';
            new_orderColSize[1] = '4%';
            new_orderColSize[2] = '8%';
            new_orderColSize[3] = '8%';
            new_orderColSize[4] = '6%';
            new_orderColSize[5] = '20%';
            new_orderColSize[6] = '4%';
            new_orderColSize[7] = '8%';
            new_orderColSize[8] = '6%';
            new_orderColSize[9] = '5%';
            new_orderColSize[10] = '9.3%';
            new_orderColSize[11] = '7.5%';
            new_orderColSize[12] = '10%';
            new_orderColSize[13] = '0%';
            new_orderColSize[14] = '0%';

            AUIGrid.setColumnSizeList(orderGrid, new_orderColSize);
            AUIGrid.setColumnSizeList(orderGrid1, new_orderColSize);
            AUIGrid.setColumnSizeList(orderGrid2, new_orderColSize);

            AUIGrid.resize(prodGrid);
            AUIGrid.resize(prodGrid1);
            AUIGrid.resize(prodGrid2);
            AUIGrid.resize(orderGrid);
            AUIGrid.resize(orderGrid1);
            AUIGrid.resize(orderGrid2);
        }
    });

    // 화면 원래대로
    $('.expand_center_btn').click(function() {
        $('.expand_board').removeClass('expand_left');
        $('.expand_board').removeClass('expand_right');
        var origin_prodColSize = AUIGrid.getFitColumnSizeList(prodGrid);

        origin_prodColSize[0] = '13%';
        origin_prodColSize[1] = '10%';
        origin_prodColSize[2] = '15%';
        origin_prodColSize[3] = '15%';
        origin_prodColSize[4] = '10%';
        origin_prodColSize[5] = '35%';
        origin_prodColSize[6] = '10%';
        origin_prodColSize[7] = '15%';
        origin_prodColSize[8] = '10%';


        AUIGrid.setColumnSizeList(prodGrid, origin_prodColSize);
        AUIGrid.setColumnSizeList(prodGrid1, origin_prodColSize);
        AUIGrid.setColumnSizeList(prodGrid2, origin_prodColSize);

        var origin_orderColSize = AUIGrid.getFitColumnSizeList(orderGrid);
        origin_orderColSize[0] = '10%';
        origin_orderColSize[1] = '10%';
        origin_orderColSize[2] = '15%';
        origin_orderColSize[3] = '15%';
        origin_orderColSize[4] = '10%';
        origin_orderColSize[5] = '35%';
        origin_orderColSize[6] = '10%';
        origin_orderColSize[7] = '15%';
        origin_orderColSize[8] = '15%';
        origin_orderColSize[9] = '10%';
        origin_orderColSize[10] = '10%';
        origin_orderColSize[11] = '10%';
        origin_orderColSize[12] = '20%';
        origin_orderColSize[13] = '0%';
        origin_orderColSize[14] = '0%';

        AUIGrid.setColumnSizeList(orderGrid, origin_orderColSize);
        AUIGrid.setColumnSizeList(orderGrid1, origin_orderColSize);
        AUIGrid.setColumnSizeList(orderGrid2, origin_orderColSize);


        AUIGrid.resize(prodGrid);
        AUIGrid.resize(prodGrid1);
        AUIGrid.resize(prodGrid2);
        AUIGrid.resize(orderGrid);
        AUIGrid.resize(orderGrid1);
        AUIGrid.resize(orderGrid2);


    });

    //
    $(function() {
        $(".datepicker").datepicker({
            dateFormat: 'yy-mm-dd',
            dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
            dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
            monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
        });
        $(".datepicker2").datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
            dateFormat: 'yy-mm',
            onClose: function(dateText, inst) {
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).datepicker('setDate', new Date(year, month, 1));
            },
            beforeShow: function(input, inst) {
                if ((datestr = $(this).val()).length > 0) {
                    actDate = datestr.split('-');
                    year = actDate[0];
                    month = actDate[1] - 1;
                    $(this).datepicker('option', 'defaultDate', new Date(year, month));
                    $(this).datepicker('setDate', new Date(year, month));
                }
            }
        });
    });

    $('.howto .section01 .btn').click(function() {
        $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 500);
        return false;
    });

});