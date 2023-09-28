// localStorage.setItem("users", JSON.stringify([
//     {
//         id: 1,
//         firstName: "nguyen",
//         lastName: "minh",
//         userName: "minhnguyen245",
//         email: "minhnguyen98@gmail.com",
//         password: "12345A",
//         avatar: "avatar.jpg",
//         role: "user"
//     }
// ]))

// ===============   Login Form   ==================
const userNameLog = document.getElementById("username-log")
const passwordLog = document.getElementById("password-log")
const errUserNameLog = document.getElementById("username-log-error")
const errPasswordLog = document.getElementById("password-log-error")
// ====================================================

let fileNameGlobal = "" //biến lưu giữ link đến ảnh mà mình chọn
const NOTEMPTY = "Không được để trống"

// ===============   Register Form   ==================
const firstName = document.getElementById("firstname")
const lastName = document.getElementById("lastname")
const userNameReg = document.getElementById("username-reg")
const email = document.getElementById("email")
const passwordReg = document.getElementById("password-reg")
const confirmPassword = document.getElementById("confirm-password")
const avatar = document.getElementById("avatar")
const avatarPreview = document.getElementById("avatar-preview")

const errFirstName = document.getElementById("firstname-error")
const errLastName = document.getElementById("lastname-error")
const errUserNameReg = document.getElementById("username-reg-error")
const errEmail = document.getElementById("email-error")
const errPasswordReg = document.getElementById("password-reg-error")
const errConfirmPassword = document.getElementById("confirm-password-error")
// ====================================================

const arrInput = document.querySelectorAll("input")
for (const input of arrInput) {
    input.addEventListener("click", function (e) {
        this.parentNode.querySelector("p").innerHTML = ""
    })
}

// hàm ẩn hiện các form, lúc ẩn hiện thì reset form và xóa đi tất cả các lỗi, biến toàn cục và ảnh đang hiển thị
function toggleForm() {
    // ẩn và reset form login
    document.getElementById("form_login").classList.toggle("hiden")
    document.getElementById("login").reset()
    // ẩn và reset form register
    document.getElementById("form_register").classList.toggle("hiden")
    document.getElementById("register").reset()
    // xoá lỗi
    const arrError = document.querySelectorAll(".error-message")
    arrError.forEach(e => e.innerHTML = "")
    // xóa biến toàn cục
    fileNameGlobal = ""
    // xóa ảnh đang hiển thị
    avatarPreview.src = ""
}

// hàm lấy id bằng cách tìm id to nhất và trả ra id to hơn
function getNewId() {
    // lấy danh sách người dùng về
    const users = JSON.parse(localStorage.getItem("users"))
    //nếu rỗng thì trả ra id = 1
    if (users.length == 0) {
        return 1
    } else { // nếu có thì tìm id của user cuối cùng và trả ra id đó cộng thêm 1
        let idMax = users[users.length - 1].id
        return ++idMax
    }
}

// hàm kiểm tra từng trường dữ liệu nhập vào có đúng định dạng hay không
// field: gia trị trường cần kiểm tra
// errField: element đảm nhiệm in ra thông báo lỗi
// regex: quy tắc dùng để kiểm tra
// errMessage: nội dung của lỗi khi vi phạm quy tắc
function checkDataField(field, errField, regex, errMessage) {
    if (field == "") {
        errField.innerHTML = NOTEMPTY
    } else if (!regex.test(field)) {
        errField.innerHTML = errMessage
    } else {
        errField.innerHTML = ""
    }
}

// hàm kiểm tra tất cả các trường của user
function checkInfoRegister(user, confirmPassword) {

    const regexName = /^[a-zA-Z]{2,}$/;
    const regexUserName = /^[a-zA-Z0-9]{6,}$/;
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

    checkDataField(user.firstName, errFirstName, regexName, "Có ít nhất 2 ký tự")
    checkDataField(user.lastName, errLastName, regexName, "Có ít nhất 2 ký tự")
    checkDataField(user.userName, errUserNameReg, regexUserName, "Có ít nhất 6 ký tự")
    checkDataField(user.email, errEmail, regexEmail, "Không đúng định dạng email")
    checkDataField(user.password, errPasswordReg, regexPassword, "Có ít nhất: một chữ hoa, một số, 6 ký tự")

    if (confirmPassword == "") {
        errConfirmPassword.innerHTML = NOTEMPTY
    } else if (confirmPassword !== user.password) {
        errConfirmPassword.innerHTML = "Xác nhận lại mật khẩu"
    } else {
        errConfirmPassword.innerHTML = ""
    }

    const arrError = document.querySelectorAll("#register .error-message")
    let check = true;
    arrError.forEach(e => {
        if (e.innerHTML != "") {
            check = false
            return;
        }
    })

    return check
}

// hàm submit form register
document.getElementById("register").addEventListener("submit", function (e) {
    e.preventDefault()
    // tạo ra user từ thông tin người dùng nhập
    const user = {
        id: getNewId(),
        firstName: firstName.value.trim(),
        lastName: lastName.value.trim(),
        userName: userNameReg.value.trim(),
        email: email.value.trim(),
        password: passwordReg.value.trim(),
        avatar: fileNameGlobal,
        role: "user"
    }
    // gọi hàm kiểm tra tất cả các thông tin
    const checkInFo = checkInfoRegister(user, confirmPassword.value.trim(),)
    // nêu kết quả bên trên trả ra là đúng thì
    if (checkInFo) {
        // lấy data về
        const users = JSON.parse(localStorage.getItem("users"))
        // thêm phần tử mới
        users.push(user)
        // đẩy data lên
        localStorage.setItem("users", JSON.stringify(users))
        // ẩn form register và hiện form login
        toggleForm()
    }
})

// hàm thay đổi khi chọn ảnh mới
document.getElementById("avatar").addEventListener("change", function (e) {
    // lấy tên file ảnh
    const fileName = e.target.files[0].name
    // nếu rỗng thì biến cục bộ giữ giá trị của ảnh cũng phải rỗng
    if (fileName != "") {
        fileNameGlobal = fileName
    }
    // nếu chọn đc ảnh thì gán ảnh cho thẻ img hiển thị
    avatarPreview.src = `../img/${fileName}`
})

// hàm submit form login
document.getElementById("login").addEventListener("submit", function (e) {
    e.preventDefault()
    // lấy ra thông tin người dùng nhập
    userName = userNameLog.value.trim()
    password = passwordLog.value.trim()
    // lấy data về 
    const users = JSON.parse(localStorage.getItem("users"))
    // tìm tài khoản có username như người dùng nhập
    const index = users.findIndex(e => e.userName == userName)
    // nếu tìm không tháy thì báo lỗi
    if (index == -1) {
        errUserNameLog.innerHTML = "Không có tài khoản này"
    } else { // nếu tìm thấy thì xóa lỗi và check tiếp password
        errUserNameLog.innerHTML = ""
        // nếu password sai thì báo lỗi
        if (users[index].password != password) {
            errPasswordLog.innerHTML = "Sai mật khẩu"
        } else { // nếu password đúng thì xóa lỗi, reset form, chuyển sang trang sản phẩm
            errPasswordLog.innerHTML = ""
            localStorage.setItem("user_login", Number(users[index].id))
            this.reset()
            window.location.href = "product.html"
        }
    }
})