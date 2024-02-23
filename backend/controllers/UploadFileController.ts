import express from 'express';
import multer from 'multer';
import cloudinary from '../core/cloudinary';

class UploadFileController {
    async upload(req: express.Request, res: express.Response): Promise<void> {
        try {
            const file = req.file;
            if (!file) {
                res.status(400).json({
                    status: 'error',
                    message: 'No file uploaded',
                });
                return;
            }

            cloudinary.uploader.upload(
                file.path,
                { resource_type: 'auto' },
                (error, result) => {
                    if (error || !result) {
                        return res.status(500).json({
                            status: 'error',
                            message: error || 'upload error',
                        });
                    }
                    res.json({
                        url: result.url,
                        size: Math.round(result.bytes / 1024),
                        height: result.height,
                        width: result.width,
                    }).status(201);
                }
            );
        } catch (err) {
            console.error('Error uploading file:', err);
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error',
            });
        }

        // cloudinary.uploader.upload(filePath, (error, result) => {
        //     if (error || !result) {
        //         return res.status(500).json({
        //             status: 'error',
        //             message: error || 'upload error',
        //         });
        //     }
        // });
    }
}

export const UploadFileCtrl = new UploadFileController();
