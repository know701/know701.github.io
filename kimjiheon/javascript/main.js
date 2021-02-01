//start page
window.onload = function () {
    var typingBool = false;
    var typingIdx = 0;
    var typingTxt = $(".typing-txt").text();
    typingTxt = typingTxt.split("");
    if (typingBool == false)
        typingBool = true;
    var tyInt = setInterval(typing, 200);

    function typing() {
        if (typingIdx < typingTxt.length) {
            $(".typing-result").append(typingTxt[typingIdx]);
            typingIdx++;
        } else {
            clearInterval(tyInt);
        }
    }
    startPage();
    function startPage() {
        setTimeout(() => {
            $('#page-start').fadeOut(2000, 'swing');
        }, 8000);
    }
}

//onepage
$(function () {
    window.addEventListener("wheel", function (event) {
        event.preventDefault();
    }, { passive: false });
    var $html = $("html");
    var page = 1;
    var lastPageNo = $(".page").length;
    $html.animate({ scrollTop: 0 }, 3);

    $(window).on("wheel", function (event) {
        if ($html.is(":animated")) return;
        if (event.originalEvent.deltaY > 0) {
            if (page == lastPageNo) return;
            page++;
        }
        else if (event.originalEvent.deltaY < 0) {
            if (page == 1) return;
            page--;
        }
        var scrollTop = $(window).height() * (page - 1);
        $html.stop().animate({ "scrollTop": scrollTop });
    });
});


//modal
function signupButton() {
    const menuBtn = document.querySelector('.wrap');
    menuBtn.classList.toggle('active');
    const signupBtn = document.querySelector('div.signup');
    signupBtn.classList.toggle('active');

}
function loginButton() {
    const menuBtn = document.querySelector('.wrap');
    menuBtn.classList.toggle('active');
    const loginBtn = document.querySelector('div.login');
    loginBtn.classList.toggle('active');
}
function memberButton() {
    const menuBtn = document.querySelector('.wrap');
    menuBtn.classList.toggle('active');
    const memberBtn = document.querySelector('div.member');
    memberBtn.classList.toggle('active');
}

// 유효성검사
function check() {
    if ($(signId).val() == '') {
        alert("아이디를 입력해주세요");
        return false;
    }
    if ($(signPw1).val() == '') {
        alert("비밀번호를 입력해주세요");
        return false;
    }
    if ($(signPw2).val() == '') {
        alert("비밀번호 확인을 입력해주세요");
        return false;
    }
    if ($(signPw1).val() != $(signPw2).val()) {
        alert("비밀번호 일치하지않습니다.");
        return false;
    }
    if ($(signEmail).val() == '') {
        alert("이메일을 입력해주세요");
        return false;
    }
    if ($(signAge).val() == '') {
        alert("나이를 입력해주세요");
        return false;
    }
}
//회원가입 관련 스크립트
function newMember(id, password, passwordConfirm, email, age) {
    this.id = id;
    this.password = password;
    this.passwordConfirm = passwordConfirm;
    this.email = email;
    this.age = age;
    this.time = new Date().getTime();
}
function displayTime(date) {
    return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate()
        + " " + date.getHours() + ":" + date.getMinutes();
}
function saveMember() {
    var member = new newMember($(signId).val(), $(signPw1).val(), $(signPw2).val(), $(signEmail).val(), $(signAge).val());
    var arr = JSON.parse(localStorage.getItem("arr"));
    if (arr == null) { arr = []; }
    arr.push(member);

    var json = JSON.stringify(arr);
    localStorage.setItem("arr", json);

    $(signId).val('').focus();
    $(signPw1).val('');
    $(signPw2).val('');
    $(signEmail).val('');
    $(signAge).val('');
    memberList();
    alert("회원가입이 성공하였습니다.");
}
function memberList() {
    var arr = JSON.parse(localStorage.getItem("arr"));
    var $guestBook = $(userList);//table태그
    console.log(arr);

    $guestBook.html("<tr><th>No</th><th>id</th><th>방문기록</th></tr>");

    if (arr == null) {
        $guestBook.append("<tr><td colspan='4'>방문자가 없습니다.</td></tr>");
    }
    else {
        arr.reverse();

        $.each(arr, function (index, elem) {
            console.log(index, elem);
            var date = new Date(elem.time);
            var tr = "<tr>";
            tr += "<td>" + (index + 1) + "</td>";
            tr += "<td>" + elem.id + "</td>";
            tr += "<td>" + displayTime(date) + "</td>";
            tr += "</tr>";
            console.log(tr);
            $guestBook.append(tr);
        });
    }
}
