import { Router } from "express";
import { paginateAndFilterSchema } from "../validations/pagination-and-filter.validation";
import { BookController } from "../controllers/book.controller";
import { validateData } from "../middlewares/validation.middleware";
import { createBookSchema, updateBookSchema } from "../validations/book.validation";


const router = Router();
const controller = new BookController();


router.get("/", validateData(paginateAndFilterSchema), controller.findAll)
router.post("/", validateData(createBookSchema), controller.create);
router.get("/:id", controller.findOne);
router.put("/:id", validateData(updateBookSchema), controller.update);
router.patch("/:id",validateData(updateBookSchema), controller.updatePartial);
router.delete("/:id", controller.delete);


export default router;
