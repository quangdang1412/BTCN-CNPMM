# 🛒 E-Commerce Platform - Full Stack NodeJS & ReactJS

## 👨‍🎓 Thông tin sinh viên
- **Họ và tên:** Nguyễn Đăng Quang
- **MSSV:** 22110211

---

## 📋 Mô tả dự án

Dự án xây dựng website thương mại điện tử hoàn chỉnh với đầy đủ các chức năng cơ bản và nâng cao, sử dụng công nghệ:
- **Backend:** Node.js + Express.js + MySQL + GraphQL
- **Frontend:** React.js + Vite + Ant Design
- **Database:** MySQL với Sequelize ORM
- **Cloud Storage:** Cloudinary

---

## ✨ Các chức năng chính

### 1. 🔐 Xác thực và phân quyền
- Đăng ký, đăng nhập người dùng
- Phân quyền Admin/User
- JWT Authentication

### 2. 📦 Quản lý sản phẩm
- CRUD sản phẩm (Admin)
- Tìm kiếm, lọc sản phẩm theo danh mục
- Upload ảnh sản phẩm lên Cloudinary
- Xem chi tiết sản phẩm

### 3. ⭐ Chức năng yêu thích
![Sản phẩm yêu thích](https://github.com/user-attachments/assets/5056eaa0-5017-46a4-a99f-a7d8882d33f8)


### 4. ⭐ Đánh giá sản phẩm
![Đánh giá sản phẩm](https://github.com/user-attachments/assets/36059eba-d618-4124-bc83-82b9184123d8)
- Viết đánh giá và cho điểm sao (1-5)
- Hiển thị danh sách đánh giá
- Tính điểm trung bình và tổng số đánh giá

### 5. 🔍 Sản phẩm tương tự
![Sản phẩm tương tự](https://github.com/user-attachments/assets/29cfeba3-56dd-4fa6-af01-c68071d0d49e)
- Hiển thị sản phẩm liên quan khi xem chi tiết

### 6. 📊 Thống kê sản phẩm
![Thống kê](https://github.com/user-attachments/assets/c26371a9-3bca-4f22-821c-21d93f50a953)
- Đếm số lượt xem sản phẩm
- Đếm số người đã mua
- Hiển thị số lượng đánh giá và yêu thích

### 7. 🛒 Giỏ hàng & Đặt hàng
- Thêm/xóa/cập nhật số lượng sản phẩm trong giỏ
- Chọn sản phẩm để thanh toán
- Đặt hàng với thông tin giao hàng
- Hỗ trợ cả REST API và GraphQL

### 8. 👤 Quản lý người dùng (Admin)
- Xem danh sách người dùng
- Khóa/mở khóa tài khoản
- Phân quyền Admin/User

---

## 🗂️ Cấu trúc dự án

```
FullStackNodeJS01/
├── ExpressJS01/          # Backend (Node.js + Express)
│   ├── src/
│   │   ├── config/       # Cấu hình database, cloudinary
│   │   ├── controllers/  # Controllers xử lý logic
│   │   ├── graphql/      # GraphQL schema & resolvers
│   │   ├── middlewares/  # Authentication & validation
│   │   ├── models/       # Sequelize models
│   │   ├── routes/       # REST API routes
│   │   └── services/     # Business logic
│   └── server.js
│
└── ReactJS01/            # Frontend (React + Vite)
    ├── src/
    │   ├── components/   # Reusable components
    │   ├── pages/        # Page components
    │   ├── util/         # API calls & helpers
    │   └── App.jsx
    └── package.json
```

---

## 🚀 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 16.x
- MySQL >= 8.0
- npm hoặc yarn

### Backend Setup

```bash
cd ExpressJS01
npm install

# Tạo file .env với nội dung:
PORT=8080
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ecommerce_db
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Chạy server
npm start
```

### Frontend Setup

```bash
cd ReactJS01
npm install

# Chạy development server
npm run dev
```

Server sẽ chạy tại:
- **Backend:** http://localhost:8080
- **Frontend:** http://localhost:5173

---

## 📡 API Documentation

### REST API Endpoints

#### Authentication
- `POST /v1/api/register` - Đăng ký
- `POST /v1/api/login` - Đăng nhập
- `POST /v1/api/logout` - Đăng xuất

#### Products
- `GET /v1/api/products` - Lấy danh sách sản phẩm
- `GET /v1/api/products/:id` - Chi tiết sản phẩm
- `POST /v1/api/products` - Tạo sản phẩm (Admin)
- `PUT /v1/api/products/:id` - Cập nhật sản phẩm (Admin)
- `DELETE /v1/api/products/:id` - Xóa sản phẩm (Admin)

#### Favorites
- `GET /v1/api/favorites` - Danh sách yêu thích
- `POST /v1/api/favorites/:productId` - Thêm yêu thích
- `DELETE /v1/api/favorites/:productId` - Xóa yêu thích

#### Reviews
- `GET /v1/api/products/:productId/reviews` - Danh sách đánh giá
- `POST /v1/api/products/:productId/reviews` - Tạo đánh giá
- `PUT /v1/api/reviews/:id` - Cập nhật đánh giá
- `DELETE /v1/api/reviews/:id` - Xóa đánh giá

### GraphQL Endpoints

**Endpoint:** `POST /graphql`

#### Queries
```graphql
query {
  cart { id, items { productId, quantity, price } }
}
```

#### Mutations
```graphql
mutation {
  addToCart(productId: 1, quantity: 2) { id }
  checkoutSelectedItems(
    shippingAddress: "123 Street"
    phoneNumber: "0123456789"
    notes: "Note"
  ) { id, totalAmount }
}
```

---

## 🛠️ Công nghệ sử dụng

### Backend
- **Framework:** Express.js
- **Database:** MySQL + Sequelize ORM
- **Authentication:** JWT (jsonwebtoken)
- **GraphQL:** Apollo Server Express
- **File Upload:** Multer + Cloudinary
- **Validation:** express-validator

### Frontend
- **Framework:** React 18 + Vite
- **UI Library:** Ant Design
- **HTTP Client:** Axios
- **Routing:** React Router DOM
- **State Management:** React Hooks
- **Toast Notifications:** React Toastify

---

## 📝 Database Schema

### Tables
- **Users:** Thông tin người dùng (id, email, password, role, isLocked)
- **Products:** Sản phẩm (id, name, description, price, category, image)
- **Reviews:** Đánh giá (id, userId, productId, rating, comment)
- **Favorites:** Yêu thích (id, userId, productId)
- **Carts:** Giỏ hàng (id, userId)
- **CartItems:** Chi tiết giỏ hàng (id, cartId, productId, quantity)
- **Orders:** Đơn hàng (id, userId, totalAmount, status, shippingAddress)
- **OrderItems:** Chi tiết đơn hàng (id, orderId, productId, quantity, price)
- **ProductViews:** Lượt xem (id, userId, productId)

---

## 🔒 Security Features

- JWT-based authentication
- Password hashing với bcrypt
- Input validation & sanitization
- Protected routes (middleware)
- CORS configuration
- SQL injection prevention (Sequelize ORM)

---
