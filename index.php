<?php
session_start();
header('Content-Type: application/json');

// Nếu chưa có danh sách user trong session, khởi tạo mảng users
if (!isset($_SESSION['users'])) {
    $_SESSION['users'] = [
        ["id" => 1, "username" => "admin", "password" => "123456"],
        ["id" => 2, "username" => "user1", "password" => "password"]
    ];
}

// Hàm đăng ký
function register($username, $password) {
    $file = "users.json";

    // Đọc dữ liệu hiện có từ file JSON
    $users = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    // Kiểm tra username đã tồn tại chưa
    foreach ($users as $user) {
        if ($user["username"] === $username) {
            return ["error" => "Tên người dùng đã tồn tại!"];
        }
    }

    // Giả lập ID mới
    $newId = count($users) + 1;
    $users[] = ["id" => $newId, "username" => $username, "password" => $password];

    // Lưu lại vào file JSON
    file_put_contents($file, json_encode($users, JSON_PRETTY_PRINT));

    return ["success" => "Đăng ký thành công!", "user_id" => $newId];
}


function login($username, $password) {
    $file = "users.json";
    $users = file_exists($file) ? json_decode(file_get_contents($file), true) : [];

    foreach ($users as $user) {
        if ($user["username"] === $username && $user["password"] === $password) {
            // Tạo 1 "token" giả lập (bạn có thể dùng JWT thực sự sau này)
            $token = bin2hex(random_bytes(16));

            // Lưu token tạm vào file token.json
            file_put_contents("token.json", json_encode([
                "token" => $token,
                "user" => $user
            ]));

            return ["success" => "Đăng nhập thành công!", "token" => $token, "user_id" => $user["id"]];
        }
    }

    return ["error" => "Tên đăng nhập hoặc mật khẩu không đúng!"];
}



// Hàm lấy danh sách người dùng
function getUsers() {
    $file = "users.json";
    return file_exists($file) ? json_decode(file_get_contents($file), true) : [];
}


function checkLogin($token) {
    if (!file_exists("token.json")) {
        return ["error" => "Chưa đăng nhập"];
    }

    $data = json_decode(file_get_contents("token.json"), true);

    if ($data["token"] === $token) {
        return ["user" => $data["user"]];
    }

    return ["error" => "Token không hợp lệ"];
}

function logout($token) {
    $file = "token.json";

    if (!file_exists($file)) {
        return ["error" => "Chưa đăng nhập"];
    }

    $data = json_decode(file_get_contents($file), true);

    // So khớp token
    if ($data["token"] === $token) {
        // Xoá token để đăng xuất
        unlink($file);
        return ["success" => "Đã đăng xuất"];
    }

    return ["error" => "Token không hợp lệ"];
}
// Lấy dữ liệu từ URL hoặc Header
$action = $_GET['action'] ?? null;
$username = $_GET['username'] ?? null;
$password = $_GET['password'] ?? null;
$token    = $_GET['token'] ?? getBearerToken(); // Ưu tiên lấy từ header

switch ($action) {
    case "register":
        if (!$username || !$password) {
            echo json_encode(["error" => "Thiếu thông tin username hoặc password"]);
        } else {
            echo json_encode(register($username, $password));
        }
        break;

    case "login":
        if (!$username || !$password) {
            echo json_encode(["error" => "Thiếu thông tin username hoặc password"]);
        } else {
            echo json_encode(login($username, $password));
        }
        break;

    case "users":
        echo json_encode(getUsers());
        break;

    case "checkLogin":
        if (!$token) {
            echo json_encode(["error" => "Thiếu token"]);
        } else {
            echo json_encode(checkLogin($token));
        }
        break;

    case "logout":
        if (!$token) {
            echo json_encode(["error" => "Thiếu token"]);
        } else {
            echo json_encode(logout($token));
        }
        break;

    default:
        echo json_encode(["error" => "API không hợp lệ"]);
}
// Hàm lấy token từ header Authorization: Bearer <token>
function getBearerToken() {
    $headers = getallheaders();
    if (isset($headers['Authorization'])) {
        if (preg_match('/Bearer\s(\S+)/', $headers['Authorization'], $matches)) {
            return $matches[1];
        }
    }
    return null;
}
?>
