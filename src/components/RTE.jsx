import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";
import { tinyMCE } from "../config/config";
function RTE({ name, control, label, defaultValue }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            initialValue={defaultValue}
            apiKey= {tinyMCE.tinyMceApiKey}

            init={{
              selector: "textarea", // change this value according to your HTML
              skin: window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "oxide-dark"
                : "oxide",
              content_css: window.matchMedia("(prefers-color-scheme: dark)")
                .matches
                ? "dark"
                : "default",
              initialValue: defaultValue,
              height: 500,
              menu: {},
              menubar: true,
              plugins: [
                "advlist",
                "anchor",
                "autolink",
                "charmap",
                "code",
                "codesample",
                "fullscreen",
                "help",
                "image",
                "insertdatetime",
                "link",
                "lists",
                "media",
                "preview",
                "searchreplace",
                "table",
                "visualblocks",
              ],
              toolbar:
                "undo redo | exportpdf | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",

              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}

export default RTE;
