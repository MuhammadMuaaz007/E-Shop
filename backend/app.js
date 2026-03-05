const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
<<<<<<< HEAD
=======

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:3000",
      "http://localhost:8000",
      // Add your frontend production domain here
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
  }),
);
app.use("/", express.static("uploads")); // serves at root
app.use("/uploads", express.static("uploads")); // serves at /uploads
app.use(bodyParser.urlencoded({ extended: true }));
>>>>>>> 5a3e86e (Resolved merge conflicts)
const path = require("path");

const ErrorHandler = require("./middleware/error");
app.use((req, res, next) => {
  res.setHeader("X-BACKEND-HIT", "YES");
  console.log("BACKEND HIT:", req.method, req.url);
  next();
});
// --------------------
// ENV CONFIG
// --------------------
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: path.join(__dirname, "config", ".env"),
  });
}

// --------------------

app.use((req, res, next) => {
  const allowedOrigins = [
    "http://localhost:3000",
    "https://muaaz-mart.vercel.app",
    "https://e-shop-umber-seven.vercel.app/",
  ];

  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

// handle preflight explicitly
app.options("*", cors());

// --------------------
// BASIC MIDDLEWARE
// --------------------
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// --------------------
// COOP / COEP (ONLY for Firebase popup issues)
// --------------------
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "unsafe-none");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// --------------------
// STATIC FILES
// --------------------
app.use("/uploads", express.static("uploads"));

// --------------------
// ROUTES
// --------------------
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/couponCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
<<<<<<< HEAD
app.use("/api/v2/payment", payment);
app.use("/api/v2/order", order);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);

// --------------------
// ERROR HANDLER (ALWAYS LAST)
// --------------------
=======

>>>>>>> 5a3e86e (Resolved merge conflicts)
app.use(ErrorHandler);

module.exports = app;
