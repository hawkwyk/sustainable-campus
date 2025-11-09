// Cloudinary图片上传模块
// 提供图片上传到Cloudinary的功能

class CloudinaryUploader {
    constructor(config) {
        this.config = config.cloudinary;
        this.maxFileSize = 10 * 1024 * 1024; // 10MB
        this.allowedFormats = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    }

    // 验证文件
    validateFile(file) {
        const errors = [];

        // 检查文件大小
        if (file.size > this.maxFileSize) {
            errors.push(`文件大小不能超过${this.maxFileSize / (1024 * 1024)}MB`);
        }

        // 检查文件格式
        if (!this.allowedFormats.includes(file.type)) {
            errors.push('只允许上传图片文件 (JPEG, PNG, WebP, GIF)');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // 压缩图片
    async compressImage(file, maxWidth = 1920, quality = 0.8) {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                // 计算压缩后的尺寸
                let { width, height } = img;
                
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                // 绘制压缩后的图片
                ctx.drawImage(img, 0, 0, width, height);

                // 转换为Blob
                canvas.toBlob((blob) => {
                    resolve(new File([blob], file.name, {
                        type: 'image/jpeg',
                        lastModified: Date.now()
                    }));
                }, 'image/jpeg', quality);
            };

            img.onerror = reject;
            img.src = URL.createObjectURL(file);
        });
    }

    // 生成唯一文件名
    generateUniqueFilename(originalFilename) {
        const timestamp = Date.now();
        const random = Math.random().toString(36).substring(2, 8);
        const extension = originalFilename.split('.').pop();
        return `${timestamp}_${random}.${extension}`;
    }

    // 上传图片到Cloudinary
    async uploadImage(file, options = {}) {
        try {
            // 验证文件
            const validation = this.validateFile(file);
            if (!validation.isValid) {
                throw new Error(validation.errors.join(', '));
            }

            // 压缩图片（可选）
            let uploadFile = file;
            if (options.compress !== false && file.size > 1024 * 1024) {
                uploadFile = await this.compressImage(file);
            }

            // 准备上传数据
            const formData = new FormData();
            formData.append('file', uploadFile);
            formData.append('upload_preset', this.config.uploadPreset);
            formData.append('folder', this.config.folder);
            formData.append('public_id', this.generateUniqueFilename(file.name));

            // 添加可选参数
            if (options.tags) {
                formData.append('tags', options.tags.join(','));
            }

            if (options.context) {
                Object.entries(options.context).forEach(([key, value]) => {
                    formData.append(`context[${key}]`, value);
                });
            }

            // 执行上传
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error(`上传失败: ${response.statusText}`);
            }

            const result = await response.json();

            return {
                success: true,
                data: {
                    publicId: result.public_id,
                    url: result.secure_url,
                    format: result.format,
                    width: result.width,
                    height: result.height,
                    size: result.bytes,
                    createdAt: result.created_at
                }
            };

        } catch (error) {
            console.error('Cloudinary上传错误:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // 批量上传多张图片
    async uploadMultipleImages(files, options = {}) {
        const results = [];
        
        for (const file of files) {
            const result = await this.uploadImage(file, options);
            results.push(result);
        }
        
        return results;
    }

    // 删除Cloudinary中的图片
    async deleteImage(publicId) {
        try {
            // 注意：删除操作需要服务器端支持，因为需要API Secret
            // 这里只是客户端实现，实际使用时需要通过后端API
            
            const response = await fetch('/api/delete-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    publicId: publicId,
                    cloudName: this.config.cloudName
                })
            });

            if (!response.ok) {
                throw new Error(`删除失败: ${response.statusText}`);
            }

            const result = await response.json();
            return {
                success: true,
                data: result
            };

        } catch (error) {
            console.error('Cloudinary删除错误:', error);
            return {
                success: false,
                error: error.message
            };
        }
    }

    // 获取图片的优化URL
    getOptimizedUrl(url, options = {}) {
        const defaultOptions = {
            width: null,
            height: null,
            crop: 'scale',
            quality: 'auto',
            format: 'auto',
            effect: null
        };

        const opts = { ...defaultOptions, ...options };
        
        // 解析URL
        const urlParts = url.split('/');
        const versionIndex = urlParts.findIndex(part => part.startsWith('v'));
        
        if (versionIndex === -1) {
            return url; // 如果无法解析，返回原URL
        }

        // 构建转换参数
        const transformations = [];
        
        if (opts.width || opts.height) {
            const size = `${opts.width || 'auto'}x${opts.height || 'auto'}`;
            transformations.push(`w_${opts.width || 'auto'},h_${opts.height || 'auto'},c_${opts.crop}`);
        }
        
        if (opts.quality !== 'auto') {
            transformations.push(`q_${opts.quality}`);
        }
        
        if (opts.format !== 'auto') {
            transformations.push(`f_${opts.format}`);
        }
        
        if (opts.effect) {
            transformations.push(`e_${opts.effect}`);
        }

        // 构建新的URL
        const baseUrl = urlParts.slice(0, versionIndex).join('/');
        const version = urlParts[versionIndex];
        const publicId = urlParts.slice(versionIndex + 1).join('/');
        
        const transformString = transformations.length > 0 ? transformations.join(',') + '/' : '';
        
        return `${baseUrl}/${transformString}${version}/${publicId}`;
    }

    // 显示上传进度
    showUploadProgress(file, onProgress) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            
            // 监听上传进度
            xhr.upload.addEventListener('progress', (event) => {
                if (event.lengthComputable) {
                    const percentComplete = (event.loaded / event.total) * 100;
                    onProgress(percentComplete);
                }
            });

            xhr.upload.addEventListener('load', () => {
                onProgress(100);
            });

            xhr.upload.addEventListener('error', reject);

            xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const result = JSON.parse(xhr.responseText);
                        resolve(result);
                    } else {
                        reject(new Error(`上传失败: ${xhr.statusText}`));
                    }
                }
            };

            // 准备上传数据
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', this.config.uploadPreset);
            formData.append('folder', this.config.folder);
            formData.append('public_id', this.generateUniqueFilename(file.name));

            xhr.open('POST', `https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/upload`);
            xhr.send(formData);
        });
    }
}

// 导出类
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CloudinaryUploader;
}