const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3000;
const JWT_SECRET = 'your-secret-key-here'; // 在生产环境中应该使用环境变量

// 数据库设置
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');

  // 创建用户表
  db.run(\, (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Users table created or already exists');
  });
});

app.use(cors());
app.use(express.json());

// 中间件：验证JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// 注册API
app.post('/api/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 验证输入
    if (\!username || \!email || \!password) {
      return res.status(400).json({ message: '所有字段都是必填的' });
    }

    // 检查用户是否已存在
    db.get('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], async (err, user) => {
      if (err) {
        return res.status(500).json({ message: '数据库错误' });
      }

      if (user) {
        return res.status(400).json({ message: '用户名或邮箱已存在' });
      }

      // 哈希密码
      const hashedPassword = await bcrypt.hash(password, 10);

      // 创建用户
      db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        [username, email, hashedPassword],
        function(err) {
          if (err) {
            return res.status(500).json({ message: '注册失败' });
          }
          res.status(201).json({ message: '注册成功' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
});

// 登录API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  if (\!username || \!password) {
    return res.status(400).json({ message: '用户名和密码都是必填的' });
  }

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if (err) {
      return res.status(500).json({ message: '数据库错误' });
    }

    if (\!user) {
      return res.status(400).json({ message: '无效的用户名或密码' });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (\!validPassword) {
      return res.status(400).json({ message: '无效的用户名或密码' });
    }

    // 创建JWT令牌
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '24h' });

    res.json({
      message: '登录成功',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      }
    });
  });
});

// 获取用户资料API
app.get('/api/user', authenticateToken, (req, res) => {
  db.get('SELECT id, username, email, created_at FROM users WHERE id = ?', [req.user.id], (err, user) => {
    if (err) {
      return res.status(500).json({ message: '数据库错误' });
    }
    res.json(user);
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(\);
});
