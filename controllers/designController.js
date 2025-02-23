const { formidable } = require("formidable");
const cloudinary = require("cloudinary").v2;
const designModel = require("../models/designModel");
const userImageModel = require("../models/userImageModel");
const designImageModel = require("../models/designImageModel");
const backgroundImageModel = require("../models/backgroundImageModel");
const templateModel = require("../models/templateModel");
const {
  mongo: { ObjectId },
} = require("mongoose");

class designController {
  // Method tạo bản thiết kế của người dùng
  create_user_design = async (req, res) => {
    const form = formidable({});
    const { _id } = req.userInfo;
    try {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
      });
      const [fields, files] = await form.parse(req);
      const { image } = files;

      // Upload ảnh lên Cloudinary và đảm bảo URL trả về sử dụng https
      const { url } = await cloudinary.uploader.upload(image[0].filepath, {
        secure: true,
      });
      const httpsUrl = url.replace("http://", "https://"); // Thay thế http:// thành https:// nếu cần

      const design = await designModel.create({
        user_id: _id,
        components: [JSON.parse(fields.design[0])],
        image_url: httpsUrl, // Lưu URL HTTPS vào cơ sở dữ liệu
      });

      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method lấy bản thiết kế của người dùng
  get_user_design = async (req, res) => {
    const { design_id } = req.params;
    try {
      const design = await designModel.findById(design_id);
      return res.status(200).json({ design: design.components });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method cập nhật bản thiết kế của người dùng
  update_user_design = async (req, res) => {
    const form = formidable({});
    const { design_id } = req.params;
    try {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
      });
      const [fields, files] = await form.parse(req);
      const { image } = files;
      const components = JSON.parse(fields.design[0]).design;

      const old_design = await designModel.findById(design_id);

      if (old_design) {
        // Xóa ảnh cũ khỏi Cloudinary nếu có
        if (old_design.image_url) {
          const splitImage = old_design.image_url.split("/");
          const imageFile = splitImage[splitImage.length - 1];
          const imageName = imageFile.split(".")[0];
          await cloudinary.uploader.destroy(imageName);
        }

        // Upload ảnh mới lên Cloudinary và đảm bảo sử dụng https
        const { url } = await cloudinary.uploader.upload(image[0].filepath, {
          secure: true,
        });
        const httpsUrl = url.replace("http://", "https://"); // Thay thế http:// thành https:// nếu cần

        await designModel.findByIdAndUpdate(design_id, {
          image_url: httpsUrl,
          components,
        });

        return res.status(200).json({ message: "Lưu thành công" });
      } else {
        return res.status(404).json({ message: "Không tìm thấy bản thiết kế" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method thêm ảnh của người dùng
  add_user_image = async (req, res) => {
    const { _id } = req.userInfo;
    const form = formidable({});

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
    });
    try {
      const [_, files] = await form.parse(req);
      const { image } = files;

      // Upload ảnh lên Cloudinary và đảm bảo URL trả về sử dụng https
      const { url } = await cloudinary.uploader.upload(image[0].filepath, {
        secure: true,
      });
      const httpsUrl = url.replace("http://", "https://"); // Thay thế http:// thành https:// nếu cần

      const userImage = await userImageModel.create({
        user_id: _id,
        image_url: httpsUrl, // Lưu URL HTTPS vào cơ sở dữ liệu
      });

      return res.status(201).json({ userImage });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method lấy ảnh của người dùng
  get_user_image = async (req, res) => {
    const { _id } = req.userInfo;
    try {
      const images = await userImageModel.find({ user_id: new ObjectId(_id) });
      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method lấy ảnh background
  get_background_image = async (req, res) => {
    try {
      const images = await backgroundImageModel.find({});
      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method lấy ảnh thiết kế
  get_design_image = async (req, res) => {
    try {
      const images = await designImageModel.find({});
      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method lấy tất cả các thiết kế của người dùng
  get_user_designs = async (req, res) => {
    const { _id } = req.userInfo;
    try {
      const designs = await designModel
        .find({ user_id: new ObjectId(_id) })
        .sort({ createdAt: -1 });
      return res.status(200).json({ designs });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method xóa thiết kế của người dùng
  delete_user_image = async (req, res) => {
    const { design_id } = req.params;
    try {
      await designModel.findByIdAndDelete(design_id);
      return res.status(200).json({ message: "Xoá bản thiết kế thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method lấy tất cả các template
  get_templates = async (req, res) => {
    try {
      const templates = await templateModel.find({}).sort({ createdAt: -1 });
      return res.status(200).json({ templates });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  // Method thêm template vào thiết kế của người dùng
  add_user_template = async (req, res) => {
    const { template_id } = req.params;
    const { _id } = req.userInfo;

    try {
      const template = await templateModel.findById(template_id);
      const design = await designModel.create({
        user_id: _id,
        components: template.components,
        image_url: template.image_url,
      });
      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
}

module.exports = new designController();
