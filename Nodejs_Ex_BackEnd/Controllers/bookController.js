const Book = require('../Models/BookModel');


exports.getAllBook = async (req, res) => {
  try {
    const books = await Book.find({});

    // Chuyển đổi dữ liệu trước khi trả về
    const bookJson = books.map(book => {
      return {
        book_id: book.book_id,
        title: book.title,
        author: book.author,
        publicationDate: book.publicationDate,
        price: Math.floor(book.price), // Đảm bảo giá trị là int
        description: book.description,
        inStock: book.inStock,
        category: book.category,
        avatarUrl: book.avatarUrl
      };
    });

    res.status(200).json(bookJson); // Trả về dưới dạng JSON
  } catch (error) {
    res.status(500).json({ message: 'Có lỗi khi lấy sách' });
  }
};

// Hàm thêm sách mới với kiểm tra trùng lặp
exports.addBook = async (req, res) => {
    try {
      const { book_id, title, author, publicationDate, price, description, inStock, category, avatarUrl } = req.body;
  
      // Kiểm tra book_id đã tồn tại chưa
      const existingBook = await Book.findOne({ book_id });
  
      if (existingBook) {
        return res.status(400).json({ message: 'book_id đã tồn tại' });
      }
  
      // Tạo sách mới
      const newBook = new Book({ book_id, title, author, publicationDate, price, description, inStock, category, avatarUrl });
      
      // Lưu sách mới
      await newBook.save();
  
      res.status(201).json({ message: 'Sách đã được thêm', book: newBook });
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi khi thêm sách', error: error.message });
    }
};

// Hàm xóa sách theo book_id
exports.deleteBook = async (req, res) => {
    try {
      const { book_id } = req.params;
      
      // Xóa sách theo book_id
      const deletedBook = await Book.findOneAndDelete({ book_id });
  
      if (!deletedBook) {
        return res.status(404).json({ message: 'Không tìm thấy sách với book_id này' });
      }
  
      res.status(200).json({ message: 'Sách đã được xóa', book: deletedBook });
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi khi xóa sách', error: error.message });
    }
  };

// Hàm sửa thông tin sách theo book_id
exports.updateBook = async (req, res) => {
    try {
      const { book_id } = req.params;
      const updatedData = req.body;
  
      // Cập nhật thông tin sách theo book_id
       const updatedBook = await Book.findOneAndUpdate({ book_id }, updatedData, { new: true });
      //const updatedBook = await Book.findOneAndUpdate({ book_id: parseInt(book_id) }, updatedData, { new: true });

      if (!updatedBook) {
        return res.status(404).json({ message: 'Không tìm thấy sách với id này' });
      }
  
      res.status(200).json({ message: 'Sách đã được cập nhật', book: updatedBook });
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi khi cập nhật sách', error: error.message });
    }
  };
  // Tìm kiếm sách 
  exports.searchBookByTitle = async (req, res) => {
    try {
      const { title } = req.query;  // Nhận từ khóa tìm kiếm từ query parameter
  
      if (!title) {
        return res.status(400).json({ message: 'Vui lòng cung cấp từ khóa tìm kiếm' });
      }
  
      // Sử dụng regex để tìm kiếm sản phẩm theo tên
      const books = await Book.find({ title: { $regex: title, $options: 'i' } });
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào' });
      }
  
      res.status(200).json(books);  // Trả về danh sách các sản phẩm tìm thấy
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi xảy ra khi tìm kiếm sản phẩm' });
    }
  };
  // tìm kiếm sách theo category
  exports.searchBookByCategory = async (req, res) => {
    try {
      let { category } = req.query;  // Nhận category từ query parameter
  
      if (!category) {
        return res.status(400).json({ message: 'Vui lòng cung cấp category' });
      }
  
      // Loại bỏ khoảng trắng ở đầu và cuối
      category = category.trim();
  
      // Sử dụng regex để tìm kiếm không phân biệt chữ hoa chữ thường
      const books = await Book.find({ category: { $regex: category, $options: 'i' } });
  
      if (books.length === 0) {
        return res.status(404).json({ message: 'Không tìm thấy sản phẩm nào với category này' });
      }
  
      res.status(200).json(books);  // Trả về danh sách các sản phẩm tìm thấy
    } catch (error) {
      res.status(500).json({ message: 'Có lỗi xảy ra khi tìm kiếm sản phẩm theo category' });
    }
  };