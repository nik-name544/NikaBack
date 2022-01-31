import { Router } from "express";
import registrationController from "./registration/controller.js";
const router = new Router();

router.post("/registration", registrationController.addUser);
router.get("/", registrationController.getUsers);
router.get("/delete-from-calendar", registrationController.deleteFromCalendar);
router.get("/get-all-from-calendar", registrationController.getAllFromCalendar);
router.delete("/", registrationController.delUser);

export default router;
