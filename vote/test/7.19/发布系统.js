$(function () {
    var test = window.location.href;
    var oid = (function GetRequest() {
        var url = location.search; //获取url中"?"符后的字串   
        var theRequest;
        if (url.indexOf("?") != -1) {
            theRequest = url.slice(url.indexOf("?") + 1);
        }
        // var myRequest = theRequest.replace('=', '');
        var myRequest = parseInt(theRequest);
        var Request = myRequest.toString();
        return myRequest;
    })();
    // alert(oid)

    function renderData(report_list, myAllData) {
        console.log(myAllData);
        // $('.details').html('');
        // report_list.map(function (item, index) {
            console.log(report_list)
        for(var i = 0; i < report_list.length; i++) {
            console.log('获取到了这个值');
            console.log(report_list[i].oid);
            console.log('这是什么')
            console.log(oid)
            if (report_list[i].oid == oid) {
                console.log(report_list[i])
                var top = $('<div class="top"><img src="http://src.leju.com/imp/imp/deal/de/66/e/64c93ff3994224169de50cd05f3_p24_mk24.jpg" alt=""></div>');
                var footer = $('<footer><img src="http://src.leju.com/imp/imp/deal/56/a3/7/11848a7a70c312684d8aeea7b28_p24_mk24.jpg" alt=""></footer>');
                var details_dom = $('<div class="details"></div>');
                var data = report_list[i];
                // left
                var img = $('<img />').attr({
                    src: data.attrinfo.personal_photo
                }).css({
                    width: '6.6875rem',
                    height: '6.6875rem'
                });
                var wt_huangk = $('<div class="wt_huangk"></div>')
                var left = $('<div class="left"></div>').append(img, wt_huangk);

                // right
                var right = $('<div class="right"><span class="details_man"></span><div class="shelter"></div></div>')
                // right_name
                var right_name = $('<div class="right_name"></div>').append($('<h2></h2>').html(data.attrinfo.name)).append($('<p></p>').html(data.attrinfo.name_py));

                //right_company
                var right_company = $('<div class="right_company"></div>').append($('<p></p>').html('公司：' + data.attrinfo.sub_company)).append($('<p></p>').html('职位：' + data.attrinfo.postion));

                //right_details
                var right_details = $('<div class="right_details"></div>').html($('<p></p>').html(data.attrinfo.personal_desc));

                // click_button
                var left_button = $('<div class="left_button"></div>').append($('<a></a>').attr({
                    href: 'javascript:void(0)'
                }));
                var right_button = $('<div class="right_button"></div>').append($('<a></a>').attr({
                    href: 'http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424557538326677564.html' + '?' + Math.random()
                    // href: 'javascript:void(0)'
                }));
                // right_button.click(function() {
                //     $('body').load('http://sh.jiaju.sina.com.cn/5892969276721408355/2018/0716/6424557538326677564.html',function() {
                //         console.log('load')
                //         $('title').html('投票');
                //     })
                // })


                right.append(right_name, right_company, right_details);
                var click_button = $('<div class="click_button"></div>').append(left_button, right_button);
                details_dom.append(left, right, click_button);
                console.log('这事wrap')
                console.log($('.wrap'))
                $('.wrap').append(top, details_dom, footer);

                // var inputs = $('<input type="radio"/>').attr({
                //     name: "qid" + data.qid,
                //     value: data.oid
                // });
                // $('#form1 li').append(inputs);

                left_button.click(function () {
                    // inputs.attr("checked","checked");
                    //$("#form1").submit();  
                    $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&act=subAttr&sur_id=2156&qid13762=" + data.oid + "&callback=?", function (data) {
                        if (data.msg) {
                            //把每个投票成功的人的oid当作key,在这一分钟缓存内自己模拟数据加减
                            if(data.msg == '投票成功') {
                                var myStorageKey = 'toupiao' + oid;
                                var addCount = localStorage.getItem(myStorageKey) || '0';
                                var newAddCount = parseInt(addCount) + 1;
                                var count = newAddCount.toString();
                                localStorage.setItem(myStorageKey, count);
                                var succeedTime = new Date();
                                localStorage.setItem('succeedTime', (succeedTime.getTime()).toString());
                                alert(data.msg)   
                            }else{
                                var clickTime = new Date();
                                var milliseconds = clickTime.getTime();
                                console.log(milliseconds)
                                console.log(localStorage.getItem('succeedTime'));
                                console.log(parseInt(milliseconds - localStorage.getItem('succeedTime'))/1000);
                                var pastTiem = parseInt(myAllData.data.refresh_frequency - parseInt(milliseconds - localStorage.getItem('succeedTime'))/1000);
                                alert('请勿频繁投票，请' + pastTiem + '秒之后再试')
                                // if(myAllData.data.refresh_frequency == '60') {
                                //     alert(data.msg)                                
                                // }
                            }
                            
                        }
                    });
                })
                
                return;
            }
        }
           
        // })
    }
    $.getJSON("http://zx.jiaju.sina.com.cn/index.php?app=Api&mod=Survey&sur_id=2156&callback=?", function (data) {
        renderData(data.data.question[0].option, data);
    });

})