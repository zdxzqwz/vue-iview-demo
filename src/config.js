export default {
    baseApi: "http://localhost:9001", //dev
    //测试环境
    // baseApi: "http://112.126.68.50:9000", //pro 
    apiVersion: "/api/v1",
    noApiUrl: ["/login", "/islogin", "/logout", "/isvalid", "/getUserInfo"],
    errorMsg: "系统连接超时，请稍后重试！"
}
