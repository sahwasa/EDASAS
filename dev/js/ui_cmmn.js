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
const addGrade = function(targetval, target, page){
  switch (page) {
    case '2'://건축물
      if(targetval >= 90 && targetval <= 100){
        target.addClass('grade1');
      }else if(targetval >= 80 && targetval < 90){
        target.addClass('grade2');
      }else if(targetval >= 70 && targetval < 80){
        target.addClass('grade3');
      }else if(targetval >= 60 && targetval < 70){
        target.addClass('grade4');
      }else if(targetval < 60 && targetval >= 0) {
        target.addClass('grade5');
      }else{
        target.addClass('grade0');
      }
      break;  
    case '3'://지진화재 위험도
      if(targetval >= 81 && targetval <= 100){
        target.addClass('grade1');
      }else if(targetval >= 61 && targetval < 81){
        target.addClass('grade2');
      }else if(targetval >= 41 && targetval < 61){
        target.addClass('grade3');
      }else if(targetval >= 21 && targetval < 41){
        target.addClass('grade4');
      }else if(targetval < 21 && targetval >= 0) {
        target.addClass('grade5');
      }else{
        target.addClass('grade0');
      }
      break;  
    case '4'://복구역량도
      if(targetval >= 85 && targetval <= 100){
        target.addClass('grade1');
      }else if(targetval >= 75 && targetval < 85){
        target.addClass('grade2');
      }else if(targetval >= 65 && targetval < 75){
        target.addClass('grade3');
      }else if(targetval >= 55 && targetval < 65){
        target.addClass('grade4');
      }else if(targetval < 55 && targetval >= 0) {
        target.addClass('grade5');
      }else{
        target.addClass('grade0');
      }
      break;
    case '5'://대피안전도
      if(targetval >= 85 && targetval <= 100){
        target.addClass('grade1');
      }else if(targetval >= 75 && targetval < 85){
        target.addClass('grade2');
      }else if(targetval >= 65 && targetval < 75){
        target.addClass('grade3');
      }else if(targetval >= 55 && targetval < 65){
        target.addClass('grade4');
      }else if(targetval < 55 && targetval >= 0) {
        target.addClass('grade5');
      }else{
        target.addClass('grade0');
      }
      break;
    case '6'://긴급대응 도로〮공간 확보계수 평가
      if(targetval >= 57.1 && targetval <= 100){
        target.addClass('grade1');
      }else if(targetval >= 52.1 && targetval < 57.1){
        target.addClass('grade2');
      }else if(targetval >= 47.1 && targetval < 52.1){
        target.addClass('grade3');
      }else if(targetval >= 40.1 && targetval < 47.1){
        target.addClass('grade4');
      }else if(targetval < 40.1 && targetval >= 0) {
        target.addClass('grade5');
      }else{
        target.addClass('grade0');
      }
      break;  
    default://종합안전도      
      if(targetval >= 80 && targetval <= 100){
        target.addClass('grade1');
      }else if(targetval >= 60 && targetval < 80){
        target.addClass('grade2');
      }else if(targetval >= 40 && targetval < 60){
        target.addClass('grade3');
      }else if(targetval >= 20 && targetval < 40){
        target.addClass('grade4');
      }else if(targetval < 20 && targetval >= 0) {
        target.addClass('grade5');
      }else{
        target.addClass('grade0');
      }   
    break;
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
  	// nav
	var $nav=$('.nav'),
    	$deps1=$('.nav_lst>li'),
    	$deps2=$('.nav .sub li'),
      $snb = $('.snb_lst li'),
    	preLocate,deps1Locate,deps2Locate,
    	indexDeps1,getDeps,indexDeps2,
    	locate=window.location.href;

	menuInit();
	function menuInit(){
		$deps1.each(function(index, item){
		var getAttr=$(this).children('a').attr('href');
      index+=1;
      indexDeps1=$(this).children('a').attr('href',getAttr + "#?index="+ index +',1');
      indexDeps2=$(this).find($deps2);
      getDeps=$(this).children('a').attr('href');
      indexDeps2.each(function(index2, item){
        getAttr=$(this).children('a').attr('href');
        index2+=1;
        indexDeps2=$(this).children('a').attr('href',getAttr + "#?index="+index+',' + index2);
      });
    });    

		if(locate.indexOf("index=")>-1){
			preLocate=locate.split("index=")[1].split(',');
			deps1Locate=preLocate[0]-1;
			deps2Locate=preLocate[1]-1;
      $deps1.eq(deps1Locate).children('a').addClass('on');
      $deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).children('a').addClass('on');
      $snb.eq(deps2Locate).addClass('on');
      $snb.each(function(index){
        getAttr = $(this).children('a').attr('href');
        index += 1;
        $(this).children('a').attr('href',getAttr + "#?index="+ preLocate[0]+','+index);
      })      
		}
	};

  function menuEvt(el){
    var getAttr=el.attr('href').split("index=")[1].split(',');
    deps1Locate=getAttr[0]-1;
    deps2Locate=getAttr[1]-1;
    console.log(deps1Locate,deps2Locate);
    $deps1.find('a').removeClass('on');
    $deps2.find('a').removeClass('on');
    $snb.removeClass('on');
    $deps1.eq(deps1Locate).children('a').addClass('on')
    $deps1.eq(deps1Locate).find($deps2).eq(deps2Locate).children('a').addClass('on');
    el.parent('li').addClass('on');    
  }
  $deps1.on('click','a',function(){menuEvt($(this))});
  $deps2.on('click','a',function(){menuEvt($(this))});
  $snb.on('click','a',function(){menuEvt($(this))});
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
  $('.tab_contents').find('.tab_container').children('.tab_contents').first().show();
  $('.tab li').off('click').on('click', function (e) {
    e.preventDefault()
    $(this).addClass('on').siblings().removeClass('on')
    var link = $(this).find('a').attr('href')
    var findTarget = $(this).parents('.tab_wrap').next('.tab_container')
    findTarget.find('.tab_contents').hide()
    $(link).show();
  })

  //select_tab
  $('.seltab_wrap').find('.seltab_opt:not(:first)').hide().find('.seltab_opt:first').show();
  $('[data-seltab]').on('change',function(e){
    e.preventDefault();
    const link = $(this).val(),
          target = e.target.dataset.seltab;
    $('#'+target).find('.seltab_opt').hide();
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


   /* fileDeco */
  var filePath = $('[role="filePath"]');
  filePath.val('선택된 파일이 없습니다.');
  $('[role="fileAdd"]').on('change',function(){
    var fileAdd = $(this);
    fileAdd.parent('.file_ipt').find('[role="filePath"]').val(fileAdd.val());
  });

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

  function grade(){
    const loc = window.location.href.split("index=")[1].split(',')[1];
    const meters = $('.meter_wrap').find('meter');
    const pies = $('.pie_graphwrap').find('.pie');
    const heatmapH = $('.heatmap').find('strong');
    const heatmap = $('.heatmap').find('li');
    meters.each(function(idx,el){
      let targetval = $(this).val();
      addGrade(targetval, $(this), loc);
      if(targetval < 10) targetval += 5;
      $(this).attr('style',`--val:${targetval}%`)
    })
    pies.each(function(idx,el){
      let targetval = parseFloat($(this).css('--val').trim());
      addGrade(targetval, $(this), loc);
    })
    heatmapH.each(function(idx,el){
      let targetval = parseFloat($(this).find('.score').text().trim());
      addGrade(targetval, $(this), loc);
    })
    heatmap.each(function(idx,el){
      let targetval = parseFloat($(this).find('.score').text().trim());
      addGrade(targetval, $(this), loc);
    })
  }
  grade();
}
const path = "../images/temp/",
      distribution = 'distribution_map.png',
      distribution_legend = $('.distribution_legend'),
      origin_legend = $('.safety_grade');
function mapTgl(gradeMap){
  $('[name="map_type"]').on('change',function(){
    let type = $(this).prop('id'),
        map = $('.temp_map').children('img');
    if(type == 'map_type2'){
      map.prop('src',path + distribution)
      origin_legend.hide();
      distribution_legend.show();
    }else{
      map.prop('src',path + gradeMap);
      origin_legend.show();
      distribution_legend.hide();
    }
  })
}