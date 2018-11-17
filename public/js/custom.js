$(document).ready(() => {

    setInterval(function(){
        var currentdate = new Date();
        var current = currentdate.getFullYear() + "-" + formatDate(currentdate);

        $('#today').text(current);

    }, 1000);

    /***
     * IIFE Get All items by user (email)
     */
    (function(){

        var email = $('#list-content').attr('data-email');

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/list',
            type: 'POST',
            data: {
                email: email
            },
            async: false,
            dataType: 'JSON',
            success: function(data) {
                if (data != 0) {

                    // add data to View
                    data.forEach((item) => {
                        AddItem(item)
                    })
                }
            },
            error: function(err) {
                console.log(err);
            }
        });
    })();


    /***
     * Add Item to View
     * @param data
     * @constructor
     */
    function AddItem(data) {

        var item;
        if (data['status'] === 1) {
            item = "<div class='form-check'>";
            item += "<label id='" +data['id']+ "'><input type='checkbox' name='check'><span class='label-text'>"+data['detail']+"</span>";
            item += "<span class='label-text' id='timer'>"+data['created_at']+"</span></label></div>";
        } else {
            item = "<div class='form-check'>";
            item += "<label id='" +data['id']+ "'><input type='checkbox' name='check' checked><span class='label-text'>"+data['detail']+"</span>";
            item += "<span class='label-text' id='timer'>"+data['created_at']+"</span></label></div>";
        }

        $('#list-content').prepend(item);
    }

    /***
     * Format date
     * @param jsDate
     * @returns {string}
     */
    function formatDate(jsDate){
        return (
            (jsDate.getMonth()+1) < 10?("0"+(jsDate.getMonth()+1)):(jsDate.getMonth()+1) + "-" +
                (jsDate.getDate() < 10 ? ("0"+jsDate.getDate()) : jsDate.getDate()) + " " +
                (jsDate.getHours() < 10?("0"+jsDate.getHours()): jsDate.getHours()) + ":" +
                (jsDate.getMinutes() < 10?("0"+jsDate.getMinutes()): jsDate.getMinutes()) + ":" +
                (jsDate.getSeconds() < 10?("0"+jsDate.getSeconds()): jsDate.getSeconds())
        );
    }

    /***
     * Event Add BeforeAdd
     */
    $('#add').on('click', () => {

        // lấy thẻ before add ẩn đi và after add hiển thị ra
        $('.before-add').attr('id', 'FadeOut');
        $('.after-add').css('display', 'flex');

        // làm sạch input
        $('#content').val("");
    });

    /***
     * Event Close AfterAdd
     */
    $('#close').on('click', () => {

        // lấy thẻ before add hiện và after add ẩn đi
        $('.before-add').attr('id', '');
        $('.after-add').css('display', 'none');
    });

    /***
     * Event Toggle status items
     */
    $('#list-content').on('mousedown', 'label', function(e) {
        var id = $(this).attr('id');

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/update',
            type: 'POST',
            data: {
                id: id
            },
            async: false,
            dataType: 'JSON',
            success: function(status) {
            },
            error: function(err) {
                console.log(err);
            }
        })
    })

    /***
     * Event insert Item
     */
    $('#insert').on('click', () => {
        let val = $('#content').val();

        if (val === '') return;

        // y-m-d H:m:i
        var currentdate = new Date();
        var timer = currentdate.getFullYear() + "-" + formatDate(currentdate);
        var email = $('#list-content').attr('data-email');

        var data = {
            id: 0,
            email: email,
            detail: val,
            status: 1,
            created_at: timer
        };

        //truyền dữ liệu lên server && lấy ID về
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            url: '/add',
            type: 'POST',
            data: {
                item: data
            },
            async: false,
            dataType: 'JSON',
            success: function(res) {

                // thêm item to Database, get ID callback
                data['id'] = res.id;

                // get ID, add todo list
                AddItem(data);
            },
            error: function(err) {
                console.log(err);
            }
        });

        // làm sạch input
        $('#content').val("");
    });
})