const checkAdmin = (req, res, next) => {
    const userRole = req.user.role;  // Giả định rằng  đã giải mã JWT để lấy thông tin người dùng
    if (userRole === 'admin') {
      next();  // Tiếp tục nếu là admin
    } else {
      res.status(403).json({ message: 'Bạn không có quyền truy cập.' });  // Ngăn truy cập nếu không phải admin
    }
  };
  
  // Sử dụng middleware này trên route
  router.get('/users', checkAdmin, userController.getAllUsers);
  