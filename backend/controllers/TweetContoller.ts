import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { UserModelInterface } from '../models/UserModel';
import { validationResult } from 'express-validator';
import { TweetModel } from '../models/TweetModel';
import { isValidObjectId } from '../utils/isValidObjectId';

class TweetControlllers {
    async index(req: express.Request, res: express.Response): Promise<void> {
        try {
            const users = await TweetModel.find({})
                .populate('user', 'userName fullName avatarUrl')

                .exec();
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
            const tweetId = req.params.id;

            if (!isValidObjectId(tweetId)) {
                res.status(400).json({
                    status: 'error',
                    messages: '400',
                });
                return;
            }
            const tweet = await TweetModel.findById(tweetId)
                .populate('user', 'userName fullName avatarUrl')
                .exec();

            if (!tweet) {
                res.status(404).json({
                    status: 'error',
                    messages: '404',
                });
                return;
            }

            res.json({
                status: 'success',
                data: tweet,
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
            const user = req.user as UserModelInterface;

            if (user) {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    res.status(400).json({
                        status: 'error',
                        errors: errors.array(),
                    });
                    return;
                }

                const data = {
                    text: req.body.text,
                    images: req.body.images,
                    user: user._id,
                };

                const tweet = await TweetModel.create(data);

                res.json({
                    status: 'success',
                    data: await tweet.populate('user'),
                });
            }
        } catch (err) {
            res.json({
                status: 'error  ',
                messages: err,
            });
        }
    }
    async delete(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user as UserModelInterface;
        console.log(user, 'asd');
        try {
            if (user) {
                const tweetId = req.params.id;
                console.log(tweetId);

                if (!isValidObjectId(tweetId)) {
                    res.status(400).send();
                    return;
                }

                const tweet = await TweetModel.findById(tweetId);

                if (tweet) {
                    if (String(tweet.user) === String(user._id)) {
                        await tweet.deleteOne();
                        res.status(200).json({
                            status: 'success',
                        });
                    } else {
                        res.status(404).send();
                    }
                } else {
                    res.status(404).send();
                }
            }
        } catch (err) {
            res.status(500).json({
                status: 'error  ',
                messages: err,
            });
        }
    }
    async update(req: express.Request, res: express.Response): Promise<void> {
        const user = req.user as UserModelInterface;
        try {
            if (user) {
                const tweetId = req.params.id;

                if (!isValidObjectId(tweetId)) {
                    res.status(400).send();
                    return;
                }

                const tweet = await TweetModel.findById(tweetId);

                if (tweet) {
                    if (String(tweet.user) === String(user._id)) {
                        const text = req.body.text;
                        tweet.text = text;
                        tweet.save();
                        res.send();
                    } else {
                        res.status(404).send();
                    }
                } else {
                    res.status(404).send();
                }
            }
        } catch (err) {
            res.status(500).json({
                status: 'error  ',
                messages: err,
            });
        }
    }
}

export const TweetControlller = new TweetControlllers();
