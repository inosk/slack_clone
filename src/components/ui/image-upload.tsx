import Image from 'next/image';
import { ImCancelCircle } from 'react-icons/im';
import { Dropzone } from './dropzone';
import { useState } from 'react';

const ImageUpload = () => {
  //const { imageUrl, updateImageUrl } = useUploadImage();
  const [files, setFiles] = useState<string[]>([]);

  const deleteFile = (target: string) => {
    setFiles(files.filter((file) => file !== target));
  };

  return (
    <>
      <Dropzone onChange={setFiles} fileExtension={'png'}></Dropzone>
      {files.map((file, index) => (
        <div
          key={index}
          className="flex items-center justify-center h-32 w-32 relative"
        >
          <Image
            src={file}
            className="object-cover w-full h-full rounded-md"
            alt="workspace"
            width={320}
            height={320}
          />
          <ImCancelCircle
            size={30}
            onClick={() => deleteFile(file)}
            className="absolute cursor-pointer -right-2 -top-2 z10 hover:scale-110"
          />
        </div>
      ))}
    </>
  );
};

export default ImageUpload;
