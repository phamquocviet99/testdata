const express = require("express");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Để parse JSON body
app.use(cookieParser()); // Để parse cookies
app.use(
  cors({
    origin: true, // Cho phép truy cập từ tất cả các domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Kích hoạt credentials
  })
);

// Route cho /login
app.post("/login", (req, res) => {
  const csrfToken = Math.floor(Math.random() * 100) + 1;

  res.cookie("XSRF-TOKEN", csrfToken.toString(), {
    httpOnly: false,
    secure: true,
    sameSite: "none",
  });

  // Thiết lập cookie frtoken
  const frToken = "your-fr-token-value"; // Thay thế bằng giá trị thực tế của token
  res.cookie("frtoken", frToken, {
    httpOnly: true, // Đặt httpOnly để không thể truy cập từ JS
    secure: false, // Đặt true nếu bạn sử dụng HTTPS
    sameSite: "None", // Hoặc 'Lax' tùy thuộc vào yêu cầu của bạn
  });

  res.status(200).send("Login successful");
});

// Route cho /check
app.post("/check", (req, res) => {
  const xsrfToken = req.headers["x-xsrf-token"]; // Lấy token từ header

  // Kiểm tra token
  if (xsrfToken) {
    // Ở đây bạn có thể so sánh xsrfToken với giá trị trong cookie (nếu cần)
    // Trong ví dụ này, chỉ cần trả về 200 nếu token được gửi
    res.sendStatus(200);
  } else {
    res.sendStatus(403); // Forbidden nếu không có token
  }
});

// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
