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
exports.SemesterRegistrationService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const academicSemester_model_1 = require("../academicSemester/academicSemester.model");
const SemesterRegistration_model_1 = require("./SemesterRegistration.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const semesterRegistration_constant_1 = require("./semesterRegistration.constant");
const createSemesterRegistrationIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const academicSemester = payload === null || payload === void 0 ? void 0 : payload.academicSemester;
    // check if there any registered semester that is already 'UPCOMING' | 'ONGOING'
    const isThereAnyUpcomingOrOngoingSemester = yield SemesterRegistration_model_1.SemesterRegistration.findOne({
        $or: [
            { status: semesterRegistration_constant_1.RegistrationStatus.UPCOMING },
            { status: semesterRegistration_constant_1.RegistrationStatus.ONGOING },
        ],
    });
    if (isThereAnyUpcomingOrOngoingSemester) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `There is already an ${isThereAnyUpcomingOrOngoingSemester.status} register semester!`);
    }
    // check if the semester is exists
    const isAcademicSemesterExists = yield academicSemester_model_1.AcademicSemester.findById(academicSemester);
    if (!isAcademicSemesterExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This academic semester not found!');
    }
    // check if the semester is already registered!
    const isSemesterRegistrationExists = yield SemesterRegistration_model_1.SemesterRegistration.findOne({
        academicSemester,
    });
    if (isSemesterRegistrationExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'This semester is already registered!');
    }
    const result = yield SemesterRegistration_model_1.SemesterRegistration.create(payload);
    return result;
});
const getAllSemesterRegistrationIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const semesterRegistrationQuery = new QueryBuilder_1.default(SemesterRegistration_model_1.SemesterRegistration.find().populate('academicSemester'), query)
        .filter()
        .sort()
        .paginate()
        .fields();
    const result = yield semesterRegistrationQuery.modelQuery;
    const total = yield SemesterRegistration_model_1.SemesterRegistration.countDocuments();
    return {
        total,
        result,
    };
});
const getSingleSemesterRegistrationIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield SemesterRegistration_model_1.SemesterRegistration.findById(id);
    return result;
});
const updateSemesterRegistrationIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // check if the requested registration semester is exists
    // check if the semester is already registration
    const isSemesterRegistrationExists = yield SemesterRegistration_model_1.SemesterRegistration.findById(id);
    if (!isSemesterRegistrationExists) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'This semster is not found!');
    }
    // if the requested semester registration is ended , we will not update anything
    const currentSemesterStatus = isSemesterRegistrationExists === null || isSemesterRegistrationExists === void 0 ? void 0 : isSemesterRegistrationExists.status;
    const requestedStatus = payload.status;
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `This semester is already ${currentSemesterStatus}`);
    }
    // upcoming => ongoing=> ended
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING &&
        requestedStatus === semesterRegistration_constant_1.RegistrationStatus.ENDED) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    if (currentSemesterStatus === semesterRegistration_constant_1.RegistrationStatus.ONGOING &&
        requestedStatus === semesterRegistration_constant_1.RegistrationStatus.UPCOMING) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, `You can not directly change status from ${currentSemesterStatus} to ${requestedStatus}`);
    }
    const result = yield SemesterRegistration_model_1.SemesterRegistration.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
exports.SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationIntoDB,
    getSingleSemesterRegistrationIntoDB,
    updateSemesterRegistrationIntoDB,
};
