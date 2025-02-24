import { GraphQLUpload } from 'apollo-server';
import { createWriteStream } from 'fs';
import { diana } from 'diana-js';

const resolver = {
  Upload: GraphQLUpload,
  Query: {
    uploads: (_: any, args: any) => { },
  },
  Mutation: {
    singleUpload: async (_: any, { file }: { file: any }) => {
      const { createReadStream, filename, mimetype, encoding } = await file;

      // save stream to file
      const stream = createReadStream();
      const path = `uploads/${diana()}${filename}`;
      await new Promise((resolve, reject) =>
        stream
          .pipe(createWriteStream(path))
          .on("finish", () => resolve({ path, filename, mimetype }))
          .on("error", reject)
      );

      return { filename, mimetype, encoding };
    }
  }
};

export default resolver;
