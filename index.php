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
$page = $_GET['page'] ?? null;
$limit = $_GET['limit'] ?? null;
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
    case "get_cat":
        echo dataCate();
        break;
    case "get_product":
        echo dataProduct($page, $limit);
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

function dataCate() {
    $dataPageHot = [
        [
            "key" => 1,
            "name" => "Top Quán được 5* tuần này",
            "description" => "khám phá quán mới thật ngon",
            "ref" => ""
        ],
        [
            "key" => 2,
            "name" => "Quán Mới Lên Sàn",
            "description" => "khám phá quán mới thật ngon",
            "ref" => ""
        ],
        [
            "key" => 3,
            "name" => "Ăn Thỏa Thích, Freeship 0Đ",
            "description" => "khám phá quán mới thật ngon",
            "ref" => ""
        ]
    ];
    
    return json_encode($dataPageHot);
}
function dataProduct($page = 1, $limit = 10) {
    $dataPageHot = [
        [
            'id' => 1,
            'title' => "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            'price' => 109.95,
            'description' => "Your perfect pack for everyday use and walks in the forest...",
            'category' => "men's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 3.9,
                'count' => 120
            ]
        ],
        [
            'id' => 2,
            'title' => "Mens Casual Premium Slim Fit T-Shirts ",
            'price' => 22.3,
            'description' => "Slim-fitting style, contrast raglan long sleeve...",
            'category' => "men's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.1,
                'count' => 259
            ]
        ],
        [
            'id' => 3,
            'title' => "Mens Cotton Jacket",
            'price' => 55.99,
            'description' => "great outerwear jackets for Spring/Autumn/Winter...",
            'category' => "men's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.7,
                'count' => 500
            ]
        ],
        [
            'id' => 4,
            'title' => "Mens Casual Slim Fit",
            'price' => 15.99,
            'description' => "The color could be slightly different between on the screen and in practice...",
            'category' => "men's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 2.1,
                'count' => 430
            ]
        ],
        [
            'id' => 5,
            'title' => "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            'price' => 695,
            'description' => "From our Legends Collection, the Naga was inspired by the mythical water dragon...",
            'category' => "jewelery",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.6,
                'count' => 400
            ]
        ],
        [
            'id' => 6,
            'title' => "Solid Gold Petite Micropave ",
            'price' => 168,
            'description' => "Satisfaction Guaranteed. Return or exchange any order within 30 days...",
            'category' => "jewelery",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 3.9,
                'count' => 70
            ]
        ],
        [
            'id' => 7,
            'title' => "White Gold Plated Princess",
            'price' => 9.99,
            'description' => "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her...",
            'category' => "jewelery",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 3,
                'count' => 400
            ]
        ],
        [
            'id' => 8,
            'title' => "Pierced Owl Rose Gold Plated Stainless Steel Double",
            'price' => 10.99,
            'description' => "Rose Gold Plated Double Flared Tunnel Plug Earrings...",
            'category' => "jewelery",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 1.9,
                'count' => 100
            ]
        ],
        [
            'id' => 9,
            'title' => "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
            'price' => 64,
            'description' => "USB 3.0 and USB 2.0 Compatibility Fast data transfers...",
            'category' => "electronics",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 3.3,
                'count' => 203
            ]
        ],
        [
            'id' => 10,
            'title' => "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
            'price' => 109,
            'description' => "Easy upgrade for faster boot up, shutdown, application load and response...",
            'category' => "electronics",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 2.9,
                'count' => 470
            ]
        ],
        [
            'id' => 11,
            'title' => "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
            'price' => 109,
            'description' => "3D NAND flash are applied to deliver high transfer speeds...",
            'category' => "electronics",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.8,
                'count' => 319
            ]
        ],
        [
            'id' => 12,
            'title' => "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
            'price' => 114,
            'description' => "Expand your PS4 gaming experience...",
            'category' => "electronics",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.8,
                'count' => 400
            ]
        ],
        [
            'id' => 13,
            'title' => "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
            'price' => 599,
            'description' => "21.5 inches Full HD (1920 x 1080) widescreen IPS display...",
            'category' => "electronics",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 2.9,
                'count' => 250
            ]
        ],
        [
            'id' => 14,
            'title' => "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED",
            'price' => 999.99,
            'description' => "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR...",
            'category' => "electronics",
           'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 2.2,
                'count' => 140
            ]
        ],
        [
            'id' => 15,
            'title' => "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
            'price' => 56.99,
            'description' => "Note:The Jackets is US standard size, Please choose size as your usual wear...",
            'category' => "women's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 2.6,
                'count' => 235
            ]
        ],
        [
            'id' => 16,
            'title' => "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
            'price' => 29.95,
            'description' => "100% POLYURETHANE(shell) 100% POLYESTER(lining)...",
            'category' => "women's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 2.9,
                'count' => 340
            ]
        ],
        [
            'id' => 17,
            'title' => "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
            'price' => 39.99,
            'description' => "Lightweight perfet for trip or casual wear...",
            'category' => "women's clothing",
           'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 3.8,
                'count' => 679
            ]
        ],
        [
            'id' => 18,
            'title' => "MBJ Women's Solid Short Sleeve Boat Neck V ",
            'price' => 9.85,
            'description' => "95% RAYON 5% SPANDEX, Made in USA or Imported...",
            'category' => "women's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.7,
                'count' => 130
            ]
        ],
        [
            'id' => 19,
            'title' => "Opna Women's Short Sleeve Moisture",
            'price' => 7.95,
            'description' => "100% Polyester, Machine wash, 100% cationic polyester interlock...",
            'category' => "women's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 4.5,
                'count' => 146
            ]
        ],
        [
            'id' => 20,
            'title' => "DANVOUY Womens T Shirt Casual Cotton Short",
            'price' => 12.99,
            'description' => "95%Cotton,5%Spandex, Features: Casual, Short Sleeve...",
            'category' => "women's clothing",
            'image' => "https://cdn.24h.com.vn/upload/2-2025/images/2025-04-24/1745488414-d64cd83a4f78fd26a469-8886-width640height427.jpg",
            'rating' => [
                'rate' => 3.6,
                'count' => 145
            ]
        ]
    ];
    $dataPageHot = array_slice($dataPageHot, ($page - 1) * $limit, $limit);
    return json_encode($dataPageHot);
}
?>
