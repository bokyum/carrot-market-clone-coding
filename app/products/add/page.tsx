"use client";
import Btn from "@/components/btn";
import Input from "@/components/input";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { useActionState, useState } from "react";
import { uploadProduct } from "./actions";

const limitMB = 10;
const limitByte = limitMB * 1024 * 1024;

export default function AddProduct() {
  const [preview, setPreview] = useState("");
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
    console.log(url);
  };
  const [state, dispatch] = useActionState(uploadProduct, null);
  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5 p-5">
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
          name="title"
          errors={state?.fieldErrors.title}
        />
        <Input
          type="number"
          required
          placeholder="가격"
          name="price"
          errors={state?.fieldErrors.price}
        />
        <Input
          type="text"
          required
          placeholder="자세한 설명"
          name="description"
          errors={state?.fieldErrors.description}
        />
        <Btn text="작성완료" />
      </form>
    </div>
  );
}
