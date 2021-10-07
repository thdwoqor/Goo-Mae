const id = document.querySelector('#floatingInput'),
    pw = document.querySelector('#floatingPassword'),
    login_btn = document.querySelector('button');

login_btn.addEventListener("click",login);

async function login() {
    const req= {
        id : id.value,
        pw : pw.value
    }

    const response = await fetch('/login',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body:JSON.stringify(req)
    });
    const res = await response.json();

    if(res.success){
        location.href ="/";
        console.log("로그인 성공");
    }else{
        const error = document.querySelector('#error').style.display="";
        console.log("로그인 실패");
    }
}