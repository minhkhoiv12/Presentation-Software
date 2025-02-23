const designController = require("../controllers/designController");
const router = require("express").Router();
const auth = require("../middlewares/middleware");

router.post("/create-user-design", auth, designController.create_user_design);
router.get("/user-design/:design_id", auth, designController.get_user_design);
router.put(
  "/update-user-design/:design_id",
  auth,
  designController.update_user_design
);

router.post("/add-user-image", auth, designController.add_user_image);
router.get("/get-user-image", auth, designController.get_user_image);

router.get("/background-images", auth, designController.get_background_image);
router.get("/design-images", auth, designController.get_design_image);

module.exports = router;
