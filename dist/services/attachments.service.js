"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAttachment = exports.getAttachmentById = exports.getAllAttachments = exports.updateAttachment = exports.createAttachment = void 0;
const attachments_1 = __importDefault(require("../models/attachments"));
const createAttachment = (attachmentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newAttachment = yield attachments_1.default.create(attachmentData);
        return newAttachment;
    }
    catch (error) {
        throw error;
    }
});
exports.createAttachment = createAttachment;
const updateAttachment = (attachmentId, attachmentData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedAttachment = yield attachments_1.default.findByPk(attachmentId);
        return updatedAttachment;
    }
    catch (error) {
        throw error;
    }
});
exports.updateAttachment = updateAttachment;
const getAllAttachments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attachments = yield attachments_1.default.findAll();
        return attachments;
    }
    catch (error) {
        throw error;
    }
});
exports.getAllAttachments = getAllAttachments;
const getAttachmentById = (attachmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attachment = yield attachments_1.default.findByPk(attachmentId);
        return attachment;
    }
    catch (error) {
        throw error;
    }
});
exports.getAttachmentById = getAttachmentById;
const deleteAttachment = (attachmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rowsDeleted = yield attachments_1.default.destroy({
            where: {
                id: attachmentId,
            },
        });
        if (rowsDeleted === 0) {
            throw new Error('Attachment not found or no deletions were made.');
        }
    }
    catch (error) {
        throw error;
    }
});
exports.deleteAttachment = deleteAttachment;
