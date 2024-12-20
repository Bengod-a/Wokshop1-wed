import React, { useState } from "react";
import { toast } from "react-toastify";
import Resize from "react-image-file-resizer";
import { UploadFiles, removeFiles } from "../../api/Produc";
import useEcomStore from "../../store/ecom";
import { X } from "lucide-react";
import { Loader } from 'lucide-react';

const Uploadfile = ({ form, setForm }) => {
  const token = useEcomStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  // console.log(form);

  const handleDelete = (public_id) => {
    setIsLoading(true)
    const images = form.images;
    removeFiles(token, public_id)
      .then((res) => {
        // console.log(res);
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        // console.log('filterImages',filterImages);
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error("ลบรูปสำเร็จ");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOnchange = (e) => {
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images;
      for (let i = 0; i < files.length; i++) {
        // console.log(files[i]);

        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`File ${file.name} บ่แม่นรูป`);
          continue;
        }
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // console.log('data',data);
            UploadFiles(token, data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false)
                toast.success("อัปโหลดรูปแล้ว!!");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false)
              });
          },
          "base64"
        );
      }
    }
  };

  return (
    <div>
      <div className="flex gap-4 my-4">
      {
        isLoading && <Loader className='w-16 h-16 animate-spin'/>
      }
      

        {form.images.map((item, index) => (
          <div className="relative" key={index}>
            <img
              className="w-48 h-48 object-cover hover:scale-105"
              src={item.url}
            />
            <X
              className="absolute top-0 right-0 bg-red-500 p-1 rounded cursor-pointer"
              onClick={() => handleDelete(item.public_id)}
            />
          </div>
        ))}
      </div>

      <div>
        <input onChange={handleOnchange} type="file" name="imges" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
