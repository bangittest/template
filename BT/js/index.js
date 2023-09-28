const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const inputConfirmPassword = document.getElementById("confirmPassword")
const errMess = document.getElementById("errMess")

//
document.getElementById("register").addEventListener("submit", function (e) {
    e.preventDefault() //

    const email = inputEmail.value
    const password = inputPassword.value
    const confirmPassword = inputConfirmPassword.value

    if (password != confirmPassword) {
        errMess.innerHTML = "Xac nhan lai mat khau !"
        return
    } else {
        errMess.innerHTML = ""
    }

    // keo data ve
    // ban đầu khi coppy code thì chưa có database nên lên localStorage tạo database với tên giống với tên database sẽ kéo về: bt3_users
    const users = JSON.parse(localStorage.getItem("bt3_users"))
    // kiem tra xem trong cac user thi co ai trung email voi ng dang dang ky hay ko
    const index = users.findIndex(user => user.email == email)

    if (index != -1) {
        errMess.innerHTML = "Da co tk nay"
    } else {
        const user = {
            email, password
        }
        users.push(user)
        localStorage.setItem("bt3_users", JSON.stringify(users))
        errMess.innerHTML = "Dang Ky Thanh Cong !"
    }
    this.reset()
})