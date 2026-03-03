chess-backend/
│
├── src/
│   ├── config/
│   │   ├── database.js         # Kết nối MySQL + Sequelize
│   │   └── sequelize.js        # Config cho Sequelize CLI
│   │
│   ├── controllers/
│   │   ├── auth.controller.js      # Xử lý register, login, logout, refresh token
│   │   ├── user.controller.js      # Xử lý profile, online users
│   │   ├── game.controller.js      # Xử lý lịch sử ván đấu, active games
│   │   └── leaderboard.controller.js # Xử lý bảng xếp hạng
│   │
│   ├── middleware/
│   │   └── authenticate.js     # Xác thực JWT access token
│   │
│   ├── migrations/
│   │   ├── xxxx-create-users.js    # Tạo bảng Users
│   │   └── xxxx-create-games.js    # Tạo bảng Games
│   │
│   ├── models/
│   │   ├── User.js             # Model User — Sequelize
│   │   └── Game.js             # Model Game — Sequelize
│   │
│   ├── routes/
│   │   ├── auth.routes.js          # POST /api/auth/...
│   │   ├── user.routes.js          # GET/PUT /api/users/...
│   │   ├── game.routes.js          # GET /api/games/...
│   │   └── leaderboard.routes.js   # GET /api/leaderboard
│   │
│   ├── seeders/
│   │   ├── xxxx-demo-users.js      # Data mẫu Users
│   │   └── xxxx-demo-games.js      # Data mẫu Games
│   │
│   ├── services/
│   │   ├── game.service.js         # Logic chess — ELO, nước đi, kết thúc ván
│   │   └── matchmaking.service.js  # Logic tìm trận online (Phase 2)
│   │
│   ├── socket/
│   │   └── index.js            # Socket.io events (Phase 2)
│   │
│   ├── utils/
│   │   └── logger.js           # Winston logger
│   │
│   ├── app.js                  # Express setup — middleware, routes, error handler
│   └── server.js               # Entry point — khởi động server
│
├── tests/
│   ├── setup.js                # Cấu hình Jest — load .env.test
│   ├── auth.test.js            # Test auth API
│   ├── user.test.js            # Test user API
│   └── game.test.js            # Test game API
│
├── .env.development            # Biến môi trường dev (không commit)
├── .env.test                   # Biến môi trường test (không commit)
├── .env.production             # Biến môi trường production (không commit)
│
├── .eslintrc.cjs               # Quy tắc ESLint
├── .sequelizerc                # Config đường dẫn Sequelize CLI
├── .gitignore                  # Bỏ qua node_modules, .env, logs
│
├── jest.config.js              # Cấu hình Jest
├── package.json                # Dependencies + scripts
└── README.md                   # Hướng dẫn project