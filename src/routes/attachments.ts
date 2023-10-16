import { Router } from 'express';
import { attachmentValidationRules } from '../validations/attachments.validation';
import * as attachmentController from '../controllers/attachments.controller';

const router = Router();

router.post('/', attachmentValidationRules, attachmentController.createAttachment);
router.get('/getall', attachmentController.getAllAttachments);
router.get('/:id', attachmentController.getAttachmentById);
router.put('/:id', attachmentValidationRules, attachmentController.updateAttachment);
router.delete('/:id', attachmentController.deleteAttachment);

export default router;
