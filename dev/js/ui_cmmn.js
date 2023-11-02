const handleSelect = function (item) {
  if ($(item).hasClass('optionItem')) {
    // add disabled
    const isDisabled = $(item).attr('aria-disabled') === 'true'
    if (isDisabled) {
      return
    }
    const result = $(item).closest('.select_custom').find('.label')
    const resultVal = item.dataset.value
    result.html(item.innerHTML).attr('data-value', resultVal)
    result.parent().removeClass('active')
    console.log(resultVal)
    //변경시 이벤트 발생 추가
    if (item.parentNode.onchange) {
      item.parentNode.onchange()
    }
  }
}

const handleClose = function(e, range){
  let clickTarget = e;
  let handleRange = range;
  for (let i=0; i<=handleRange.length; i++){
    if(clickTarget.parents(handleRange[i]).length < 1){
      $(handleRange[i]).removeClass('on');
    }    
  }
}

const addGrade = function(targetval, target) {
  if(targetval > 80 && targetval <= 100){
    target.addClass('grade1');
  }else if(targetval > 60 && targetval <= 80){
    target.addClass('grade2');
  }else if(targetval > 40 && targetval <= 60){
    target.addClass('grade3');
  }else if((targetval > 20 && targetval <= 40)){
    target.addClass('grade4');
  }else if((targetval > 0 && targetval <= 20)) {
    target.addClass('grade5');
  }else{
    target.addClass('grade0');
  }
}
//focusout close
$('html').on('click',function(e){
  let eTarget = $(e.target);
  let range = ['.layer_tool'];
  handleClose(eTarget,range);
})
//로딩순서 때문에 수동실행
function commonInit() {
  //gnb
  $('.profile').on({
    click: function () {
      $(this).addClass('on')
    },
    focusin: function () {
      $(this).addClass('on')
    },
    focusout: function () {
      $(this).removeClass('on')
    },
  })

  // table_row checked
  $('.row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked'),
        checkName = 'select_tr',
        thisP = $(this).parents('.tbl_wrap');
        childBody = thisP.find('tbody');
      if ($(this).hasClass('all_check')) {        
        var childCheckIpt = childBody.find('.row_check');
        childCheckIpt.each(function () {
          var elRow = $(this).parents('tr')
          $(this).prop('checked', cur)
          cur ? elRow.addClass(checkName) : elRow.removeClass(checkName)
        })
      } else {
        var thisRow = $(this).parents('tr');
        if ($(this).prop('type') == 'radio') $(this).parents('table').find('tr').removeClass(checkName);
          cur ? thisRow.addClass(checkName) : thisRow.removeClass(checkName);
          var checkSize = childBody.find('.row_check:checked').length,
              allCtrl = thisP.find('.all_check');
          childBody.find('input:checkbox').length <= checkSize
            ? allCtrl.prop('checked', true)
            : allCtrl.prop('checked', false)
        }
    },
  })
  // tbl_list Handle checked
  $('.tbl_list .row_check').on({
    click: function (e) {
      e.stopPropagation()
    },
    change: function () {
      var cur = $(this).prop('checked')
      var thisLi = $(this).closest('li')
      if (cur) {
        thisLi.addClass('select_li')
      } else {
        thisLi.removeClass('select_li')
      }
    },
  })

  // list all check
  function all_check_evt(el) {
    const allCtrl = el.prop('checked'),
      thisChild = el
        .closest('.all_lst_ctrl')
        .next('.lst_ctrl')
        .find('input:checkbox')
    thisChild.prop('checked', allCtrl)
  }
  function all_check(el) {
    var thisP = el.parents('.lst_ctrl'),
      checkSize = thisP.find('input:checked').length,
      allCtrl = thisP.prev('.all_lst_ctrl').find('input:checkbox')
    thisP.find('input:checkbox').length <= checkSize
      ? allCtrl.prop('checked', true)
      : allCtrl.prop('checked', false)
  }
  $('.all_lst_ctrl').on('click change', 'input:checkbox', function () {
    all_check_evt($(this))
  })
  $('.lst_ctrl').on('click change', 'input', function () {
    all_check($(this))
  })
  $('.lst_ctrl')
    .find('input:checkbox')
    .each(function (index, item) {
      all_check($(item))
    })

  //layer_tool
  $(':has(.hasLayer)')
    .off('click').on('click focusin', '.layer_tool', function (e) {
      e.stopPropagation()
      e.preventDefault()
      $(this).addClass('on').css('z-index','100');
    })
    .on('focusout', '.layer_tool', function () {
      $(this).removeClass('on').css('z-index','0');
    });

  //tab
  $('.tab').find('li:first').addClass('on')
  $('.tab_container').find('.tab_contents:not(:first)').hide()
  $('.tab li').on('click', function (e) {
    e.preventDefault()
    $(this).addClass('on').siblings().removeClass('on')
    var link = $(this).find('a').attr('href')
    var link_num = link.substr(link.length - 1)
    $('.m_tab option')
      .eq(link_num - 1)
      .prop('selected', 'selected')
    var findTarget = $(this).parents('.tab_wrap').next('.tab_container')
    findTarget.find('.tab_contents').hide()
    $(link).show();
    if(typeof calendar !== 'undefined') calendar.updateSize();
  })

  //select_tab
  $('.seltab_wrap').find('.seltab_opt:not(:first)').hide().find('.seltab_opt:first').show();
  $('[data-seltab]').on('change',function(e){
    e.preventDefault();
    var link = $(this).val();
    $(this).next('.seltab_wrap').find('.seltab_opt').hide();
    $('#'+link).show();    
  });

  //addOPT
  $('[data-checkEvt]').on('change', function (e) {
    const getTarget = e.target.dataset.checkevt.split('!')
    let target
    if (getTarget[1]) {
      target = $('#' + getTarget[1])
      $(this).prop('checked') ? target.hide() : target.show()
    } else {
      target = $('#' + getTarget[0])
      $(this).prop('checked') ? target.show() : target.hide()
    }
  })
  $('[data-selectEvt]').on('change', function (e) {
    const getTarget = e.target.dataset.selectevt;
    const result = $(this).val();
    let target = $('#' + getTarget + result);
    $('[data-selectTarget]').hide();
    if(target.length){
      target.show();
    }
  })
  $('[data-tglwrap]').hide().first().show()
  $('[data-toggle]').off('click').on('click', function (e){
    e.stopPropagation();
    const getTarget = e.target.dataset.toggle
    target = $('#' + getTarget)
    target.show()
    $(this).closest('[data-tglwrap]').hide()
  })

  const getYear = new Date()
  $("[name='ipt_year']").val(getYear.getFullYear())


  // add file
  $('.upFile').on('change', function () {
    $(this)
      .prev()
      .val(this.value.replace(/c:\\fakepath\\/i, ''))
    console.log($(this))
  })

  // toggle button
  $('.evt_tgl')
    .off('click')
    .on('click', function (e) {
      // 기존에 등록된 이벤트 리스너 제거
      e.preventDefault()
      var cur = e.target.dataset
      if ($(this).attr('disabled') == 'disabled') return false
      if (cur.value == 'on') {
        $(this)
          .attr({
            'data-value': 'off',
            title: cur.off,
          })
          .html(cur.off)
      } else {
        $(this)
          .attr({
            'data-value': 'on',
            title: cur.on,
          })
          .html(cur.off)
      }
    })

  $('.sidePannel_fold').on('click', function (e) {
    var snbBtn = e.target.dataset,
      fold_wrap = $('.' + snbBtn.foldtarget),
      snbWidth = fold_wrap.children('.pannel_wrap').width(),
      speed = 500;
      console.log(fold_wrap);
    snbBtn.value == 'on'
      ? fold_wrap.animate({ width: 0 }, speed)
      : fold_wrap.animate({ width: snbWidth }, speed)
  })

  const select_custom = $('.select_custom')
  const label = select_custom.find('.label')
  const options = select_custom.find('.optionItem')
  options.off('click').on('click', function (e) {
    const eclass = Array.prototype.slice.apply(e.target.classList)
    if (!eclass.includes('optionItem'))
      handleSelect($(this).closest('.optionItem')[0])
    else handleSelect(e.target)
  })
  label.off('click').on('click', function () {
    select_custom.removeClass('active')
    $(this).parent().hasClass('active')
      ? $(this).parent().removeClass('active')
      : $(this).parent().addClass('active')
  })
  $('select').on('change', function () {
    $(this).css('color', 'inherit')
  })
  const meters = $('.meter_wrap').find('meter');
  meters.each(function(idx,el){
    let targetval = $(this).val();
    addGrade(targetval, $(this));
    if(targetval < 10) targetval += 5;
    $(this).attr('style',`--val:${targetval}%`)
  })
  const pies = $('.pie_graphwrap').find('.pie');
  pies.each(function(idx,el){
    let targetval = parseFloat($(this).css('--val').trim());
    addGrade(targetval, $(this));
  })
  const heatmapH = $('.heatmap').find('strong');
  heatmapH.each(function(idx,el){
    let targetval = parseFloat($(this).find('.score').text().trim());
    addGrade(targetval, $(this));
  })
  const heatmap = $('.heatmap').find('li');
  heatmap.each(function(idx,el){
    let targetval = parseFloat($(this).find('.score').text().trim());
    addGrade(targetval, $(this));
  })

}