const Category = require("../Model/categoryModel");
const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const mongoose = require("mongoose");
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Category.create(req.body);
  res.status(201).json({
    status: "Success",
    data: {
      category,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.params.id);
  const updateCategory = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateCategory) {
    return next(new AppError("Khong ton tai Id danh muc de update", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      updateCategory,
    },
  });
});

exports.deleteCategory = catchAsync(async (req, res, next) => {
  const deleteCategory = await Category.findByIdAndDelete(req.params.id);
  if (!deleteCategory) {
    return next(
      new AppError("Khong ton tai Id danh muc de thuc hien xoa", 404)
    );
  }
  res.status(200).json({
    status: "Success",
    data: null,
  });
});

exports.getParentCategory = catchAsync(async (req, res, next) => {
  const getParentCategory = await Category.find({ parent: null });
  res.status(200).json({
    status: "Success",
    data: {
      getParentCategory,
    },
  });
});

exports.getChildCategory = catchAsync(async (req, res, next) => {
  const getChildCategory = await Category.find({ parent: { $ne: null } });
  res.status(200).json({
    status: "Success",
    data: {
      getChildCategory,
    },
  });
});

exports.getOneCategory = catchAsync(async (req, res, next) => {
  const getOneCategory = await Category.find({
    parent: new mongoose.Types.ObjectId(req.params.id),
  });

  if (!getOneCategory) {
    return next(new AppError("Khong ton tai Id danh muc de thuc hien", 404));
  }

  res.status(200).json({
    status: "Success",
    data: {
      getOneCategory,
    },
  });
});