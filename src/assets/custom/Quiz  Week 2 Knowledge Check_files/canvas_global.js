////////////////////////////////////////////////////
// DESIGN TOOLS CONFIG                            //
////////////////////////////////////////////////////
// Copyright (C) 2016  Utah State University
var DT_variables = {
        iframeID: '',
        // Path to the hosted USU Design Tools
        path: 'https://designtools.ciditools.com/',
        templateCourse: '231',
        // OPTIONAL: Button will be hidden from view until launched using shortcut keys
        hideButton: false,
        // OPTIONAL: Limit tools loading by users role
        limitByRole: false, // set to true to limit to roles in the roleArray
        // adjust roles as needed
        roleArray: [
            'student',
            'teacher',
            'admin'
        ],
        // OPTIONAL: Limit tools to an array of Canvas user IDs
        limitByUser: false, // Change to true to limit by user
        // add users to array (Canvas user ID not SIS user ID)
        userArray: [
            '1234',
            '987654'

        ]
    };

var COURSE_ID_ZENDESK_FIELD_ID = 360009742832;
var COURSE_NAME_ZENDESK_FIELD_ID = 360009742852;
var hideFields = function() {
  var c, courseIdInput, courseNameInput, emailInput, nameInput;
  c = $('iframe#webWidget').contents();
  courseIdInput = c.find(`input[name='${COURSE_ID_ZENDESK_FIELD_ID}']`);
  courseIdInput.parent().hide();
  courseNameInput = c.find(`input[name='${COURSE_NAME_ZENDESK_FIELD_ID}']`);
  courseNameInput.parent().hide();
  emailInput = c.find('input[name=email]');
  emailInput.parent().hide();
  nameInput = c.find('input[name=name]');
  nameInput.parent().hide();
  return;
};

var checkWidget = function() {
  if ($('#launcher').contents().find('#Embed')[0]) {
    $('#launcher').contents().find('#Embed').on('click', function() {
      setTimeout(hideFields, 300);
    });
  } else {
    setTimeout(checkWidget, 1000);
  }
}

var _tagify = function(str) {
  return str.replace(/[^A-Za-z0-9]/g, '');
};

// Append google analytics script
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

// Run the necessary code when a page loads
$(document).ready(function () {
    'use strict';
    // This runs code that looks at each page and determines what controls to create
    $.getScript(DT_variables.path + 'js/master_controls.js', function () {
        console.log('master_controls.js loaded');
    });
    window.onload = function() {
        var externalToolIframe = $('#tool_content')[0];
        if (externalToolIframe) {
            var name = document.getElementById('lis_person_name_full') && document.getElementById('lis_person_name_full').value;
            var email = document.getElementById('custom_canvas_user_login_id') && document.getElementById('custom_canvas_user_login_id').value;
          externalToolIframe.contentWindow.postMessage({name, email}, 'https://helpdeskserver.emeritus.org/');
          externalToolIframe.contentWindow.postMessage({name, email}, 'https://survey.emeritus.org/');
        }
    }
    window.addEventListener('message', function(event) {
        var data = event.data || {};
        console.log('data ', data);
        if (data === 'back!' || data.message === 'back!') {
          return window.history.back();
        } else if (data.redirectUrl) {
          return window.top.location.href = data.redirectUrl;
        }
    });

    // In Google Analytics you'll need to set up custom dimensions as follows
    // Custom Dimension 1 = Canvas User ID --- Scope = User
    // Custom Dimension 2 = Archived --- Scope = User
    // Custom Dimension 3 = Canvas User Role --- Scope = User
    // Custom Dimension 4 = Canvas Course ID --- Scope = Hit
    // Custom Dimension 5 = Canvas Course Name --- Scope = Hit
    // Custom Dimension 6 = Canvas Sub-Account ID --- Scope = Hit

    // START - Google Analytics Tracking Code
    var sUserId;
    var sUserRole;
    var sMatches;
    var sCourseId; // Course ID from URL
    var sCourseName = null;
    var parent_account; // Give you the subaccount_id that the course is in
    var userRoles = ENV['current_user_roles'];

    ////////////////// CHANGE UA # HERE /////////////////////
    ga('create', 'UA-109308540-2', 'auto');

    //Get User Information
    sUserId = ENV["current_user_id"];
    ga('set', 'dimension1', sUserId);

    // Get User Role
    if ($.inArray('admin', userRoles) == -1 && $.inArray('teacher', userRoles) == -1 && $.inArray('student', userRoles) > -1) {
        sUserRole = "student";
    } else if ($.inArray('admin', userRoles) == -1 && $.inArray('teacher', userRoles) > -1) {
        sUserRole = "teacher";
    } else if ($.inArray('admin', userRoles) > -1) {
        sUserRole = "admin";
    } else {
        sUserRole = "other";
    }

    ga('set', 'dimension3', sUserRole);

    // If the user is in a course
    sMatches = window.location.pathname.match(/\/courses\/(\d+)/);
    sCourseId = sMatches && sMatches[1];
    if (sCourseId) {
        // Get Course information - Course Name and parent sub-account id
        $.get('/api/v1/courses/' + sCourseId, function (_course) {
            parent_account = _course.account_id;
            parent_account = parent_account.toString();
            sCourseName = _course.name;

            // ...do stuff...
            ga('set', 'dimension4', sCourseId);
            ga('set', 'dimension5', sCourseName);
            ga('set', 'dimension6', parent_account);
            ga('send', 'pageview');
        });
    } else {
        ga('send', 'pageview');
    }
    // END - Google Analytics Tracking Code

});
////////////////////////////////////////////////////
// END DESIGN TOOLS CONFIG                        //
////////////////////////////////////////////////////

(function(){
  var url = window.location.href;
  var referrerUrl = document.referrer;

  function getParameterByName(u, name) {
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(u);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  var university = getParameterByName(url, 'university') || getParameterByName(referrerUrl, 'university');
  var body = document.body;

  var re = /courses\/(\d+)/;
  var matches = url.match(re);
  var courseId = matches && matches[1];
  var checkCourseUrl = `https://helpdeskserver.emeritus.org/api/has-zendesk-widget/${courseId}`;
  $.ajax({
    type: 'POST',
    url: checkCourseUrl,
    success: function(res) {
      if (res) {
        window.zE||function(t,e,a){var s=[];var c=function(){
          s.push(arguments)};var n=t.createElement(e);n.type="text/javascript";
          n.src="https://static.zdassets.com/ekr/asset_composer.js?key="+a;
          n.setAttribute("charset","utf-8");n.async=true;c._=s;c.t=Date.now();
          c.s=n; window.zE=window.zEmbed=c;t.getElementsByTagName("head")[0].appendChild(n)}
          (document,"script","01f7c129-e3d4-4ed7-ac97-c959acf56f69");

        var name = ENV.current_user.display_name || document.getElementById('lis_person_name_full') && document.getElementById('lis_person_name_full').value;
        var email = ENV.USER_EMAIL || document.getElementById('custom_canvas_user_login_id') && document.getElementById('custom_canvas_user_login_id').value;
        var courseName = ENV.COURSE_TITLE || document.getElementById('context_title') && document.getElementById('context_title').value || document.getElementById('breadcrumbs').childNodes[0].childNodes[1].childNodes[0].childNodes[0].innerHTML;

        window.zESettings = {
          webWidget: {
            contactForm: {
              tags: [courseId, _tagify(courseName)],
              fields: [
                { id: COURSE_ID_ZENDESK_FIELD_ID, prefill: { '*': courseId } },
                { id: COURSE_NAME_ZENDESK_FIELD_ID, prefill: { '*': courseName } }
              ]
            }
          }
        }

        var userId = ENV.current_user_id;
        var profileUrl = `https://student.emeritus.org/api/v1/users/${userId}/profile`;

        if (!name || !email) {
          $.ajax({
              url: profileUrl,
              headers: {'authorization': 'Bearer 7357~7maGGSQ3mhf1QxIPfCwb5o100QlRmCcfUTtFVlAWyK9k6bo9OfkoAEqF4loDwolV'},
              success: function(data) {
                window.zE(function() {
                  return zE.identify({name: data.name, email: data.primary_email});
                });
              }
          });
        } else {
          window.zE(function() {
            return zE.identify({name, email});
          });
        }
        checkWidget();
      }
    }
  });

  if (url.indexOf('login/canvas') < 0) return;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    switch(university) {
      case 'mit':
        body.classList.add('-m-custom-mit')
        break;

      case 'columbia':
        body.classList.add('-m-custom-columbia')
        break;

      case 'wharton':
        body.classList.add('-m-custom-wharton')
        break;

      case 'lbs':
        body.classList.add('-m-custom-lbs');
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'https://cdn.rawgit.com/ovvn/assets/1d60e2cd/emeritus/lbs-favicon-48x48.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
        break;

      case 'berkeley':
        body.classList.add('-m-custom-berkeley');
        break;

      case 'kellogg':
        body.classList.add('-m-custom-kellogg');
        break;

      case 'iese':
        body.classList.add('-m-custom-iese');
        break;

      case 'imd':
        body.classList.add('-m-custom-imd');
        break;

      default:
        body.classList.add('-m-custom-default');
        document.getElementsByTagName('html')[0].style.overflow = 'auto';
        return;
    }
  } else {
    var logoNode = document.getElementsByClassName('ic-Login-header__logo')[0],
      imgNode = logoNode.children[0],
      inputEmail = document.getElementById('pseudonym_session_unique_id'),
      inputPass = document.getElementById('pseudonym_session_password');

    switch(university) {
      case 'mit':
        body.classList.add('-custom-mit')
        imgNode.src = 'https://cdn.rawgit.com/ovvn/assets/45334399/emeritus/MIT_logo.svg';
        imgNode.style.width = '237px';
        inputEmail.placeholder = 'Your email ID';
        inputPass.placeholder = 'Password';
        break;

      case 'columbia':
        body.classList.add('-custom-columbia')
        imgNode.src = 'https://user-images.githubusercontent.com/41906936/59423749-60f75480-8df0-11e9-9d3e-2f9e6049c845.png';
        imgNode.style.width = '372px';
        inputEmail.placeholder = 'Your email ID';
        inputPass.placeholder = 'Password';
        break;

      case 'wharton':
        body.classList.add('-custom-wharton')
        imgNode.src = 'https://cdn.rawgit.com/ovvn/assets/a8d01e41/emeritus/wharton_blue_logo.png';
        imgNode.style.width = '372px';
        inputEmail.placeholder = 'Your email ID';
        inputPass.placeholder = 'Password';
        break;

      case 'lbs':
        body.classList.add('-custom-lbs')
        imgNode.src = 'https://cdn.rawgit.com/ovvn/assets/d18fd377/emeritus/London_logo.png';
        imgNode.style.width = '220px';
        inputEmail.placeholder = 'Your email ID';
        inputPass.placeholder = 'Password';
        // Set favicon
        var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = 'https://cdn.rawgit.com/ovvn/assets/1d60e2cd/emeritus/lbs-favicon-48x48.ico';
        document.getElementsByTagName('head')[0].appendChild(link);
        break;

      case 'berkeley':
        body.classList.add('-custom-berkeley')
        imgNode.src = 'https://raw.githubusercontent.com/ovvn/assets/master/emeritus/berkeley-logo.png';
        imgNode.style.width = '320px';
        inputEmail.placeholder = 'Your Email Id';
        inputPass.placeholder = 'Password';
        break;

      case 'kellogg':
        body.classList.add('-custom-kellogg')
        imgNode.src = 'https://raw.githubusercontent.com/ovvn/assets/master/emeritus/kellogg-logo.png';
        imgNode.style.width = '380px';
        inputEmail.placeholder = 'Your Email Id';
        inputPass.placeholder = 'Password';
        break;

      case 'iese':
        body.classList.add('-custom-iese')
        imgNode.src = 'https://user-images.githubusercontent.com/41906936/53900254-20a27080-4062-11e9-9eff-f3ebab9b7dd9.png';
        imgNode.style.width = '220px';
        inputEmail.placeholder = 'Su Email ID';
        inputPass.placeholder = 'Contraseña';
        document.querySelectorAll('label[for=pseudonym_session_password]')[0].textContent = "Contraseña";
        document.querySelectorAll('a[id=login_forgot_password]')[0].textContent = "¿Olvidé mi contraseña?";
        document.querySelectorAll('p[id=forgot_password_instructions]')[0].textContent = "Ingrese su correo electrónico y le enviaremos un enlace para cambiar su contraseña.";
        document.querySelectorAll('a[class=ic-Login__actions--left ic-Login__link login_link]')[0].textContent = "Regresar a la página de inicio";
        break;

      case 'imd':
        body.classList.add('-custom-imd')
        imgNode.src = 'https://user-images.githubusercontent.com/41906936/57368065-e495a400-71a7-11e9-93bc-e533bc8bae75.png';
        imgNode.style.width = '160px';
        break;

      default:
        body.classList.add('-custom-default')
        return;
    }
  }
})();