```md
# 🛒 Product Management System

A simple **Product Management System** developed using **Node.js**, **Express**, **MySQL**, and **EJS** as part of the **Node.js Developer Coding Assignment**.

This project demonstrates backend development, database handling, session-based authentication, and basic frontend integration using server-side rendering.

---

## 📌 Features

### 🔐 Authentication

- Login using email and password
- Session-based authentication
- Flash messages for success and error handling

### 📦 Product Management

- Add new products
- Edit existing products
- Delete products
- Prevent duplicate product names
- Stock quantity management

### 📊 Dashboard & Reports

- Total number of products
- Total inventory value
- Out-of-stock products count

### 🎨 UI

- Clean HTML & CSS interface
- EJS templating
- Toast notifications for actions
- Dynamic updates using Fetch API (AJAX)

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MySQL**
- **EJS**
- **HTML / CSS / JavaScript**
- **express-session**
- **connect-flash**
- **mysql2**
- **dotenv**
- **zod**
- **nodemon**

---

## 📂 Project Structure
```

product-management/
│
├── config/
│ ├── db.js
│ └── env.js
│
├── controllers/
│ ├── auth.controller.js
│ └── product.controller.js
│
├── middleware/
│ └── auth.middleware.js
│
├── routes/
│ ├── auth.routes.js
│ └── product.routes.js
│
├── views/
│ ├── auth/
│ ├── product/
│ └── partials/
│
├── public/
│ ├── css/
│ ├── js/
│ └── images/
│
├── database.sql
├── server.js
├── package.json
└── README.md

````

---

## ⚙️ Installation & Setup

### 1️⃣ Install Dependencies

```bash
npm install
````

---

### 2️⃣ Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=your_mysql_password
DATABASE_NAME=product_management
```

---

### 3️⃣ Database Setup

Import the provided SQL file into MySQL.

Using **MySQL CLI** or **MySQL Workbench**:

```sql
SOURCE database.sql;
```

This will:

- Create the database
- Create required tables
- Insert sample data and a default admin user

---

### 4️⃣ Run the Application

```bash
node server.js
```

OR (using nodemon):

```bash
npx nodemon server.js
```

---

## 🔐 Login Credentials

Use the default admin account:

- **Email:** [admin@gmail.com](mailto:admin@gmail.com)
- **Password:** admin@123

---

## 🌐 Application URL

```
http://localhost:3000
```

You will be redirected to the login page.

---

## 📊 Dashboard Metrics Explained

- **Total Products**
  Count of all products in the database

- **Total Inventory Value**
  Sum of `(price × quantity)`

- **Out of Stock Products**
  Products with quantity = `0`

---

## 📝 Notes

- Product names are treated as **unique**
- Editing a product updates stock and price correctly
- Deleting products uses **Fetch API (AJAX)**
- Images are optional and displayed using placeholders
- Application runs completely on a **local environment**
- No third-party cloud services used

---

## 📦 Submission Includes

- Complete source code
- `database.sql` file
- `README.md` file

### ❌ Excluded

- `node_modules`
- `.env` file

---

## 👤 Author

**Kiran Dinesh**
_Node.js Developer Candidate_

```

---

If you want, I can also:
- Add **screenshots section**
- Improve it for **GitHub portfolio**
- Rewrite it for **company submission / assignment PDF**
- Add **API documentation** section

Just say the word 🚀
```
