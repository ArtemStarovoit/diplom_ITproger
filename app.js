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
const express_1 = __importDefault(require("express"));
const mongoose_1 = require("mongoose");
const config_1 = require("./config");
const articles_items_1 = require("./models/articles-items");
const comments_1 = require("./models/comments");
const cors = require('cors');
const bodyParser = require('body-parser');
const app = (0, express_1.default)();
(0, mongoose_1.connect)(config_1.MONGO, (err) => {
    if (err)
        throw err;
    console.log('Мы подключились');
});
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/api/articles-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItems = yield articles_items_1.Items.find().sort({ id: 1 });
        if (!getItems)
            throw new Error('Не найдены статьи');
        res.status(200).send(getItems);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get('/api/articles-items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getItem = yield articles_items_1.Items.findOne({ id: req.params.id });
        const getComments = yield comments_1.Comments.find({ id: req.params.id });
        if (!getItem || !getComments)
            throw new Error('Не найдена статья');
        res.status(200).send(getItem).send(getComments);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.get('/api/articles-items/comments/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getComments = yield comments_1.Comments.find({ id: req.params.id });
        if (!getComments)
            throw new Error('К данной статье коментариев не найдено');
        res.status(200).send(getComments);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.post('/api/articles-items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield comments_1.Comments.insertMany(req.body);
        if (!result)
            throw new Error('Коментарий не добавлен');
        res.status(200).send(result);
    }
    catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}));
app.listen(config_1.PORT, () => {
    console.log('Сервер запущен');
});
