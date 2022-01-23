import matter from 'gray-matter';
import fs from 'fs';
const fsPromises = fs.promises;

export default async function getProducts() {
  const directory = `${process.cwd()}/content/`;
  const filenames = await fsPromises.readdir(directory);

  const products = filenames.map((filename) => {
    const fileContent = fs.readFileSync(`${directory}/${filename}`, 'utf-8');

    const { data, content } = matter(fileContent);

    const id = filename.replace('.md', '');

    return {
      ...data,
      id,
      content
    };
  });

  return products;
}
