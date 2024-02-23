import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModel, UserModelDocumentInterface } from '../models/UserModel';
import { validationResult } from 'express-validator';
import { generateMD5 } from '../utils/generateHash';
import { sendEmail } from '../utils/sendMailer';
import { isValidObjectId } from '../utils/isValidObjectId';

class UserControlllers {
    async index(req: express.Request, res: express.Response): Promise<void> {
        try {
            const users = await UserModel.find({}).exec();
            res.json({
                status: 'success',
                data: users,
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                messages: JSON.stringify(err),
            });
        }
    }
    async show(req: express.Request, res: express.Response): Promise<void> {
        try {
            const userId = req.params.id;

            if (!isValidObjectId(userId)) {
                res.status(400).json({
                    status: 'error',
                    messages: '400',
                });
                return;
            }
            const user = await UserModel.findOne({ _id: userId }).exec();

            if (!user) {
                res.status(404).json({
                    status: 'error',
                    messages: '404',
                });
                return;
            }

            res.json({
                status: 'success',
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                messages: JSON.stringify(err),
            });
        }
    }
    async create(req: express.Request, res: express.Response): Promise<void> {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    status: 'error',
                    errors: errors.array(),
                });
                return;
            }
            const data = {
                email: req.body.email,
                userName: req.body.userName,
                fullName: req.body.fullName,
                password: generateMD5(
                    req.body.password + process.env.SECRET_KEY
                ),
                confirmedHash: generateMD5(
                    process.env.SECRET_KEY || Math.random().toString()
                ),
            };

            const user = await UserModel.create(data);

            sendEmail(
                {
                    emailFrom: 'admin@twitter.com',
                    emailTo: data.email,
                    subject: 'Подверждение почты Twitter',
                    html: `Для того чтобы подвердит зайти на сайт <a href="http:localhost:${
                        process.env.PORT || 8888
                    }/auth/verify?hash=${
                        data.confirmedHash
                    }">По этой ссылке</a>`,
                },
                (err: Error | null) => {
                    if (err) {
                        res.json({
                            status: 'error 123',
                            messages: JSON.stringify(err),
                        });
                    } else {
                        res.status(201).json({
                            status: 'success',
                            data: user,
                        });
                    }
                }
            );
        } catch (err) {
            res.json({
                status: 'error  ',
                messages: err,
            });
        }
    }
    async verify(req: express.Request, res: express.Response): Promise<void> {
        try {
            const hash = req.query.hash;

            if (!hash) {
                res.status(400).send();
                return;
            }

            const user = await UserModel.findOne({
                confirmedHash: hash,
            }).exec();

            if (user) {
                user.confirmed = true;
                await user.save();

                res.json({
                    status: 'success',
                    data: user.toJSON(),
                });
            } else {
                res.status(404).send({
                    status: 'error',
                    messages: 'Пользователь не найден',
                });
            }
        } catch (err) {
            res.status(500).json({
                status: 'error',
                messages: JSON.stringify(err),
            });
        }
    }
    async afterLogin(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const user = req.user
                ? (req.user as UserModelDocumentInterface).toJSON()
                : undefined;
            if (!user) {
                res.status(400).json({
                    status: 'error',
                    messages: JSON.stringify('400'),
                });
                return;
            }

            res.json({
                status: 'success',
                data: {
                    ...user,
                    token: jwt.sign(
                        { data: req.user },
                        process.env.SECRET_KEY || '123',
                        { expiresIn: '30 days' }
                    ),
                },
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                messages: JSON.stringify(err),
            });
        }
    }
    async getUserInfo(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const user = req.user
                ? (req.user as UserModelDocumentInterface).toJSON()
                : undefined;
            res.json({
                status: 'success',
                data: user,
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                messages: JSON.stringify(err),
            });
        }
    }
}

export const UserControlller = new UserControlllers();
