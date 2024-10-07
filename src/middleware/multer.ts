import multer from 'multer';

const fileTypes = {
  image: ['image/jpeg', 'image/png', 'image/gif'],
  video: ['video/mp4', 'video/x-m4v', 'video/quicktime'],
  audio: ['audio/mpeg', 'audio/wav'],
  document: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
};

const createFileFilter = (types: string[]) => {
  return (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const mimetype = file.mimetype;
    if (types.includes(mimetype)) {
      cb(null, true); 
    } else {
      cb(null, false); 
    }
  };
};

const imageUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: createFileFilter(fileTypes.image),
});

const videoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB limit
  fileFilter: createFileFilter(fileTypes.video),
});

const audioUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: createFileFilter(fileTypes.audio),
});

const documentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB limit
  fileFilter: createFileFilter(fileTypes.document),
});


export { imageUpload, videoUpload, audioUpload, documentUpload };
