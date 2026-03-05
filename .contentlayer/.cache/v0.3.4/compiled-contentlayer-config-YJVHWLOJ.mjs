// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/page.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    date: { type: "string", required: true },
    excerpt: { type: "string", required: true }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("/page", "")
    },
    url: {
      type: "string",
      resolve: (doc) => `/blog/${doc._raw.flattenedPath.replace("/page", "")}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Post]
});
export {
  Post,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-YJVHWLOJ.mjs.map
