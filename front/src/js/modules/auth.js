// export function auth() {
//     var rhttp = new XMLHttpRequest();

//     rhttp.onreadystatechange = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             if (this.responseText == "!found") {
//                 // window.location.href = "http://localhost:5173/pages/login.html";
//                 console.log(this.responseText);
//                 console.log("autentificando");
//             }
//         };

//         rhttp.open("GET", "http://localhost:8080/GAM/Auth", true);
//         rhttp.send();
//     }
// }