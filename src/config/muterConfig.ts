// multerConfig.ts
import multer from "multer";
import path from "path";

// Configuração do Multer para armazenar as imagens
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Diretório onde as imagens serão salvas
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obter a extensão do arquivo
    cb(null, Date.now() + ext); // Nome único para o arquivo (timestamp + extensão)
  },
});

// Instância do Multer
const upload = multer({ storage });

export { upload };
