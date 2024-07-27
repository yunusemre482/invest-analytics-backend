import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { validateData } from "../middlewares/validation.middleware";
import { paginateAndFilterSchema } from "../validations/pagination-and-filter.validation";
import { createUserSchema, updateUserSchema } from "../validations/user.validation";



const router = Router();
const controller = new UserController();


router.get("/", validateData(paginateAndFilterSchema), controller.findAll);
router.post("/", validateData(createUserSchema), controller.create);
router.get("/:id", controller.findOne);
router.put("/:id", validateData(updateUserSchema), controller.update);
router.patch("/:id", validateData(updateUserSchema), controller.updatePartial);
router.delete("/:id", controller.delete);

// book based operations
router.post("/:id/borrow/:bookId", controller.borrowBook);
router.post("/:id/return/:bookId", controller.returnBook);


export default router;
