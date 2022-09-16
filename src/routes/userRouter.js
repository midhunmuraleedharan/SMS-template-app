import express from 'express'; 
const router = express.Router();
import { signIn, signUp } from "../controller/userAuth";
import { requireSignIn } from "../middleware/middlewareAuth";
import {
  createTemplate,
  sendSmsById,
  getTemplateById,
  listTemplates,
} from "../controller/userLogic";
router.get("/", (req, res) => {
   res.render("home");
});
router.get("/signin", (req, res) => {
  res.render("login");
});
router.get("/signup", (req, res) => {
   res.render("submit");
});
router.get("/create-template", (req, res) => {
  res.render("create");
});

router.get("/autheticated", requireSignIn, (req, res) => {
    return res
      .status(200)
      .json({ status: "true", message: "You are authenticated" });
});

router.get("/list", (req, res) => {
  res.render("viewtemplate");
});
router.get("/send-sms/:id", (req, res) => {
  res.render("sms");
});

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post("/create-template", requireSignIn, createTemplate);
router.get("/get-template/:id", requireSignIn, getTemplateById);
router.post("/send-sms", requireSignIn, sendSmsById);
router.get("/list-template", requireSignIn, listTemplates);

export const userRouter = router;