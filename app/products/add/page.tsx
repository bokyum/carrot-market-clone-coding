"use client";
import Btn from "@/components/btn";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { uploadProduct } from "./actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, ProductType } from "./schema";

const limitMB = 10;
const limitByte = limitMB * 1024 * 1024;

export default function AddProduct() {
  const [preview, setPreview] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductType>({
    resolver: zodResolver(productSchema),
  });
  const [file, setFile] = useState<File | null>(null);
  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files },
    } = event;
    if (!files) return;
    const file = files[0];

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    if (file.size > limitByte) {
      alert(
        `10MB 이하의 파일만 업로드 가능합니다.(현재${file.size / 1024 / 1024}MB)`
      );
      return;
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
    setFile(file);
    setValue("photo", `./public/photos/${file.name}`);
    console.log(url);
  };

  const onSubmit = handleSubmit(async (data: ProductType) => {
    const formData = new FormData();
    formData.append("photo", file as Blob);
    formData.append("title", data.title);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);

    return uploadProduct(formData);
  });

  const onValid = async () => {
    await onSubmit();
  };

  return (
    <div>
      <form action={onValid} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="flex aspect-square cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-neutral-300 bg-cover bg-center text-neutral-300"
          style={{ backgroundImage: `url(${preview})` }}
        >
          {!preview && (
            <>
              <PhotoIcon className="w-20" />
              <div className="text-sm text-neutral-400">
                사진을 추가해주세요.
              </div>
            </>
          )}
        </label>
        <input
          onChange={onImageChange}
          className="hidden"
          type="file"
          id="photo"
          name="photo"
        />
        <Input
          type="text"
          required
          placeholder="제목"
          {...register("title")}
          errors={[errors.title?.message ?? ""]}
        />
        <Input
          type="number"
          required
          placeholder="가격"
          {...register("price")}
          errors={[errors.price?.message ?? ""]}
        />
        <Input
          type="text"
          required
          placeholder="자세한 설명"
          {...register("description")}
          errors={[errors.description?.message ?? ""]}
        />
        <Btn text="작성완료" />
      </form>
    </div>
  );
}
