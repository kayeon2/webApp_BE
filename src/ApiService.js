import { API_BASE_URL } from "./app-config";

export function call(api, method, request) {
    let headers = new Headers({
        "Content-Type": "application/json"
    });

    const accessToken = localStorage.getItem("ACCESS_TOKEN");
    if(accessToken && accessToken != null) {
        headers.append("Authorization", "Bearer " + accessToken);
    }

    let options = {
        headers: headers,
        url: API_BASE_URL + api,
        method: method,
    };

    if(request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options).then((response) => {
        if(response.status === 200) {
            return response.json();
        }
        else if(response.status === 403) {
            window.location.href = "/login";
        }
        else {
            Promise.reject(response);
            throw Error(response);
        }
    }).catch((error) => {
        console.log("http error");
        console.log(error);
    });
}

// 로그인
export function signin(userDTO) {
    return call("/auth/signin", "POST", userDTO)
    .then((response) => {
        if(response.token) {
            // 로컬 스토리지에 토큰, 유저 네임 저장
            localStorage.setItem("ACCESS_TOKEN", response.token);
            localStorage.setItem("USERNAME", userDTO.username);
            window.location.href = "/";
        }
        // console.log("response: ", response);
        // alert("로그인 토큰: " + response.token);
    });
}

// 로그아웃
export function signout() {
    localStorage.setItem("ACCESS_TOKEN", null);
    window.location.href = "/login";
}

// 회원가입
export function signup(userDTO) {
    return call("/auth/signup", "POST", userDTO);
}