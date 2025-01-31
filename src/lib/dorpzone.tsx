'use client';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
const Dropzone = ({
  currentImage,
  onFilesChange,
}: {
  currentImage?: string | '' | null;
  onFilesChange: (acceptedFiles: File[]) => void;
}) => {
  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
      maxFiles: 1,
      accept: {
        'image/jpeg': ['.jpeg', '.png', '.jpg'],
      },
      onDrop: (acceptedFiles) => {
        onFilesChange(acceptedFiles); // 상위 컴포넌트에 파일 전달
      },
    });

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path} className="text-sm">
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const previewItems = acceptedFiles.map((file) => {
    const previewUrl = URL.createObjectURL(file);
    return (
      <li key={file.path} className="flex flex-col items-center">
        <Image
          src={previewUrl}
          alt={file.path ?? 'image'}
          width={320}
          height={400}
          className="w-full h-auto"
        />
        <p className="text-sm">{file.path}</p>
      </li>
    );
  });
  const currentImagePreview = currentImage ? (
    <li key={currentImage} className="flex flex-col items-center">
      <Image
        src={`/upload/${currentImage}`}
        alt={currentImage}
        width={320}
        height={400}
      />
    </li>
  ) : null;
  return (
    <div
      {...getRootProps()}
      style={{
        border: '2px dashed #ccc',
        padding: '20px',
        textAlign: 'center',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        color: '#000',
      }}>
      <input {...getInputProps()} />

      {fileRejectionItems.length > 0 && (
        <>
          <h4>거부된 파일</h4>
          <ul>{fileRejectionItems}</ul>
        </>
      )}
      {previewItems.length > 0 || currentImage ? (
        <>
          <h4 className="font-bold">미리보기</h4>
          <ul>
            {previewItems.length > 0 ? previewItems : currentImagePreview}
          </ul>
        </>
      ) : (
        <p className="font-bold md:text-sm">
          여기에 파일을 드래그 앤 드롭하세요.
        </p>
      )}
    </div>
  );
};

export default Dropzone;
