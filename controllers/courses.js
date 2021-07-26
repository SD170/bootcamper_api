const errorResponse = require("../utils/errorResponse");
const Course = require("../models/Course");
const asyncHandler = require("../middleware/async");

//  @desc       get all courses
//  @route      GET /api/v1/courses
//  @route      GET /api/v1/bootcamps/:bootcampId/courses
//  @access     Public
exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  //check if there's a bootcampId
  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate("bootcamp", "name description averageCost");
  }
  const courses = await query;

  res.status(200).json({
    success: true,
    count: courses.length,
    data: courses,
  });
});
