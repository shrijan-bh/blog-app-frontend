import * as Yup from "yup";

export const blogValidationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  content: Yup.string().required("Content is required"),
  tag: Yup.string().required("Tag is required"),
  blogImage: Yup.string().url("Invalid image URL").required("Image URL is required"),
});
