const { formidable } = require("formidable");
const cloudinary = require("../config/cloudinary"); // Import cấu hình Cloudinary
const designModel = require("../models/designModel");
const userImageModel = require("../models/userImageModel");
const designImageModel = require("../models/designImageModel");
const backgroundImageModel = require("../models/backgroundImageModel");
const templateModel = require("../models/templateModel");
const {
  mongo: { ObjectId },
} = require("mongoose");

class DesignController {
  async create_user_design(req, res) {
    const form = formidable({});
    const { _id } = req.userInfo;
    try {
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const { image } = files;
      const { secure_url, public_id } = await cloudinary.uploader.upload(
        image[0].filepath,
        { secure: true }
      );

      const design = await designModel.create({
        user_id: _id,
        components: [JSON.parse(fields.design[0])],
        image_url: secure_url,
        public_id,
      });

      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async get_user_design(req, res) {
    const { design_id } = req.params;
    try {
      const design = await designModel.findById(design_id);
      return res.status(200).json({ design: design.components });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async update_user_design(req, res) {
    const form = formidable({});
    const { design_id } = req.params;
    try {
      const [fields, files] = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
          if (err) reject(err);
          else resolve([fields, files]);
        });
      });

      const { image } = files;
      const components = JSON.parse(fields.design[0]).design;
      const old_design = await designModel.findById(design_id);

      if (!old_design) {
        return res.status(404).json({ message: "Không tìm thấy bản thiết kế" });
      }

      if (old_design.public_id) {
        await cloudinary.uploader.destroy(old_design.public_id);
      }

      const { secure_url, public_id } = await cloudinary.uploader.upload(
        image[0].filepath,
        { secure: true }
      );

      await designModel.findByIdAndUpdate(design_id, {
        image_url: secure_url,
        public_id,
        components,
      });

      return res.status(200).json({ message: "Lưu thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async get_user_designs(req, res) {
    const { _id } = req.userInfo;
    try {
      const designs = await designModel
        .find({ user_id: new ObjectId(_id) })
        .sort({ createdAt: -1 });
      return res.status(200).json({ designs });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async delete_user_image(req, res) {
    const { design_id } = req.params;
    try {
      const design = await designModel.findById(design_id);
      if (!design) {
        return res.status(404).json({ message: "Không tìm thấy bản thiết kế" });
      }

      if (design.public_id) {
        await cloudinary.uploader.destroy(design.public_id);
      }

      await designModel.findByIdAndDelete(design_id);
      return res.status(200).json({ message: "Xoá bản thiết kế thành công" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new DesignController();
